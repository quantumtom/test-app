import React, { Component } from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {default as axios} from "axios";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";

const SERVER_BASE = process.env.SERVER_BASE || 'http://localhost';
const SERVER_PORT = process.env.SERVER_PORT || '8080';

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
    this.getList(this.state.listType);
  }

  getList(listType) {
    fetch(`${axios.defaults.baseURL}/v1/work/`)
      .then(res => res.json())
      .then(result => {
          // Made it here.
          this.setState({
            isLoaded: true,
            items: result
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
    axios.post(`/v1/${listType}/create`,
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
        <Stack gap={5}> <DragDropContext onDragEnd={this.onDragEnd}>
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
                        <Container fluid>
                          <Row>
                            <Col sm={4} xs={6}>
                              <div className="embed-responsive embed-responsive-16by9">
                                <iframe
                                  title={`iframe-` + index}
                                  src={'https://player.vimeo.com/video/' + item.videoID}
                                  className="embed-responsive-item"
                                  frameBorder="0"
                                  allowFullScreen />
                              </div>
                            </Col>
                            <Col sm={4} xs={4}>
                              <div>
                                <h5>{item.title}</h5>
                                <p>{item.description}</p>
                              </div>
                            </Col>
                            <Col sm={4} xs={2}>
                              <EditItem listType={listType}  itemIndex={index} items={items} />
                              <DeleteItem itemIndex={index} />
                            </Col>
                          </Row>
                        </Container>
                      </div>
                    )}
                  </Draggable>
                ))} {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        </Stack>
      </React.Fragment>
    );
  }
}

export default Reorderer;
