import { combineReducers } from "redux";
import socket from "./socket";
import users from "./users";

export default combineReducers({
  socket,
  users,
})
