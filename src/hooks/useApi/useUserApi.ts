import useBaseApi from "./useBaseApi";
export default function useUserApi() {
  const baseApi = useBaseApi();
  const controllerName = "users";
  return {
    async getProfile() {
      return await baseApi.getRequest(controllerName + "/profile");
    },
    async deactivate() {
      return await baseApi.getRequest(controllerName + "/deactivate");
    },
  };
}
