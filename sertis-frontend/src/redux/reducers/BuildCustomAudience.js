import {
  INIT_CUSTOM_AUDIENCE_STATE,
  LIST_AD_ACCOUNT,
  LIST_AD_ACCOUNT_SUCCEEDED,
  LIST_BRAND,
  LIST_BRAND_SUCCEEDED,
  LIST_BUSINESS_MANAGER_SUCCEEDED,
  LIST_BUSINESS_UNIT_SUCCEEDED,
  LIST_DEPARTMENTS,
  LIST_DEPARTMENTS_SUCCEEDED,
  LIST_T1_ATHENA_JOB,
  LIST_T1_ATHENA_JOB_SUCCEEDED,
  SELECTED_AD_ACCOUNT,
  SELECTED_AUDIENCE_DATE,
  SELECTED_BRANDS,
  SELECTED_BUSINESS_MANAGER,
  SELECTED_BUSINESS_UNIT,
  SELECTED_DEPARTMENTS,
  SEND_T1_QUERY_SUCCEEDED,
  SELECTED_T1_SVOC_CRITERIAS,
  RESET_AUDIENCE_FORM,
  UPDATE_AUDIENCE_NAME_SYNC,
  DELETE_AUDIENCE
} from "../action/actionTypes";
import * as moment from "moment";

const initialState = {
  adAccounts: [],
  adAccountIsLoading: false,
  adAccountIsDisabled: true,
  audienceName: "",
  BMs: [],
  bmIsLoading: true,
  BUs: [],
  buIsLoading: true,
  buIsDisabled: true,
  branches: [],
  brands: [],
  brandIsLoading: false,
  brandIsDisabled: true,
  departments: [],
  departmentIsLoading: false,
  departmentIsDisabled: true,
  selectedAdAccount: [],
  selectedAudienceDate: null,
  selectedBM: [],
  selectedBrands: [],
  selectedBU: [],
  selectedDepartments: [],
  selectedT1SVOCCriterias: [],
  submitIsDisabled: true,
  isOverrideAudienceName: false,
  moduleName: "",
  userGroup: "",
  t1_data: []
};

export default function buildCustomAudience(state = initialState, action) {
  let isDisabledSubmit = true;

  switch (action.type) {
    case INIT_CUSTOM_AUDIENCE_STATE:
      return {
        ...state,
        moduleName: action.payload.moduleName,
        userGroup: action.payload.userGroup
      };
    case LIST_AD_ACCOUNT:
      return {
        ...state,
        adAccountIsLoading: true,
        adAccountIsDisabled: true
      };
    case LIST_AD_ACCOUNT_SUCCEEDED:
      return {
        ...state,
        adAccounts: action.adAccounts,
        adAccountIsLoading: false,
        adAccountIsDisabled: false
      };
    case LIST_T1_ATHENA_JOB:
      return { ...state };
    case LIST_T1_ATHENA_JOB_SUCCEEDED:
      return { ...state, t1_data: action.t1_data };
    case LIST_BRAND:
      return {
        ...state,
        brandIsLoading: true,
        brandIsDisabled: true
      };
    case LIST_BRAND_SUCCEEDED:
      return {
        ...state,
        brands: action.brands,
        brandIsLoading: false,
        brandIsDisabled: false
      };
    case LIST_BUSINESS_MANAGER_SUCCEEDED:
      return { ...state, BMs: action.BMs, bmIsLoading: false };
    case LIST_BUSINESS_UNIT_SUCCEEDED:
      return { ...state, BUs: action.BUs, buIsLoading: false };
    case LIST_DEPARTMENTS:
      return {
        ...state,
        departmentIsLoading: true,
        departmentIsDisabled: true
      };
    case LIST_DEPARTMENTS_SUCCEEDED:
      return {
        ...state,
        departments: action.departments,
        departmentIsLoading: false,
        departmentIsDisabled: false
      };
    case SELECTED_AD_ACCOUNT:
      const { selectedAdAccount } = action.payload;
      return {
        ...state,
        selectedAdAccount: selectedAdAccount,
      };
    case SELECTED_AUDIENCE_DATE:
      const { selectedAudienceDate } = action.payload;
      return {
        ...state,
        selectedAudienceDate: selectedAudienceDate,
      };
    case SELECTED_BRANDS:
      const { selectedBrands } = action.payload;
      if (
        state.selectedAdAccount.length > 0 &&
        state.selectedBM.length > 0 &&
        state.selectedBU.length > 0 &&
        (state.selectedBrands.length > 0 || selectedBrands.length > 0)
      ) {
        isDisabledSubmit = false;
      }

      return {
        ...state,
        selectedBrands: selectedBrands,
        submitIsDisabled: isDisabledSubmit,
      };
    case SELECTED_BUSINESS_MANAGER:
      const { selectedBM } = action.payload;
      return {
        ...state,
        selectedBM: selectedBM,
        adAccounts: [],
        adAccountIsDisabled: true,
        adAccountIsLoading: false
      };
    case SELECTED_BUSINESS_UNIT:
      const { selectedBU } = action.payload;
      return {
        ...state,
        selectedBU: selectedBU,
        brands: [],
        brandIsDisabled: true,
        brandIsLoading: false,
        departments: [],
        departmentIsDisabled: true,
        departmentIsLoading: false
      };
    case SELECTED_DEPARTMENTS:
      const { selectedDepartments } = action.payload;
      if (
        state.selectedAdAccount.length > 0 &&
        state.selectedBM.length > 0 &&
        state.selectedBU.length > 0 &&
        (state.selectedDepartments.length > 0 || selectedDepartments.length > 0)
      ) {
        isDisabledSubmit = false;
      }

      return {
        ...state,
        selectedDepartments: selectedDepartments,
        submitIsDisabled: isDisabledSubmit,
      };
    case SEND_T1_QUERY_SUCCEEDED:
      return { ...state, t1_data: action.data };
    case RESET_AUDIENCE_FORM:
      let currentDate = moment().format("YYYYMMDD");
      return {
        ...state,
        adAccounts: [],
        adAccountIsDisabled: true,
        brands: [],
        brandIsDisabled: true,
        departments: [],
        departmentIsDisabled: true,
        selectedAudienceDate: [],
        selectedBM: [],
        selectedAdAccount: [],
        selectedBU: [],
        selectedBrands: [],
        selectedDepartments: [],
        audienceName: currentDate + "_{BU}_{BRAND}_{CAT}_{TA}_{LAST}",
        isOverrideAudienceName: false,
        submitIsDisabled: true,
      };
    case SELECTED_T1_SVOC_CRITERIAS:
      const { selectedT1SVOCCriterias } = action.payload;
      return {
        ...state,
        selectedT1SVOCCriterias: selectedT1SVOCCriterias
      };
    case DELETE_AUDIENCE:
      return {
        ...state
      };
    case UPDATE_AUDIENCE_NAME_SYNC:
      const { audienceName, isOverrideAudienceName } = action.payload;
      currentDate = moment().format("YYYYMMDD");

      let currentAudience = ""
      if (isOverrideAudienceName) {
        currentAudience = audienceName;
      } else {
        currentAudience = currentDate + "_{BU}_{BRAND}_{CAT}_{TA}_{LAST}";
      }

      return {
        ...state,
        audienceName: currentAudience,
        isOverrideAudienceName: isOverrideAudienceName
      };
    default:
      return state;
  }
}
