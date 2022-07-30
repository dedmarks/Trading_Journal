import React from "react";
import "./ProgressBar.css"

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 40,
    width: '100%',
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 10,
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labelStyles = {
    color: 'white',
    fontWeight: 'bold'
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