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
    axios.get(`/v2/${this.state.listType}`)
      .then((res) => {
        console.dir(res.data);
        // Made it here.
        this.setState({
          isLoaded: true,
          items: res.data
        });
      })
      .catch(console.error);
  }

  sendList(items) {
    axios.post(`/v2/${this.state.listType}`,
      {
        "clips": items["clips"]
      },
      {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Vary": "Origin"
        }
      })
      .then(function (response) {
        console.log(response);
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

    this.sendList(items);
  }

  render() {
    const {error, isLoaded, items, listType} = this.state;

    const tempArr  = [
      {
        "guid": "9",
        "videoID": "117235079",
        "title": "MERCEDES-BENZ",
        "description": "Record  (2nd Unit Photography)",
        "position": 0
      },
      {
        "guid": "7",
        "videoID": "215058792",
        "title": "BMW",
        "description": "Directed by M4  (2nd Unit Photography)",
        "position": 1
      },
      {
        "guid": "4",
        "videoID": "273904409",
        "title": "ALFA ROMEO",
        "description": "You Don’t Need  (2nd Unit Photography)",
        "position": 2
      }
    ];

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

      // console.dir(items["clips"]);

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
                <Draggable key={item.guid} draggableId={item.guid} index={index}>
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
                            {item.guid}
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
