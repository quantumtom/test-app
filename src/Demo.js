import React, {Component} from "react";
import Data from './data.js';
import './Demo.css';
import { Button } from '@material-ui/core';

const items = Data.work;

const getData = info =>
  Array.from({length: info.length}, (v, k) => k).map(k => ({
      id: `item-${k}`,
      title: `${info[k].title}`,
      content: `${info[k].content}`,
      url: `${info[k].url}`
    }
  ));

const listItems = items.map((item) =>
    <li key={item.guid}>
      {item.title} | {item.content} | {item.url}
    </li>
);

class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: getData(Data.work)
    }
  };

  render() {
    return <React.Fragment>
      <div>
        <div>
          <Button color="primary">Button</Button>
        </div>
        <div>
          <ul>
            {listItems}
          </ul>
        </div>
      </div>
    </React.Fragment>
    }
}

export default Demo;
