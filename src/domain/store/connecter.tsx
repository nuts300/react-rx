import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import * as React from 'react';

import { getLogger } from 'utils/logger';
const logger = getLogger('domain/store/connecter');

type WrapperProps<T> = {
  store: { [P in keyof T]: Observable<T[P]> },
  children: React.ReactElement<any>,
  context: React.Context<any> 
}

class Wrapper<T> extends React.Component<WrapperProps<T>,any,any> {
  props: WrapperProps<T>
  state: object

  constructor(props: WrapperProps<T>) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    forEach(this.props.store, (observable: Observable<any>, key) => {
      observable.subscribe(value => {
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

export function connect<T>(store: { [P in keyof T]: Observable<T[P]> }) {
  return function (WrappedComponent: React.ComponentClass<T> | React.StatelessComponent<T>)
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
