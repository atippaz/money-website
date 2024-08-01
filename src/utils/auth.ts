import useAuthApi from "@/hooks/useApi/useAuthApi";
import { useRouter } from "next/navigation";
import { useContexts } from "@/contexts/Context";
export default function auth() {
  const authApi = useAuthApi();
  // useContextStore;!
  const router = useRouter();
  const context = useContexts()!;
  return {
    login: async (credential: string, password: string) => {
      try {
        const token = await authApi.login(credential, password);
        localStorage.setItem("auth", token);
        await context.refresh(true);
        router.push("homepage");
      } catch {}
    },
    logout: async () => {
      try {
        // const token = await authApi.login(credential, password);
        localStorage.removeItem("auth");
        // await context.refresh(true);
        router.push("login");
      } catch {}
    },
  };
}
