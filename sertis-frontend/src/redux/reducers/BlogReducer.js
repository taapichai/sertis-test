import {
    LIST_BLOG_SUCCEEDED,
    LIST_BLOG_FAILED,
    UPDATE_CARD_STATE,
    LOAD_CARD_SUCCEEDED,
    UPDATE_CARD_NAME,
    UPDATE_CONTENT,
    UPDATE_CATEGORY,
    UPDATE_STATUS,
    INIT_BLOG_STATE,
} from "../action/actionTypes";
  
const initialState = {
    cards: []
};

export default function buildBlog(state = initialState, action) {  
    switch (action.type) {
      case INIT_BLOG_STATE:
        return {
          ...state,
          cards: [],
          status: true,
          mode: null,
          id: null,
          cardName: null,
          content: null,
          category: null
        };
      case LIST_BLOG_SUCCEEDED:
        return {
          ...state,
          cards: action.cards,
          mode: null,
          id: null,
          cardName: null,
          content: null,
          category: null
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
      case UPDATE_CARD_STATE:
        const { id, mode } = action.payload;  
        return {
          ...state,
          mode: mode,
          id: id
        };    
      case UPDATE_STATUS:
        const { status } = action.payload;  
        return {
          ...state,
          status: status,
        };    
      case LOAD_CARD_SUCCEEDED:
        const { card } = action;  
        return {
          ...state,
          id: card.id,
          cardName: card.name,
          content: card.content,
          category: card.category,
          status: card.status,
        };    
      default:
        return state;
    }
  }
  