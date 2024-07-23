import useAuthApi from "@/hooks/useApi/useAuthApi";

export default function auth() {
  const authApi = useAuthApi();
  // useContextStore;

  return {
    login: async (credential: string, password: string) => {
      try {
        const token = await authApi.login(credential, password);
        localStorage.setItem("auth", token);
      } catch {}
    },
  };
}
