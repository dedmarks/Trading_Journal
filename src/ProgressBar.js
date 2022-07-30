import React from "react";
import "./ProgressBar.css"

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  return (
    <div className='containerStyles'>
      <div style={fillerStyles} >
      </div>
      <h4 className='labelStyles bg'>{`${completed}%`}</h4>
    </div>
  );
};

export default ProgressBar;