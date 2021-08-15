import React, {Component} from "react";
import '@fontsource/roboto';
import { Button } from '@material-ui/core';

class SaveButton extends Component {
  render() {
    return <React.Fragment>
      <Button color="primary">{"Click me!"}</Button>
    </React.Fragment>
  }
}

export default SaveButton;
