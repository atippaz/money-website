import { useContexts } from "@/contexts/Context";

export default function useBaseApi() {
  const context = useContexts();
  const requestInstance = (url: string, option: RequestInit = {}) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-API-KEY", API_KEY);
    if (context) {
      myHeaders.append("Authorization", context.accressToken);
    }
    const options: RequestInit = {
      headers: myHeaders,
      ...option,
    };
    return fetch(API_URL + url, options)
      .then((x) => x)
      .catch((x) => {
        console.log("server down");
        return null;
      });
  };
  const responseInterceptor = async (
    response: Response | null,
    parseJson = true
  ) => {
    if (response == null) return null;
    if (parseJson) {
      const data = await response.json();
      return data.data;
    }
    return response;
  };
  const baseApiInstance = async (
    url: string,
    option: RequestInit = {},
    parseJson = true
  ) => {
    try {
      const response = await requestInstance(url, option);
      console.log(response);
      const data = await responseInterceptor(response, parseJson);
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };
  return {
    async getRequest(url: string, parseJson = true) {
      try {
        return await baseApiInstance(url, {}, parseJson);
      } catch (ex) {
        throw ex;
      }
    },
    async postRequest<T>(url: string, body: T, parseJson = true) {
      try {
        return await baseApiInstance(
          url,
          {
            body: JSON.stringify(body),
            method: "POST",
          },
          parseJson
        );
      } catch (ex) {
        throw ex;
      }
    },
  };
}
