import { INIT_BLOG_STATE, UPDATE_CARD_NAME, UPDATE_CONTENT, 
  UPDATE_CATEGORY, UPDATE_STATUS, SAVE_OR_UPDATE_CARD, UPDATE_CARD_STATE } from "./actionTypes";


export function initBlogState() {
    return {
      type: INIT_BLOG_STATE,
    };
}

export function updateCardState(id, mode) {
  return {
    type: UPDATE_CARD_STATE,
    payload: {
      id: id,
      mode: mode
    }
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


export function updateStatus(status) {
  return {
    type: UPDATE_STATUS,
    payload: {
      status: status,
    }
  };
}

export function saveOrUpdateCard() {
  return {
    type: SAVE_OR_UPDATE_CARD,
  };
}

