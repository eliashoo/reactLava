import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import Elements from '../Elements';
import ElementComponents from './ElementComponents';
import '../rasia.css';

export default function Rasia({inout,selected,handleClick}) {
  const {type,spec} = inout;

  let Comp = ElementComponents[type];

  const selectedClass = selected ? 'selected' : ''

  let componentClassName= `comp-${type} component ${selectedClass}`;

  return (
    <div onClick={handleClick} className={`${componentClassName}`}>
      <Glyphicon glyph={Elements[type].glyph}/>
      <Comp {...spec}/>
    </div>
  );

}
