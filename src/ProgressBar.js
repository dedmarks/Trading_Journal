import React from "react";

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 40,
    width: '100%',
    backgroundColor: "#e0e0de",
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
    <div style={containerStyles}>
      <div style={fillerStyles}>
      </div>
      <span style={labelStyles}>{`${completed}%`}</span>
    </div>
  );
};

export default ProgressBar;