import React, {Component} from "react";
import './Demo.css';
import '@fontsource/roboto';
import "@fontsource/material-icons";
import SaveButton from './SaveButton';
import Menu from './Menu';
import List from './List';

class Demo extends Component {
  render() {
    return <React.Fragment>
      <div>
        <div>Demo Page</div>
        <div>
          <SaveButton/>
        </div>
        <div>
          <Menu/>
        </div>
        <div>
          <List/>
        </div>
      </div>
    </React.Fragment>
  }
}

export default Demo;
