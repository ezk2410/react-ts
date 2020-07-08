import { DataStatus, ActionType } from "../util/storeTypes";
import { ACTION_TYPE, TuitionStateType } from "./types";

const INITIAL_STATE: TuitionStateType = {
  list: {
    status: DataStatus.NOT_REQUESTED,
  },
};
export function tuitionReducer(
  state = INITIAL_STATE,
  action: ActionType<ACTION_TYPE>
): TuitionStateType {
  switch (action.type) {
    case ACTION_TYPE.TUITION_LIST_FETCH:
      return Object.assign({}, state, {
        list: { status: DataStatus.LOADING },
      });
    case ACTION_TYPE.TUITION_LIST_LOADED:
      return Object.assign({}, state, {
        list: { status: DataStatus.LOADED, data: action.payload },
      });
    case ACTION_TYPE.TUITION_LIST_ERRORED:
      return Object.assign({}, state, {
        list: { status: DataStatus.ERRORED, error: action.payload },
      });
    default:
      return state;
  }
}
