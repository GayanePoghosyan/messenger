import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUsers } from "../store/actions/users";
import {init} from "../store/actions/socket";
import {Link, Redirect} from "react-router-dom";
import account from "../helpers/Account"

import io from "socket.io-client" ;

let socket = io.connect('http://localhost:4000', {
  'query': 'token=' + localStorage.getItem('token')
});
class Home extends Component {


  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      account:JSON.parse(localStorage.getItem("account")),
    }
  }

  componentDidMount() {
    this.props.init();
    this.props.getUsers();
    socket.on("stream", (image) => {
      const remote = this.refs.img;
      remote.src = image;
    });
    socket.on("end-stream", (image) => {
      const remote = this.refs.img;
      remote.src=image;
    })
  }

  handleLogout=async() =>{
    account.deleteData();
    window.location.href = '/login';
  };

  loadCamera = (stream) => {
    try {
      const video = this.refs.video;
      video.srcObject = stream;
      window.localStream = stream;
      video.onloadedmetadata = function (e) {
        video.play();
      };
    } catch (e) {
      console.log(e)
    }
  };

  loadFail = () => {
    console.log("Camera not connected");
  };

  handleCall =() => {
    const {friendId}=this.props.match.params;
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

    if (navigator.getUserMedia) {
      navigator.getUserMedia({
        video: true,
        audio: false
      }, this.loadCamera, this.loadFail);
    }


    const canvas = this.refs.preview;
    const video = this.refs.video;
    const context = canvas.getContext('2d');

    canvas.width = 200;
    canvas.height = 200;

    context.width = canvas.width;
    context.height = canvas.height;

    setInterval(function () {
      context.drawImage(video, 0, 0, context.width, context.height);
      socket.emit('video', {img:canvas.toDataURL('image/webp'),to:friendId});
    }, 100)
  };
  handleEndCall=()=>{
    const {friendId}=this.props.match.params;
    const video = this.refs.video;
    if( window.localStream){
      window.localStream.getVideoTracks()[0].stop();
      video.srcObject = null;
    }
    const canvas = this.refs.preview;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL('image/png');
    socket.emit('end-video',{img:data,to:friendId});
  };
  render() {

    const { token, users,userStatus} = this.props;

    const {account}=this.state;
    const {friendId}=this.props.match.params;
    const usersList=users.filter((user)=>user.id!==account.id);
    if (!token ) {
      return <Redirect to="/login" />
    }
    return (
      <div className="container clearfix">

        <div className="chat">
          <div className="chat-header clearfix">
            <img src="/user.jpg" alt="avatar" />
            <button className='call logout' onClick={this.handleLogout}>Logout</button>
             <div className="chat-about chat-with">{account.name}&nbsp;{account.lname}</div>
            {friendId?
                <span className="actions">
                  <button onClick={this.handleCall} className="call button-call"> Video Call</button>
                  <button onClick={this.handleEndCall} className="call end-call">End Call </button>
                </span>:""}

          </div>
          <div className="people-list" id="people-list">
            <ul className="list">
              {usersList.map((user) => (
                  <Link to={`/account/${user.id}`}><li className="clearfix" key={user.id} >
                    <img src="/user.jpg"
                         alt="avatar"/>
                    <div className="about">
                      <div className="name">
                        <span>{user.first_name + ' ' + user.last_name}</span>
                      </div>
                      <div className="status">
                        {userStatus.find((st) => st == user.id) ?
                            <i className="fa fa-circle online">online</i> :
                            <i className="fa fa-circle offline">offline</i>}
                      </div>
                    </div>
                  </li></Link>
              ))}
            </ul>

          </div>
          <div className="chat-history">
            <video src="" ref="video" style={{width: 200, marginRight:10}}/>
            <canvas style={{display: "none"}} ref="preview"/>
            <img src="" ref="img" />
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  token: state.users.token,
  users: state.users.list,
  userStatus: state.socket.onlineUsers,
  account: state.users.account,
});

const mapDispatchToProps = {
  getUsers,
  init,

};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default Container;
