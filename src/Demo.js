import React, {Component} from "react";
import Data from './data.js';
import './Demo.css';

const items = Data.work;

const getData = info =>
  Array.from({length: info.length}, (v, k) => k).map(k => ({
      id: `item-${k}`,
      title: `${info[k].title}`
    }
  ));

const listItems = items.map((item) =>
    <li key={item.guid}>
      {item.title}
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
    return (
      <ul>
        {listItems}
      </ul>
    )};
}

export default Demo;
