import { INIT_BLOG_STATE, UPDATE_CARD_NAME, UPDATE_CONTENT, UPDATE_CATEGORY } from "./actionTypes";


export function initBlogState() {
    return {
      type: INIT_BLOG_STATE,
    };
}

export function updateCardName(cardName) {
  return {
    type: UPDATE_CARD_NAME,
    payload: {
      cardName: cardName,
    }
  };
}

export function updateContent(content) {
  return {
    type: UPDATE_CONTENT,
    payload: {
      content: content,
    }
  };
}


export function updateCategory(category) {
  return {
    type: UPDATE_CATEGORY,
    payload: {
      category: category,
    }
  };
}


