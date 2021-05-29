import React from 'react';
import axios from 'axios';

// const ListElement = (props) =>
//   <span>
//     <div>{props.student.name}</div>
//     <img src={props.student.imgurl}></img>
//   </span>

class ListElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      newName: '',
      // student: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount() {
  //   this.setState({
  //     student: this.props.student
  //   })
  // }

  handleClick(event) {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  handleUpdate(event) {
    event.preventDefault();
    // console.log('newName', this.state.newName);
    // console.log('student id', this.state.student.id);
    axios.put(`/api/students/${this.props.student.id}`, {
      name: this.state.newName
    })
      .then(this.setState({
        clicked: !this.state.clicked
      }))
      .catch(err => {
        console.log('update error', err);
      })
  }

  handleChange(event) {
    event.preventDefault();
    console.log('event target value', event.target.value);
    this.setState({
      newName: event.target.value
    })
  }

  render() {
    if (this.state.clicked) {
      return (
        <span>
          {/* <div>{this.props.student.name}</div> */}
          <form onSubmit={this.handleUpdate}>
            <input type="text" name="name" onChange={this.handleChange}/>
            <button>Submit</button>
            <button onClick={this.handleClick}>Cancel</button>
          </form>
          <img src={this.props.student.imgurl}></img>
        </span>
      )
    } else {
      return (
        <span>
          <div>{this.props.student.name}</div>
          <img src={this.props.student.imgurl}></img>
          <button onClick={this.handleClick}>Change Name</button>
        </span>
      )
    }

  }
}


export default ListElement;
