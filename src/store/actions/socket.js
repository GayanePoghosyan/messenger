import io from "socket.io-client";

const socket = io.connect('http://localhost:4000', {
  'query': 'token=' + localStorage.getItem('token')
});

export function init() {
  return (dispatch) => {
    socket.on('video', (data) => {
      dispatch({
        type: 'VIDEO_CALL_REQUEST',
        payload: { data }
      })
    });
    socket.on('onlineUsers',(data)=>{
      dispatch({
        type: 'ONLINE_USERS',
        payload: { data }
      })
    })

    let interval;
    socket.on('typing', (data) => {
      dispatch({
        type: 'SOCKET_TYPING',
        payload: { data }
      });
      interval = setInterval(() => {
        dispatch({
          type: 'SOCKET_TYPING_END',
          payload: { data }
        })
      }, 3000)
    })
  }
}

export const CLIENT_SEND_MESSAGE = 'CLIENT_SEND_MESSAGE';
export const CLIENT_SEND_MESSAGE_SUCCESS = 'CLIENT_SEND_MESSAGE_SUCCESS';
export const CLIENT_SEND_MESSAGE_FAIL = 'CLIENT_SEND_MESSAGE_FAIL';

export function sendMessage(text) {
  socket.emit('message', { text });
  return {
    type: CLIENT_SEND_MESSAGE,
    payload: { text }
  }
}

export const VIDEO_CALL_REQUEST = 'VIDEO_CALL_REQUEST';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_FAIL = 'GET_MESSAGES_FAIL';

export function getMessages(id) {
  return {
    type: GET_MESSAGES,
    payload: { id }
  }
}
