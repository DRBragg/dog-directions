import React from 'react';

const FetchButton = props => {

  let handleClick = () => {
    props.getFetch();
  }

  return(
    <button onClick={handleClick}>Get Favorite Thing</button>
  )
}

export default FetchButton;
