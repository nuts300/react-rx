import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as React from 'react';

import { getLogger } from 'utils/logger';
const logger = getLogger('domain/store/connecter');

type WrapperProps = {
  store: { [key: string]: BehaviorSubject<any> },
  children: React.ReactElement<any>,
  context: React.Context<any> 
}

class Wrapper extends React.Component<WrapperProps,any,any> {
  props: WrapperProps
  state: object

  constructor(props: WrapperProps) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    forEach(this.props.store, (subject$, key) => {
      subject$.subscribe(value => {
        this.setState((state, props) => {
          state[key] = value;
          logger.debug('Updated state', state);
          return state;
        });
      });
    });
  }

  componentWillUnmount() {
    forEach(this.props.store, (subject$, key) => subject$.unsubscribe());
  }
  
  render() {
    logger.debug('Render Wrapper', this.state);
    const { Provider } = this.props.context;
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}


export function connect(store: { [key: string]: BehaviorSubject<any> }) {
  return function (WrappedComponent: React.ComponentClass<any> | React.StatelessComponent<any>)
  :JSX.Element {
    const context = React.createContext({});
    return (
      <Wrapper store={store} context={context}>
        <context.Consumer>
        { (state) => (<WrappedComponent {...state} />) }
        </context.Consumer>
      </Wrapper>
    )
  }
}
