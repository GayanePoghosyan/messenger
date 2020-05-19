import { CLIENT_SEND_MESSAGE, CLIENT_SEND_MESSAGE_SUCCESS, GET_MESSAGES_SUCCESS } from "../actions/socket";

const initialState = {
  messages: [],
  userChatData: [],
  onlineUsers:[]

};
export default function reducer(state = initialState, action) {

  switch (action.type) {
    case 'CLIENT_GET_MESSAGE': {
      const messages = [...state.messages];
      const { text } = action.payload.data;
      const [friendId] = /[\d+]$/.exec(window.location.pathname) || [];
      if (+text.from === +friendId) { // fastest way to pats string to integer
        messages.push({
          id: new Date().getTime(),
          message: text.text,
          from: text.from,
          to: text.to,
        });
        new Notification(text.text);
      }
      return {
        ...state,
        messages
      }
    }
    case 'ONLINE_USERS':{
      const {data}=action.payload;
      return {
        ...state,
        onlineUsers:data
      }
    }
    case CLIENT_SEND_MESSAGE_SUCCESS: {
      const { text } = action.payload;

      return {
        ...state,
        userChatData: text
      }
    }
    case GET_MESSAGES_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        messages: data
      }
    }
    default: {
      return state
    }
  }
}
