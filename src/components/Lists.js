import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Reorderer from "./Reorderer";

function Lists() {
  const [key, setKey] = useState('commercials');

  return (
    <React.Fragment>
      <h3>Lists</h3>
      <p>Drag and drop items to reorder the list.</p>
      <Tabs
        id="controlled-tab-lol"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mt-3"
      >
        <Tab
          eventKey="commercials"
          title="Commercials"
        >
          <Reorderer listType="adverts" />
        </Tab>
        <Tab
          eventKey="shorts"
          title="Shorts">
          <Reorderer listType="shorts" />
        </Tab>
      </Tabs>
    </React.Fragment>
  );
}

export default Lists;
