import {
    LIST_BLOG_SUCCEEDED,
    LIST_BLOG_FAILED,
    UPDATE_CARD_NAME,
    UPDATE_CONTENT,
    UPDATE_CATEGORY,
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
      case UPDATE_CONTENT:
        const { content } = action.payload;  
        return {
          ...state,
          content: content,
        };    
      case UPDATE_CATEGORY:
        const { category } = action.payload;  
        return {
          ...state,
          category: category,
        };    
      default:
        return state;
    }
  }
  