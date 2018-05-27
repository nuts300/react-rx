import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as React from 'react';

import { getLogger } from 'utils/logger';
const logger = getLogger('domain/store/connecter');

export function connect(store: { [key: string]: BehaviorSubject<any> }) {
  return function (WrappedComponent: React.ComponentClass<any> | React.StatelessComponent<any>)
  :React.ComponentClass {
    return class Wrapper extends React.Component<any,any,any> {
      componentWillMount() {
        forEach(store, (subject$, key) => {
          subject$.subscribe(value => {
            this.setState((prevState, props) => {
              logger.debug('Update state', prevState, 'key', key, 'value', value);
              return { ...prevState, ...{ key: value } };
            });
          });
        });
      }
    
      componentWillUnmount() {
        forEach(store, (subject$, key) => subject$.unsubscribe());
      }
      
      render() {
        logger.debug('Render WrappedComponent', this.state);
        return <WrappedComponent {...this.state} />
      }
    }
  }
}
