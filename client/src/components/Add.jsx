import React from 'react';
import axios from 'axios';

export default class Add extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      imgurl: ''
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeHandler(e){
    e.preventDefault();
    if (e.target.name === 'name') {
      this.setState({
        name: e.target.value
      })
    } else if (e.target.name === 'imgurl') {
      this.setState({
        imgurl: e.target.value
      })
    }
  }

  handleSubmit(e){
    e.preventDefault();

    axios.post('/api/students', {
      name: this.state.name
    })
      .then(results => {
        console.log('successful name post', results);
      })
      .then(() => {
        axios.post('/api/images', {
          imgurl: this.state.imgurl
        })
          .then(results => {
            console.log('successful img post', results);
          })
          .catch(err => {
            console.log('error in img post', err);
          })
      })
      .catch(err => {
        console.log('error in name post', err);
      });



  }

  showPreview(){
    return (
      (this.state.name && this.state.imgurl) ? (
        <div>
          <img src={this.state.imgurl}></img>
          <h2>{this.state.name}</h2>
        </div>
      ) : (
        <div>
          Fill out the form and a preview will appear here...
        </div>
      )
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Student Name: </label>
          <input type="text" name="name" onChange={this.changeHandler}/>
          <label>Image URL: </label>
          <input type="text" name="imgurl" onChange={this.changeHandler}/>
          <button type="submit" value="Submit" >Submit</button>
        </form>
        <h1>Preview:</h1>
        <div>{this.showPreview()}</div>
      </div>
    )
  }
}