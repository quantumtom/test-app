import React, {Component} from "react";
import { Button } from '@material-ui/core';

class SaveButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <React.Fragment>
      <div>
        <div>
          <SaveButton>"Hello World!"</SaveButton>
        </div>
      </div>
    </React.Fragment>
  }
}

export default SaveButton;
