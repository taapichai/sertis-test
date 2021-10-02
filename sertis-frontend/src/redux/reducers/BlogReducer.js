import {
    LIST_BLOG_SUCCEEDED,
    LIST_BLOG_FAILED,
} from "../action/actionTypes";
  
const initialState = {
    cards: []
};

export default function buildBlog(state = initialState, action) {  
    switch (action.type) {
      case LIST_BLOG_SUCCEEDED:
        return {
          ...state,
          cards: action.cards,
        };
      case LIST_BLOG_FAILED:
        return {
          ...state,
          adAccounts: action.adAccounts,
          cards: action.cards,
        };
      default:
        return state;
    }
  }
  