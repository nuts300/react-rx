import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as React from 'react';

import { getLogger } from 'utils/logger';
const logger = getLogger('domain/store/connecter');

type WrapperProps = {
  store: { [key: string]: BehaviorSubject<any> },
  children: React.ReactElement<any>
  
}

class Wrapper extends React.Component<WrapperProps,any,any> {
  props: WrapperProps
  state: object

  constructor(props: WrapperProps) {
    super(props);
    this.state = {};
  }

  getChildContext() {
    return this.state;
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
    return this.props.children;
  }
}


export function connect(store: { [key: string]: BehaviorSubject<any> }) {
  return function (WrappedComponent: React.ComponentClass<any> | React.StatelessComponent<any>)
  :JSX.Element {
    return (
      <Wrapper store={store}>
        <WrappedComponent />
      </Wrapper>
    )
  }
}
