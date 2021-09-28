import React from 'react'
import ContentEditable from 'react-contenteditable'

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.state = {
      html: props.prose,
      proseType: props.proseType,
      index: props.index
    };
  };

  handleChange = evt => {
    this.props.onProseChange(evt.target.value);
    console.log(this.state.index);
    this.setState({
      html: evt.target.value
    });
  };

  render = () => {
    return <ContentEditable
      innerRef={this.contentEditable}
      html={this.state.html} // innerHTML of the editable div
      disabled={false}       // use true to disable editing
      onChange={this.handleChange} // handle innerHTML change
      tagName='article' // Use a custom HTML tag (uses a div by default)
    />
  };
}

export default Content;
