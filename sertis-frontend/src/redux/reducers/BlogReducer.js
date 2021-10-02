import {
    LIST_BLOG_SUCCEEDED,
    LIST_BLOG_FAILED,
    UPDATE_CARD_NAME,
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
      case UPDATE_CARD_NAME:
        const { cardName } = action.payload;
  
        return {
          ...state,
          cardName: cardName,
        };    
      default:
        return state;
    }
  }
  