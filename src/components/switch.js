import React from 'react';

const Switch = ({ action }) => {
  return (
    <label className="switch">
      <input type="checkbox" onChange={action} />
      <span className="slider" />
    </label>
  )
};

export default Switch;
