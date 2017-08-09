import React, { Component } from 'react';
import StepTile from '../components/StepTile';
import ItemTile from '../components/ItemTile';
import FetchButton from '../components/FetchButton';


class InstructionsContainer
 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepID: null,
      data: null
    }
    this.setSelectedStep = this.setSelectedStep.bind(this);
    this.getFetch = this.getFetch.bind(this);
  }

  getFetch() {
    fetch('http://localhost:4567/api/v1/favorite_things.json')
      .then((response) => response.json())
      .then((json) => this.setState({ data: json }))
  }

  setSelectedStep(step) {
    this.setState({stepID: step});
  }

  render(){
    if (!this.state.data) {
      return(
        <FetchButton getFetch={this.getFetch}/>
      )
    } else {
    let supplies = this.state.data.supplies
    let directions = this.state.data.directions

    let items = supplies.map(supply => {
      return(
        <ItemTile
        item={supply.item}
        key={supply.id}
        id={supply.id}
        />
      )
    })

    let steps = directions.map(direction => {
      let className;
      let id = direction.id
      className = (id == this.state.stepID ? 'selected' : null);

      return(
        <StepTile
          step={direction.step}
          key={id}
          id={id}
          setSelectedStep={this.setSelectedStep}
          selectedClass={className}
        />
      )
    })

    return(
      <div>
        <h1>How To {this.state.data.activity}</h1>
        <h3>Supplies:</h3>
        <ul>
          {items}
        </ul>
        <h3>Instructions:</h3>
        <ol>
          {steps}
        </ol>
        <FetchButton />
      </div>
    )
  }
  }
}

export default InstructionsContainer
;
