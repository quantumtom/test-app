import React, { Component } from "react";
import './Admin.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Container from "react-bootstrap/Container";
import Entry from './Item';
import CardGroup from 'react-bootstrap/CardGroup';

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

const Form = () => {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCopyChange = this.handleCopyChange.bind(this);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  // TODO
  // Swtich 'fetch' to use axios.get
  // https://github.com/axios/axios
  componentDidMount() {
    fetch(axios.defaults.baseURL + '/v1/work')
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

  sendWork(items) {
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

    this.sendWork(items);

    this.setState({
      items: items
    });
  }

  handleTitleChange(title) {
    console.log('title is ' + title);
    this.setState({

    });
  }

  handleCopyChange(copy) {
    console.log('copy is ' + copy);
    this.setState({

    });
  }

  handleURLChange(url) {
    console.log('url is ' + url);
    this.setState({

    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const items = this.state.items;

    return (
      <div>
        <Container>
          <Form />
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
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
                              <CardGroup>
                                <Entry item={item} title={item.title}
                                  copy={item.copy}
                                  url={item.url}
                                  id={item.id}
                                  index={index}
                                />
                              </CardGroup>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                )}
            </Droppable>
          </DragDropContext>
        </Container>
      </div>
    );
  }
}

export default Admin;
