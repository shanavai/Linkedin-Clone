import { SET_LOADING_STATE, GET_POSTS } from "../actions/actionType";

export const initState = {
  posts: [],
  loading: false,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case SET_LOADING_STATE:
      return {
        ...state,
        loading: action.status,
      };
    default:
      return state;
  }
};
export default postReducer;