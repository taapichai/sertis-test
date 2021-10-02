import { INIT_BLOG_STATE, UPDATE_CARD_NAME } from "./actionTypes";


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
