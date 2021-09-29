import { SELECTED_T1_SVOC_CRITERIAS } from "./actionTypes";

export function selectedT1SVOCCriterias(selectedT1SVOCCriterias) {
  return {
    type: SELECTED_T1_SVOC_CRITERIAS,
    payload: {
      selectedT1SVOCCriterias: selectedT1SVOCCriterias
    }
  };
}
