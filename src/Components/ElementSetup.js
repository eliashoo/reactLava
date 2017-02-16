import React from 'react';

import Elements from '../Elements.js';

import FieldGroup from '../FieldGroup.js';

function ElementSetup({type,horizontal,handleChange,spec}) {
  const fields = Elements[type].fields;
  spec = spec || {}
  return (
    <div>
      {fields.map( (field) => (
        <FieldGroup horizontal={horizontal}
          key={field.name}
          id={`${field.name}Text`}
          label={field.name}
          type={field.type}
          onChange={handleChange}
          name={field.name}
          value={spec[field.name]}
        />
      ))}
    </div>
  )
}
export default ElementSetup;
