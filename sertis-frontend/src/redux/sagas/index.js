import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import * as moment from "moment";
import {
  getAudienceName,
  getSelectedAdAccount,
  getSelectedAudienceDate,
  getSelectedBM,
  getSelectedBrands,
  getSelectedBU,
  getSelectedDepartments,
  getCardName,
  getContent,
  getCategory,
  getStatus
} from "../selectors";

const CGO_API = process.env.REACT_APP_CGO_API;

function* callSendT1Query(action) {
  const payload = action.payload;
  const url = CGO_API + "/t1_data/build-custom-audience";
  const adAccount = yield select(getSelectedAdAccount);
  const audienceDate = yield select(getSelectedAudienceDate);
  const audienceName = yield select(getAudienceName);
  const businessManager = yield select(getSelectedBM);
  const brands = yield select(getSelectedBrands);
  const businessUnit = yield select(getSelectedBU);
  const businessDepartments = yield select(getSelectedDepartments);

  let currentDate = moment().format("YYYY-MM-DD");
  let pastDate = moment().subtract(audienceDate[0].id, 'months').format("YYYY-MM-DD");

  const params = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate: pastDate,
      endDate: currentDate,
      moduleName: payload.moduleName,
      selectedBM: businessManager ? businessManager : "",
      selectedAdAccount: adAccount ? adAccount : "",
      selectedBU: businessUnit ? businessUnit.slice() : "",
      selectedBrands: brands ? brands.slice() : "",
      selectedDepartments: businessDepartments
        ? businessDepartments.slice()
        : "",
      audienceName: audienceName,
      userGroup: payload.userGroup
    })
  };

  try {
    const response = yield call(fetch, url, params);
    const data = yield response.json();
    yield put({ type: "SEND_T1_QUERY_SUCCEEDED", data });
    yield put({ type: "LIST_T1_ATHENA_JOB", payload });
  } catch (error) {
    yield put({ type: "SEND_T1_QUERY_FAILED", error });
  }
}

function* callListT1AthenaJob(action) {
  const payload = action.payload;
  const url =
    CGO_API + "/t1_data/t1-athena-job-list?module_name=" + payload.moduleName;

  const params = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const response = yield call(fetch, url, params);
    const data = yield response.json();
    yield put({ type: "LIST_T1_ATHENA_JOB_SUCCEEDED", t1_data: data });
  } catch (error) {
    yield put({ type: "LIST_T1_ATHENA_JOB_FAILED", error });
  }
}

function* callInitCustomAudienceState(action) {
  const payload = action.payload;
  yield put({ type: "LIST_BUSINESS_MANAGER" });
  yield put({ type: "LIST_BUSINESS_UNIT" });
  yield put({ type: "UPDATE_AUDIENCE_NAME_SYNC", payload });
  yield put({ type: "LIST_T1_ATHENA_JOB", payload });
}

function* callInitBlogState(action) {
  const url = CGO_API + "/mini_blog/";

  const params = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem("cc")
    }
  };
  try {
    const response = yield call(fetch, url, params);
    const data = yield response.json();
    yield put({ type: "LIST_BLOG_SUCCEEDED", cards: data });
  } catch (error) {
    yield put({ type: "LIST_BLOG_FAILED", error });
  }
}

function* callSaveOrUpdateCard(action) {
  const payload = action.payload;
  const url = CGO_API + "/mini_blog/";
  const cardName = yield select(getCardName);
  const content = yield select(getContent);
  const category = yield select(getCategory);
  const status = yield select(getStatus);

  const params = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem("cc")
    },
    body: JSON.stringify({
      name: cardName,
      content: content,
      category: category,
      status: status,
    })

  };
  try {
    const response = yield call(fetch, url, params);
    const data = yield response.json();
    yield put({ type: "LIST_BLOG_SUCCEEDED", cards: data });
  } catch (error) {
    yield put({ type: "LIST_BLOG_FAILED", error });
  }

}


function* callListAdAccount(action) {
  const { bm_id } = action.payload;
  const url = CGO_API + "/business-manager/" + bm_id + "/ad-accounts/";

  const params = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const response = yield call(fetch, url, params);
    const data = yield response.json();
    yield put({ type: "LIST_AD_ACCOUNT_SUCCEEDED", adAccounts: data });
  } catch (error) {
    yield put({ type: "LIST_BUSINESS_MANAGER_FAILED", error });
  }
}

function* callListBrand(action) {
  const { bu_id } = action.payload;
  const url = CGO_API + "/t1_data/brand?bu_ids=" + bu_id;

  const params = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const response = yield call(fetch, url, params);
    const data = yield response.json();
    yield put({ type: "LIST_BRAND_SUCCEEDED", brands: data });
  } catch (error) {
    yield put({ type: "LIST_BRAND_FAILED", error });
  }
}

function* callListBusinessManager(action) {
  const url = CGO_API + "/business-manager/";

  const params = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const response = yield call(fetch, url, params);
    const data = yield response.json();
    yield put({ type: "LIST_BUSINESS_MANAGER_SUCCEEDED", BMs: data });
  } catch (error) {
    yield put({ type: "LIST_BUSINESS_MANAGER_FAILED", error });
  }
}

function* callListBusinessUnit(action) {
  const url = CGO_API + "/t1_data/bu";

  const params = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const response = yield call(fetch, url, params);
    const data = yield response.json();
    yield put({ type: "LIST_BUSINESS_UNIT_SUCCEEDED", BUs: data });
  } catch (error) {
    yield put({ type: "LIST_BUSINESS_UNIT_FAILED", error });
  }
}

function* callListDepartments(action) {
  const { bu_id, brand_ids } = action.payload;
  let path = "/t1_data/dept?bu_ids=" + bu_id;
  if (brand_ids.length > 0) {
    path += "&brand_ids=" + brand_ids;
  }

  const url = CGO_API + path;

  const params = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const response = yield call(fetch, url, params);
    const data = yield response.json();
    yield put({ type: "LIST_DEPARTMENTS_SUCCEEDED", departments: data });
  } catch (error) {
    yield put({ type: "LIST_DEPARTMENTS_FAILED", error });
  }
}

function* callDeleteAudience(action) {
  const payload = action.payload;
  let path = "/t1_data/delete-custom-audience/" + payload.t1_id;

  const url = CGO_API + path;
  
  const params = {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    yield call(fetch, url, params);
    yield put({ type: "LIST_T1_ATHENA_JOB", payload });
  } catch (error) {
    yield put({ type: "LIST_T1_ATHENA_JOB_FAILED", error });
  }
}

function* watchInitCustomAudienceState() {
  yield takeEvery("INIT_CUSTOM_AUDIENCE_STATE", callInitCustomAudienceState);
}

function* watchInitBlogState() {
  yield takeEvery("INIT_BLOG_STATE", callInitBlogState);
}

function* watchSaveOrUpdateCardState() {
  yield takeEvery("SAVE_OR_UPDATE_CARD", callSaveOrUpdateCard);
}


function* watchListAdAccount() {
  yield takeEvery("LIST_AD_ACCOUNT", callListAdAccount);
}

function* watchListBrand() {
  yield takeLatest("LIST_BRAND", callListBrand);
}

function* watchListBusinessManager() {
  yield takeEvery("LIST_BUSINESS_MANAGER", callListBusinessManager);
}

function* watchListBusinessUnit() {
  yield takeEvery("LIST_BUSINESS_UNIT", callListBusinessUnit);
}

function* watchListDepartment() {
  yield takeLatest("LIST_DEPARTMENTS", callListDepartments);
}

function* watchSendT1Query() {
  yield takeEvery("SEND_T1_QUERY", callSendT1Query);
}

function* watchListT1AthenaJob() {
  yield takeEvery("LIST_T1_ATHENA_JOB", callListT1AthenaJob);
}

function* watchDeleteAudience() {
  yield takeLatest("DELETE_AUDIENCE", callDeleteAudience);
}

export default function* customAudienceSaga() {
  yield all([
    watchInitBlogState(),
    watchSaveOrUpdateCardState(),
    watchInitCustomAudienceState(),
    watchListAdAccount(),
    watchListBrand(),
    watchListBusinessManager(),
    watchListBusinessUnit(),
    watchListDepartment(),
    watchSendT1Query(),
    watchListT1AthenaJob(),
    watchDeleteAudience()
  ]);
}
