import React, { Component } from "react";
import "./Reorderer.css";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditItem from "./EditItem";

import {default as axios} from "axios";
axios.defaults.baseURL = window.API_BASE;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const conx = axios.create({
  headers: {
    "content-type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Vary": "Origin"
  }
});

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
  background: isDragging ? "lightgreen" : "grey",

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
      isLoaded: false,
      listType: props.listType || 'adverts'
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    conx.get(`/v2/${this.state.listType}`)
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
    const {listType} = this.state;

    conx.post(`/v2/${listType}`, items)
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
    const {error, isLoaded, items, listType} = this.state;

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
                        <div className="item-text item-title">
                          {index+1}
                        </div>
                      </Col>
                      <Col xs={3}>
                        <div className="item-text item-title">
                          <EditItem
                            item={item}
                            listType={listType}
                          />
                        </div>
                      </Col>
                      <Col xs={8}>
                        <div className="item-text item-description">
                          {item.description}
                        </div>
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
