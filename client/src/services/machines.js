import http from "../common/http";

/**
 * 获取机器列表
 * @returns Promise<Array<any>>
 */
export const fetchMachines = async () => {
  try {
    let list = await http.get("/machines/");
    return list;
  } catch (error) {
    throw error;
  }
};

/**
 * 获取机器详情
 * @param {String} id
 * @returns Promise<any>
 */
export const fetchMachineDetail = async (id) => {
  try {
    let detail = await http.get(`/machines/${id}`);
    return detail;
  } catch (error) {
    throw error;
  }
};
