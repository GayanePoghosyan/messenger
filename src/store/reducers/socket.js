
const initialState = {
  onlineUsers:[]

};
export default function reducer(state = initialState, action) {

  switch (action.type) {

    case 'ONLINE_USERS':{
      const {data}=action.payload;
      return {
        ...state,
        onlineUsers:data
      }
    }
    default: {
      return state
    }
  }
}
