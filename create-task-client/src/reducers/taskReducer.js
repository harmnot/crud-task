export const LOGOUT = "LOGOUT";
export const LOGINED = "LOGINED";
export const ADD_TASK = "ADD_TASK";
export const FETCH_DATA = "FETCH_DATA";
export const REGISTERED = "REGISTERED";
export const BUTTON = "BUTTON";
export const DELETE_TASK = "DELETE_TASK";

const taskReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, payload] };
    case "FETCH_DATA_LIST":
      return { ...state, list: payload };
    case "ADD_LIST_TASK":
      return { ...state, list: [...state.list, { listName: payload }] };
    case "FETCH_DATA_TASKFOR":
      return { ...state, taskFor: payload };
    case FETCH_DATA:
      return { ...state, task: payload };
    case "DELETE_TASK_LIST_UPDATE":
      return {
        ...state,
        list: state.list.filter((val, index) => index !== payload.index)
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((val, index) => index !== payload.index)
      };
    case LOGINED:
      return { ...state, isLogin: localStorage.getItem("token") };
    case LOGOUT:
      return { ...state, isLogin: false };
    case BUTTON:
      return { ...state, button: payload.button };
    case REGISTERED:
      return { ...state, register: payload };
    case "FETCH_TASK":
      return { ...state, tasks: payload };
    case "FETCH_EMPLOYEES":
      return { ...state, employeees: payload };
    default:
      return state;
  }
};

export default taskReducer;
