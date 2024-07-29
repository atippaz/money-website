import useBaseApi from "./useBaseApi";
interface Profile {
  displayName: string;
  email: string;
  firstName: string;
  lastName: string;
  profile: string;
  userId: string;
  userName: string;
}
interface Payload {
  startDate: Date | null;
  endDate: Date | null;
}

export default function useIncomeApi() {
  const baseApi = useBaseApi();
  const controllerName = "incomes";
  return {
    async getIncomes(startDate: Date | null, endDate: Date | null) {
      try {
        const objPayload: Payload = {
          startDate: startDate,
          endDate: endDate,
        };
        const searchParams = new URLSearchParams();
        Object.keys(objPayload).forEach((key) => {
          const value = objPayload[key as keyof Payload];
          if (value) {
            searchParams.append(key, value.toISOString());
          }
        });
        const res = await baseApi.getRequest(
          controllerName + "?" + searchParams
        );
        return res as [];
      } catch (ex) {
        throw ex;
      }
    },
    async createIncome() {
      return await baseApi.getRequest(controllerName + "/deactivate");
    },
  };
}
