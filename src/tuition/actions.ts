import { ACTION_TYPE } from "./types";
import { tuitionListService } from "./service";
import { Dispatch, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
export function fetchTuitionListAction(): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> {
  return (dispatch: Dispatch) => {
    dispatch({ type: ACTION_TYPE.TUITION_LIST_FETCH });
    return tuitionListService()
      .then((tuitionList) =>
        dispatch({
          type: ACTION_TYPE.TUITION_LIST_LOADED,
          payload: tuitionList,
        })
      )
      .catch((error) =>
        dispatch({
          type: ACTION_TYPE.TUITION_LIST_ERRORED,
          payload: error.toString(),
        })
      );
  };
}

// export function fetchTuitionListAction(): Action<string> {
//   return { type: ACTION_TYPE.TUITION_LIST_FETCH };
// }
