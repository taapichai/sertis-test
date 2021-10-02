import {
  INIT_CUSTOM_AUDIENCE_STATE,
  LIST_AD_ACCOUNT,
  SELECTED_AD_ACCOUNT,
  LIST_BUSINESS_MANAGER,
  SELECTED_BUSINESS_MANAGER,
  LIST_BUSINESS_UNIT,
  SELECTED_BUSINESS_UNIT,
  SEND_T1_QUERY,
  SEND_T1_QUERY_ASYNC,
  LIST_T1_ATHENA_JOB,
  RESET_AUDIENCE_FORM,
  UPDATE_AUDIENCE_NAME_SYNC
} from "./actionTypes";

export { initBlogState, updateCardName, updateContent, updateCategory, updateStatus, saveOrUpdateCard, updateCardState, removeCardState } from "./BlogReduxAction";
export { selectedAudienceDate } from "./AudienceDateReduxAction";
export { listBrand, selectedBrands } from "./BrandReduxAction";
export { listDepartments, selectedDepartments } from "./DepartmentReduxAction";
export { selectedT1SVOCCriterias } from "./T1SVOCReduxAction";
export { deleteAudience } from "./AudienceReduxAction";

export function initCustomAudienceState(moduleName, userGroup) {
  return {
    type: INIT_CUSTOM_AUDIENCE_STATE,
    payload: {
      moduleName: moduleName,
      userGroup: userGroup,
      audienceName: "",
      isOverrideAudienceName: false
    }
  };
}

export function sendT1Query(state) {
  return {
    type: SEND_T1_QUERY,
    payload: {
      moduleName: state.moduleName,
      userGroup: state.userGroup
    }
  };
}

export function sendT1QueryAsync(state) {
  return {
    type: SEND_T1_QUERY_ASYNC,
    payload: {
      selectedStartDate: state.selectedStartDate,
      selectedEndDate: state.selectedEndDate,
      moduleName: state.moduleName,
      selectedBM: state.selectedBM,
      selectedAdAccount: state.selectedAdAccount,
      selectedBU: state.selectedBU,
      selectedBrands: state.selectedBrands,
      selectedDepartments: state.selectedDepartments,
      audienceName: state.audienceName
    }
  };
}

export function listT1AthenaJob(state) {
  return {
    type: LIST_T1_ATHENA_JOB,
    payload: {
      moduleName: state.moduleName,
      userGroup: state.userGroup
    }
  };
}

export function listBusinessManager() {
  return {
    type: LIST_BUSINESS_MANAGER
  };
}

export function selectedBM(selectedBM) {
  return {
    type: SELECTED_BUSINESS_MANAGER,
    payload: {
      selectedBM: selectedBM
    }
  };
}

export function listAdAccount(bm_id) {
  return {
    type: LIST_AD_ACCOUNT,
    payload: {
      bm_id: bm_id
    }
  };
}

export function selectedAdAccount(selectedAdAccount) {
  return {
    type: SELECTED_AD_ACCOUNT,
    payload: {
      selectedAdAccount: selectedAdAccount
    }
  };
}

export function listBusinessUnit() {
  return {
    type: LIST_BUSINESS_UNIT
  };
}

export function selectedBU(selectedBU) {
  return {
    type: SELECTED_BUSINESS_UNIT,
    payload: {
      selectedBU: selectedBU
    }
  };
}

export function resetAudienceForm() {
  return {
    type: RESET_AUDIENCE_FORM,
  }
}

export function updateAudienceName(audienceName) {
  return {
    type: UPDATE_AUDIENCE_NAME_SYNC,
    payload: {
      audienceName: audienceName,
      isOverrideAudienceName: true
    }
  };
}
