import io from "socket.io-client";

const socket = io.connect('http://localhost:4000', {
  'query': 'token=' + localStorage.getItem('token')
});

export function init() {
  return (dispatch) => {

    socket.on('onlineUsers',(data)=>{
      dispatch({
        type: 'ONLINE_USERS',
        payload: { data }
      })
    })

  }
}


