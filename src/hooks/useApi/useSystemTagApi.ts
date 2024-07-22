import useBaseApi from "./useBaseApi";
export default function useSystemTagApi() {
  const baseApi = useBaseApi();
  const controllerName = "system-tags";
  return {
    async getAll() {
      return await baseApi.getRequest(controllerName);
    },
  };
}
