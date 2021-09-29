import {
  LIST_BUSINESS_MANAGER_SUCCEEDED,
  SELECTED_AUDIENCE_DATE,
  SELECTED_BUSINESS_MANAGER,
  SELECTED_T1_SVOC_CRITERIAS,
  UPDATE_AUDIENCE_NAME_SYNC
} from "../action/actionTypes";
import * as moment from "moment";

const initialState = {
  adAccounts: [],
  adAccountIsLoading: false,
  adAccountIsDisabled: true,
  adAccountAcronym: "ACC:ALL",
  audienceName: "",
  audienceDateAcronym: "LB:NOW",
  BMs: [],
  bmIsLoading: true,
  bmNaming: "BM:ALL",
  selectedT1SVOCCriterias: [],
  t1SVOCAcronym: "T1:ALL"
};

export default function buildCustomAudienceT1SVOC(
  state = initialState,
  action
) {
  switch (action.type) {
    case SELECTED_AUDIENCE_DATE:
      const { selectedAudienceDate } = action.payload;
      let audienceDateAcronym =
        selectedAudienceDate.length > 0
          ? "LB:" + selectedAudienceDate[0].id + "M"
          : "LB:NOW";
      return {
        ...state,
        selectedAudienceDate: selectedAudienceDate,
        audienceDateAcronym: audienceDateAcronym
      };
    case SELECTED_BUSINESS_MANAGER:
      const { selectedBM } = action.payload;
      let bmNaming =
        selectedBM.length > 0 ? "BM:" + selectedBM[0].naming_code : "BM:ALL";
      return {
        ...state,
        selectedBM: selectedBM,
        bmNaming: bmNaming,
        adAccounts: [],
        adAccountIsDisabled: true,
        adAccountIsLoading: false
      };
    case LIST_BUSINESS_MANAGER_SUCCEEDED:
      return { ...state, BMs: action.BMs, bmIsLoading: false };
    case SELECTED_T1_SVOC_CRITERIAS:
      const { selectedT1SVOCCriterias } = action.payload;
      let t1SVOCAcronym =
        selectedT1SVOCCriterias.length > 0
          ? "T1:" + selectedT1SVOCCriterias[0].id
          : "T1:ALL";
      return {
        ...state,
        selectedT1SVOCCriterias: selectedT1SVOCCriterias,
        t1SVOCAcronym: t1SVOCAcronym
      };
    case UPDATE_AUDIENCE_NAME_SYNC:
      let isDisabledSubmit = true;
      let currentDate = moment().format("YYYYMMDD");
      if (state.selectedT1SVOCCriterias.length > 0) {
        isDisabledSubmit = false;
      }
      return {
        ...state,
        audienceName:
          "|DT:" +
          currentDate +
          "|" +
          state.audienceDateAcronym +
          "|" +
          state.bmNaming +
          "|" +
          state.adAccountAcronym +
          "|" +
          state.t1SVOCAcronym +
          "|",
        submitIsDisabled: isDisabledSubmit
      };
    default:
      return state;
  }
}
