import useBaseApi from "./useBaseApi";
export default function useSpendingTypeApi() {
  const baseApi = useBaseApi();
  const controllerName = "spending-types";
  return {
    async getAll() {
      return await baseApi.getRequest(controllerName);
    },
  };
}
