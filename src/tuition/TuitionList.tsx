import React, { useEffect } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { fetchTuitionListAction } from "./actions";
import { connect } from "react-redux";
import { RootState } from "../store";
import { RemoteData, DataStatus } from "../util/storeTypes";
import { TuitionDetail } from "./types";

interface StateProps {
  tuitionList: RemoteData<Array<TuitionDetail>>;
}

interface DispatchProps {
  fetchTuition: () => void;
}

type Props = StateProps & DispatchProps;

const TuitionList = ({ tuitionList, fetchTuition }: Props) => {
  useEffect(() => {
    fetchTuition();
  }, []);
  if (tuitionList.status === DataStatus.ERRORED)
    return <div>Unable to Load data due to {tuitionList.error}</div>;
  if (tuitionList.status === DataStatus.LOADED)
    return (
      <div>
        <ul>
          {tuitionList.data?.map((e) => (
            <li key={e.enqId}>{e.name}</li>
          ))}
        </ul>
      </div>
    );
  return <div>Loading...</div>;
};
const mapState = (state: RootState): StateProps => ({
  tuitionList: state.tuition.list,
});

const mapDispatch = (dispatch: Dispatch): DispatchProps => ({
  fetchTuition: bindActionCreators(fetchTuitionListAction, dispatch),
});

export default connect(mapState, mapDispatch)(TuitionList);
