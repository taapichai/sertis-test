import { SELECTED_AUDIENCE_DATE } from "./actionTypes";

export function selectedAudienceDate(selectedAudienceDate) {
  return {
    type: SELECTED_AUDIENCE_DATE,
    payload: {
      selectedAudienceDate: selectedAudienceDate
    }
  };
}
