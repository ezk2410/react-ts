export interface ActionType<T> {
  type: T;
  payload: any;
}

export enum DataStatus {
  NOT_REQUESTED,
  LOADING,
  LOADED,
  ERRORED,
}

export interface RemoteData<T> {
  data?: T;
  status: DataStatus;
  error?: string;
}
