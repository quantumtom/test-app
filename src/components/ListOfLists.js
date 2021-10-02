import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
import Reorderer from "./Reorderer";

function ListOfLists() {
  const [key, setKey] = useState('commercials');

  return (
    <Container>
      <h3 className="mt-3">List of Lists</h3>
      <p>Drag and drop items to change their position in the list.</p>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mt-3"
      >
        <Tab
          eventKey="commercials"
          title="Commercials"
        >
          <Reorderer listType="work" />
        </Tab>
        <Tab
          eventKey="shorts"
          title="Shorts">
          <Reorderer listType="shorts" />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default ListOfLists;
