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
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editMode = this.editMode.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick(event) {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  handleUpdate(event) {
    event.preventDefault();
    axios.put(`/api/students/${this.props.student.id}`, {
      name: this.state.newName
    })
      .then(() => {
        this.handleClick();
      })
      .then(() => {
        this.props.getStudents();
      })
      .catch(err => {
        console.log('update error', err);
      })
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      newName: event.target.value
    })
  }

  handleDelete(event) {
    event.preventDefault();
    axios.delete(`/api/students/${this.props.student.id}`)
    .then(() => {
      axios.delete(`/api/images/${this.props.student.id}`)
      .then(() => {
        console.log('successful delete');
      })
      .then(() => {
        this.props.getStudents();
      })
      .catch(err => {
        console.log('error in deleting entry', err);
      })
    })
  }

  editMode() {
    return (this.state.clicked) ? (
      <form onSubmit={this.handleUpdate}>
        <input type="text" name="name" onChange={this.handleChange}/>
        <button>Submit</button>
        <button onClick={this.handleClick}>Cancel</button>
      </form>
    ) : (
    <div>
      <button onClick={this.handleClick}>Change Name</button>
      <button onClick={this.handleDelete}>Delete Person</button>
    </div>
    )
  }

  render() {
    return (
      <span>
        <img src={this.props.student.imgurl}></img>
        <div>{this.props.student.name}</div>
        <div>
          <div>{this.editMode()}</div>
        </div>
      </span>
    )
  }
}


export default ListElement;
