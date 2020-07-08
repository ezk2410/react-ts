import { Network } from "../util/network";
import { URL } from "../util/constants";
import { TuitionDetail } from "./types";

export async function tuitionListService(): Promise<TuitionDetail[]> {
  const response = await Network.get(URL.TUITION_LIST);
  return response.data.dataList;
}
