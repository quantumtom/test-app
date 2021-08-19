import React, {Component} from "react";
import { Button } from '@material-ui/core';

class SaveButton extends Component {
  render() {
    return <React.Fragment>
      <h2>Save Button</h2>
      <Button color="primary">{"Click me!"}</Button>
    </React.Fragment>
  }
}

export default SaveButton;
