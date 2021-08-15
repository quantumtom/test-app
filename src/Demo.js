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
        <SaveButton />
      </div>
      <div>
        <Menu/>
      </div>
      <div>
        <List />
      </div>
    </React.Fragment>
    }
}

export default Demo;
