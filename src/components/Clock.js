import React from "react";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.setState.date = new Date().toLocaleTimeString();
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date}.</h2>
      </div>
    );
  }
}

export default Clock;
