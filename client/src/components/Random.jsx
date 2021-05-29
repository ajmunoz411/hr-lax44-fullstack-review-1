import React from 'react';

/*
  This component does not necessarily have to be a class component.
  There are multiple ways to implement this feature.
  How would you implement this as a functional component?
*/
export default class Random extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      random: {}
    }
    this.getRandomStudent = this.getRandomStudent.bind(this);
  }

  componentDidMount() {
    this.getRandomStudent();
  }

  getRandomStudent(){
    // this gives us a random index value
    var ind = Math.floor(Math.random() * this.props.students.length);
    // Todo: Add your logic here to grab one random student
    var random = this.props.students[ind];
    this.setState({
      random: random
    })
  }

  render() {
    return (
      <div>
        <div>
          <img src={this.state.random.imgurl}></img>
          <h1>{this.state.random.name}</h1>
        </div>
        <button onClick={this.getRandomStudent}>Randomize</button>
      </div>
    )
  }
}

