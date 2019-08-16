export const LOGOUT = "LOGOUT";
export const LOGINED = "LOGINED";
export const ADD_TASK = "ADD_TASK";
export const FETCH_DATA = "FETCH_DATA";
export const REGISTERED = "REGISTERED";
export const BUTTON = "BUTTON";

const taskReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, payload] };
    case FETCH_DATA:
      return state.userTasks;
    case LOGINED:
      return { ...state, isLogin: localStorage.getItem("token") };
    case LOGOUT:
      return { ...state, isLogin: false };
    case BUTTON:
      return { ...state, button: payload.button };
    case REGISTERED:
      return { ...state, register: payload };
    default:
      return state;
  }
};

export default taskReducer;
