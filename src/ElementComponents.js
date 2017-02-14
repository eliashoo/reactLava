import React from 'react';

const In = ({name,ch}) => {
  return (
  <span title={`${name}-${ch}`}>{name}</span>
)};

const Out = ({name}) => (
  <span>{name}</span>
);

const Box = ({name}) => (
  <span>{name}</span>
);

export default {
  in: In,
  out: Out,
  box: Box
};
