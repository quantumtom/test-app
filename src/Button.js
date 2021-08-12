import React, {Component} from "react";
import { Button } from '@material-ui/core';

class SaveButton extends Button {
  constructor(props) {
    super(props)
    this.state = {
      items:getData()
    }
  }
}

export default SaveButton;
