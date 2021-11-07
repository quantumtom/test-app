import React, { Component } from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditItem from "./EditItem";
import "./Demo.css";

import {default as axios} from "axios";
axios.defaults.baseURL = window.API_BASE;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 2;

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

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      listType: props.listType
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.getList(this.state.listType);
  }

  toArray(obj) {
    let retVal = [];
    let index = 0;

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        retVal.push(obj[key]);
      }
    }

    return retVal;
  }

  toObject(arr) {
    let retVal = {};

    for (let i = 0; i < arr.length; i++) {
      retVal[i.toString()] = arr[i];
    }

    return retVal;
  }

  getList(listType) {
    fetch(`${window.API_BASE}/v2/adverts`)
      .then(res => res.json())
      .then(result => {
          // Made it here.
        console.dir(result);
        console.dir(this.toArray(result));
        this.setState({
          isLoaded: true,
          items: this.toArray(result)
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          error
        });
      }
    ).catch(console.error);
  }

  sendList(listType, items) {
    axios.post(`/v2/adverts`,
      {
        "data": this.toObject(items)
      },
      {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Vary": "Origin"
        }
      })
      .then(function (response) {
        // console.log(response);
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

    console.dir(items);

    this.sendList(this.state.listType, items);

    this.setState({
      items: items
    });
  }

  render() {
    const items = this.state.items;
    const listType = this.state.listType;

    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div{...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <Draggable key={item.jobID} draggableId={item.jobID} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}{...provided.draggableProps} {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Row>
                          <Col xs={1}>
                            <EditItem
                              listType={listType}
                              itemIndex={index}
                              itemJobID={item.jobID}
                              items={items} />
                          </Col>
                          <Col xs={1}>
                            <div className="item-text item-title">
                              {item.jobID}
                            </div>
                          </Col>
                          <Col xs={3}>
                            <div className="item-text item-title">
                              {item.title}
                            </div>
                          </Col>
                          <Col xs={7}>
                            <div className="item-text item-description">
                              {item.description}
                            </div>
                          </Col>
                        </Row>
                      </div>
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

export default Demo;
