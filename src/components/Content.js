import React from 'react'
import ContentEditable from 'react-contenteditable'

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.state = {
      html: props.html || '',
      disabled: props.disabled || false,
      itemIndex: props.itemIndex || '0',
      valueType: props.valueType || '',
      tagName: props.tagName || 'article'
    };
  };

  handleChange = evt => {
    console.log(this.state.valueType, this.state.itemIndex, evt.currentTarget.innerHTML);
    this.setState({
      html: evt.currentTarget.innerHTML
    });
  };

  render() {
    return <ContentEditable
      innerRef={this.contentEditable}
      html={this.state.html} // innerHTML of the editable div
      disabled={this.state.disabled}       // use true to disable editing
      onChange={this.handleChange} // handle innerHTML change
      tagName={this.state.tagName} // Use a custom HTML tag (uses a div by default)
    />
  };
}

export default Content;
