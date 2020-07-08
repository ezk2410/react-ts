import { put, call, takeLatest } from "redux-saga/effects";
import { ACTION_TYPE } from "./types";
import { tuitionListService } from "./service";

export function* fetchTuitionList() {
  try {
    const tuitionList = yield call(tuitionListService);
    yield put({ type: ACTION_TYPE.TUITION_LIST_LOADED, payload: tuitionList });
  } catch (e) {
    yield put({
      type: ACTION_TYPE.TUITION_LIST_ERRORED,
      payload: e.toString(),
    });
  }
}

export function* tuitionSaga() {
  yield takeLatest(ACTION_TYPE.TUITION_LIST_FETCH, fetchTuitionList);
}

export function fetchTuitionListAction() {
  return { type: ACTION_TYPE.TUITION_LIST_FETCH };
}
