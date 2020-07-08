import { RemoteData } from "../util/storeTypes";

export enum ACTION_TYPE {
  TUITION_LIST_FETCH = "TUITION_LIST_FETCH",
  TUITION_LIST_LOADED = "TUITION_LIST_LOADED",
  TUITION_LIST_ERRORED = "TUITION_LIST_ERRORED",
}

export interface TuitionDetail {
  showReportInaccurate?: boolean;
  isNumberShared: boolean;
  enqId: number;
  isArchive: boolean;
  fromAd: boolean;
  classLocPref: ClassLOCPref;
  isStarred: boolean;
  categoryName: string;
  createdOn: string;
  isUnread: boolean;
  providerType: ProviderType;
  isJob: boolean;
  isExclusive: boolean;
  enquiryType: string;
  enquiryStatus: EnquiryStatus;
  phoneNumber: string;
  isFree: boolean;
  name: string;
  postedOn: string;
  location: string;
  isReportInaccurate?: boolean;
  tag: string;
  wasContacted?: boolean;
}

export enum ClassLOCPref {
  Home = "HOME",
  Online = "ONLINE",
  Regular = "REGULAR",
}

export enum EnquiryStatus {
  Inbox = "INBOX",
}

export enum ProviderType {
  Individual = "INDIVIDUAL",
}

export interface TuitionStateType {
  list: RemoteData<Array<TuitionDetail>>;
}
