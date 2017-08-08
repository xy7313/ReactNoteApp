import React, { Component } from "react";
import logo from "./logo.svg";
// import "./App.css";

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

var Comment = React.createClass({
  getInitialState: function() {
    return { editing: false };
  },
  edit: function() {
    this.setState({ editing: true });
  },
  save: function() {
    this.setState({ editing: false });
    this.props.saveUpdate(this.refs.newText.value, this.props.index);
  },
  remove: function() {
    this.props.remove(this.props.index);
  },

  renderForm: function() {
    return (
      <div className="commentContainer">
        <textarea ref="newText" defaultValue={this.props.children} />
        <button onClick={this.save} className="btn btn-success">
          Save
        </button>
      </div>
    );
  },
  renderNormal: function() {
    return (
      <div className="commentContainer">
        <div className="commentText">
          {" "}{this.props.children}{" "}
        </div>
        <button onClick={this.edit} className="btn btn-primary">
          Edit
        </button>
        <button onClick={this.remove} className="btn btn-danger">
          Remove
        </button>
      </div>
    );
  },
  render: function() {
    if (this.state.editing) {
      return this.renderForm();
    } else {
      return this.renderNormal();
    }
  }
});

var Board = React.createClass({
  getInitialState: function() {
    return {
      comments: ["I like bacon", "want some ice cream", "done here"]
    };
  },
  addComment: function(text) {
    var arr = this.state.comments;
    arr.push(text);
    this.setState({ comments: arr });
  },
  removeComment: function(i) {
    console.log("remove:" + i);
    var arr = this.state.comments;
    arr.splice(i, 1);
    this.setState({ comments: arr });
  },
  updateComment: function(newText, i) {
    console.log("new text:" + newText);
    var arr = this.state.comments;
    arr[i] = newText;
    this.setState({ comments: arr });
  },
  eachComment: function(text, i) {
    // unique identifier, i: increment for the array
    return (
      <Comment
        key={i}
        index={i}
        saveUpdate={this.updateComment}
        remove={this.removeComment}
      >
        {text}
      </Comment>
    );
  },
  render: function() {
    return (
      <div>
        <button
          className="btn btn-info"
          onClick={this.addComment.bind(null, "Type here")}
        >
          New A Comment
        </button>
        <div className="board">
          {this.state.comments.map(this.eachComment)}
        </div>
      </div>
    );
  }
});

export default Board;
