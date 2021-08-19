import React, {Component} from "react";
import './Demo.css';
import SaveButton from './SaveButton';
import Menu from './Menu';
import List from './List';

class Demo extends Component {
  render() {
    return <React.Fragment>
      <div>
        <h1>Demo Page</h1>
        <div>
          <SaveButton />
        </div>
        <div>
          <Menu />
        </div>
        <div>
          <List />
        </div>
      </div>
    </React.Fragment>
  }
}

export default Demo;
