import { BehaviorSubject, Subscription } from 'rxjs';
import * as React from 'react';

type Props = { store: Map<string, BehaviorSubject<any>> };

class StoreProvider extends React.Component {
  private state: {
    store: Map<string, BehaviorSubject<any>>,
    
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      store: props.store
    };
  }

  componentWillMount() {
    this.state.store.forEach((subject$, key) => {
      const subscription: Subscription = subject$.subscribe(value => {
        this.setState(key, value);
      });
      this.setState()
    });
  }

  render({ store } : Props): JSX.Element {
    return (<div></div>);
  }
}

export function connect<T>(store: Map<string, BehaviorSubject<T>>, Elem: React.Component): void {
  // TODO

}