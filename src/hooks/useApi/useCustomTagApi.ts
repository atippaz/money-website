import useBaseApi from "./useBaseApi";
export default function useCustomTagApi() {
  const baseApi = useBaseApi();
  const controllerName = "custom-tags";
  return {
    async getAll() {
      return await baseApi.getRequest(controllerName);
    },
    async create() {
      return await baseApi.getRequest(controllerName);
    },
  };
}
