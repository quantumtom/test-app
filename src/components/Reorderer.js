import React, { Component } from "react";
import "./Reorderer.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Row, Col } from "react-bootstrap";
import EditItem from "./EditItem";
import AddItem from "./AddItem";

import {default as axios} from "axios";
import DeleteItem from "./DeleteItem";
axios.defaults.baseURL = window.API_BASE;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const opts = {
  headers: {
    "content-type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Vary": "Origin"
  }
}

const conx = axios.create(opts);

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list.clips);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 5;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "lightgoldenrodyellow",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid
});

class Reorderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
  }

  rerenderParentCallback() {
    this.getList();
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    conx.get(`/v2/${this.props.listType}`)
      .then((res) => {
        // Made it here.
        this.setState({
          isLoaded: true,
          items: res.data
        });
      })
      .catch(console.error);
  }

  sendList(items) {
    conx.post(`/v2/${this.props.listType}`, items)
      .then((response) => {
        this.setState({
          isLoaded: true,
          items: items
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.sendList({
      "clips": items
    });

    this.setState({
      items: items,
      isLoaded: false
    });
  }

  render() {
    const placeholderItem = {
      title: 'Example Title',
      description: 'Example Description',
      videoID: '218705523'
    };
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {


      return (
        <React.Fragment>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
              {items["clips"].map((item, index) => (
                <Draggable key={item.guid + "-" + index} draggableId={item.guid + "-" + index} index={index}>
                  {(provided, snapshot) => (
                    <Row
                      ref={provided.innerRef}{...provided.draggableProps} {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <Col xs={1}>
                        <AddItem
                          item={placeholderItem}
                          itemIndex={index}
                          listType={this.props.listType}
                          rerenderParentCallback={this.rerenderParentCallback}
                        />
                      </Col>
                      <Col xs={9}>
                        <div className="item-text">
                          <b>{item.title}</b><br />
                          {item.description}
                        </div>
                      </Col>
                      <Col xs={1}>
                        <EditItem
                          item={item}
                          listType={this.props.listType}
                          rerenderParentCallback={this.rerenderParentCallback}
                        />
                      </Col>
                      <Col xs={1}>
                        <DeleteItem
                          item={item}
                          listType={this.props.listType}
                          rerenderParentCallback={this.rerenderParentCallback}
                        />
                      </Col>
                    </Row>
                  )}
                </Draggable>
              ))} {provided.placeholder}
            </div>
          )}
            </Droppable>
          </DragDropContext>
        </React.Fragment>
      );
    }
  }
}

export default Reorderer;
