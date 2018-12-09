import { Expression } from "cassowary";
import { omit, setAttribute } from "./utils";
import { variable } from "./helpers";

export default class Line {
  constructor(attributes = {}) {
    this.attributes_ = omit(attributes, ["x1", "y1", "x2", "y2"]);

    this.x1 = variable("x1", attributes.x1);
    this.y1 = variable("y1", attributes.y1);
    this.x2 = variable("x2", attributes.x2);
    this.y2 = variable("y2", attributes.y2);

    this.centerX = new Expression(this.x1).plus(this.x2).divide(2);
    this.centerY = new Expression(this.y1).plus(this.y2).divide(2);
  }

  render() {
    const el = document.createElementNS("http://www.w3.org/2000/svg", "line");
    for (const [name, value] of Object.entries(this.attributes_)) {
      setAttribute(el, name, value);
    }

    el.setAttributeNS(null, "x1", this.x1.value);
    el.setAttributeNS(null, "y1", this.y1.value);
    el.setAttributeNS(null, "x2", this.x2.value);
    el.setAttributeNS(null, "y2", this.y2.value);

    return el;
  }
}