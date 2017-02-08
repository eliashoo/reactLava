import React from 'react';

function Toggle({on,onToggle,name}) {
  let dir = on ? 'toOff' : 'toOn';
  let cssClasses = `${dir} toggleSwitch`;

  return (
      <div className="toggle">
        <div>{name}</div>
        <div onClick={onToggle}>
          <div style={{width:"50px",height:"20px",position:"relative"}}>
            <div style={{
              width:"100%",
              height:"16px",
              border:"1px solid #f55",
              backgroundColor:"white",
              position:"relative",
              borderRadius:"10px"}}/>
            <div className={cssClasses} />
          </div>
        </div>
      </div>
  )
}
export default Toggle;
