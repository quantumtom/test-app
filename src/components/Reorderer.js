import React, { Component } from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditItem from "./EditItem";
import "./Reorderer.css";

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

const toObject = (arr) => {
  let retVal = {};

  for (let i = 0; i < arr.length; i++) {
    retVal[i] = arr[i];
  }

  return retVal;
}

const toArray = (obj) => {
  let retVal = [];

  // Each member is a named reference to a child object
  // with its own properties. To conver the parent object
  // into an array, we need to preserve each of its key's
  // values as a property of its respective child object.
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Save key as 'guid'
      obj[key].guid = key
      retVal.push(obj[key]);
    }
  }

  // console.dir(retVal);

  return retVal;
}

const grid = 2;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,
  // minHeight: `50px`,

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
      items: [],
      listType: props.listType
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.fetchList();
  }

  fetchList() {
    const listType = this.state.listType;
    fetch(`${window.API_BASE}/v2/${listType}`)
      .then(res => res.json())
      .then(result => {
          // Made it here.
          this.setState({
            isLoaded: true,
            items: toArray(result)
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

  sendList(itemsArr) {
    const itemsObject = toObject(itemsArr);

    const listType = this.state.listType

    axios.post(`/v2/${listType}`,
      itemsObject,
      {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Vary": "Origin"
        }
      })
      // .then((response) => {
      //   console.log('POST RESPONSE:');
      //   console.dir(response);
      // })
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

    this.sendList(items);

    this.setState({
      items: items
    }, () => {

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
                  <Draggable key={index} draggableId={item.videoID} index={index}>
                    {(provided, snapshot) => (
                      <Row
                        ref={provided.innerRef}{...provided.draggableProps} {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}>
                        <Col xs={3}>
                          <div className="item-text">
                            {item.title}
                          </div>
                        </Col>
                        <Col xs={5}>
                          <div className="item-text item-description">
                            {item.description}
                          </div>
                        </Col>
                        <Col xs={1}>
                          <div className="item-text">
                            {item.jobID}
                          </div>
                        </Col>
                        <Col xs={2}>
                          <div className="item-text">
                            {item.videoID}
                          </div>
                        </Col>
                        <Col xs={1}>
                          <EditItem
                            listType={listType}
                            itemIndex={index}
                            items={items} />
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

export default Reorderer;
