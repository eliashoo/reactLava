import React, { Component } from 'react';
import '../rasia.css';

class ComponentAdjuster extends Component {
  render() {
    const {left,top,children} = this.props;

    const style = {
      left:left*100+"%",
      top:top*100+"%"
    }

    return (
      <div className="comp-container"
        style={style}
      >
        {children}
      </div>
    );
  }
}
export default ComponentAdjuster;
