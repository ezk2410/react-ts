import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "../store";
import { RemoteData } from "../util/storeTypes";
import { TuitionDetail } from "./types";
import { connect } from "react-redux";

interface StateProps {
  tuitionList: RemoteData<Array<TuitionDetail>>;
}
const TuitionInfo = ({ tuitionList }: StateProps) => {
  const { tuitionId } = useParams();
  const [tuitionInfo, setTuitionInfo] = useState<TuitionDetail | undefined>(
    undefined
  );
  useEffect(() => {
    const numId = Number(tuitionId);
    const info = tuitionList.data?.find((tui) => tui.enqId === numId);
    if (info) setTuitionInfo(info);
  }, [tuitionId]);
  if (tuitionInfo)
    return (
      <div>
        <div>
          REQ ID: <span>{tuitionInfo.enqId}</span>
        </div>
        <div>
          Name: <span>{tuitionInfo.name}</span>
        </div>
        <div>
          Phone: <span>{tuitionInfo.phoneNumber}</span>
        </div>
      </div>
    );
  return <div>No Tuition Details found For {tuitionId}</div>;
};

const mapState = (state: RootState): StateProps => ({
  tuitionList: state.tuition.list,
});

export default connect(mapState, {})(TuitionInfo);
