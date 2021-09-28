import Content from "./Content";
import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroup";

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: props.item,
      itemIndex: props.index
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCopyChange = this.handleCopyChange.bind(this);
    this.handleVideoChange = this.handleVideoChange.bind(this);
  }

  handleTitleChange(title) {
    this.setState({
      mainTitle: title
    });
  }

  handleCopyChange(copy) {
    this.setState({
      proseCopy: copy
    });
  }

  handleVideoChange(id) {
    this.setState({
      videoID: id
    })
  }

  render() {
    const item = this.state.item;
    const itemIndex = this.state.itemIndex;

    return (
        <Card
          bg="primary"
          style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>
              {item.copy}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Item ID: {item.id}</ListGroupItem>
            <ListGroupItem>Item Index: {itemIndex}</ListGroupItem>
            <ListGroupItem>
              <Content prose={item.title} proseType="title" index={itemIndex} onProseChange={this.handleTitleChange} />
            </ListGroupItem>
            <ListGroupItem>
              <Content prose={item.copy} proseType="proseCopy" index={itemIndex} onProseChange={this.handleCopyChange} />
            </ListGroupItem>
            <ListGroupItem>
              <Content prose={item.url} proseType="video" index={itemIndex} onProseChange={this.handleVideoChange} />
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">{item.url}</Card.Link>
          </Card.Body>
        </Card>
  )};
}

export default Item
