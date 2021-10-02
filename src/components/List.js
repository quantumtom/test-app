import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EditItem from './EditItem';
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./List.css";

const SERVER_BASE = process.env.SERVER_BASE || 'http://localhost';
const SERVER_PORT = process.env.SERVER_PORT || '8080';

const axios = require('axios').default;

axios.defaults.baseURL = SERVER_BASE + ":" + SERVER_PORT;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

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

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.getWork();
  }

  getWork() {
    axios.get('/v1/work')
      .then((response) => {
        this.setState({
          isLoaded: true,
          items: response.data
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .then(() => {
        // always executed
      });
  }

  sendList(items) {
    axios.post(`/v1/work/create`,
      items,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Vary": "Origin"
        }})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
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
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const items = this.state.items;

    return <React.Fragment>
      <Container>
        <Stack gap={5}>
          <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {items.map((item, index) => (
                          <Draggable key={item.jobID} draggableId={item.jobID} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <Container fluid>
                              <Row>
                                <Col xs={3}>
                                  <div className="embed-responsive embed-responsive-16by9">
                                    <iframe
                                      title={`iframe-` + index}
                                      src={'https://player.vimeo.com/video/' + item.videoID}
                                      className="embed-responsive-item"
                                      frameBorder="0"
                                      allowFullScreen />
                                  </div>
                                </Col>
                                <Col xs={6}>
                                  <p>{item.title}<br />
                                  {item.description}</p>
                                </Col>
                                <Col xs={3}>
                                  <EditItem itemIndex={index} items={items} />
                                </Col>
                              </Row>
                            </Container>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
        </Stack>
      </Container>
    </React.Fragment>
  }
}

export default List;
