import React, {Component} from "react";
import { Button } from "@material-ui/core";

class SaveButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  render() {
    return <React.Fragment>
      <Button color="primary">{"Click me!"}</Button>
    </React.Fragment>
  }
}

export default SaveButton;
