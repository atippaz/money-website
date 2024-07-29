import useSpendingTypeApi from "@/hooks/useApi/useSpendingTypeApi";
import useSystemTagApi from "@/hooks/useApi/useSystemTagApi";
import useUserApi from "@/hooks/useApi/useUserApi";
import React, { createContext, useContext, useState, useEffect } from "react";
import stateManager from "./stateManager";
import useCustomTagApi from "@/hooks/useApi/useCustomTagApi";

interface Context {
  systemTags: [];
  customTags: [];

  spendingTypes: [];
  refresh: () => Promise<void>;
}

const Provider = createContext<Context | null>(null);
export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [systemTags, setSystemTags] = useState<[]>([]);
  const [customTags, setCustomTags] = useState<[]>([]);
  const [spendingTypes, setspendingTypes] = useState<[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const refresh = async () => {
    try {
      setLoading(true);
      let accressToken: string | null = stateManager.getAccessTokenState();

      const systemTagApi = useSystemTagApi();
      const spendingTypeApi = useSpendingTypeApi();
      const customTagApi = useCustomTagApi();
      const types = await spendingTypeApi.getAll();
      const tags = await systemTagApi.getAll();
      const customtags = await customTagApi.getAll();

      setSystemTags((x) => tags);
      setspendingTypes((x) => types);
      setCustomTags((x) => customtags);
      const userApi = useUserApi();
      try {
        if (accressToken != null) {
          const res = await userApi.getProfile();
          stateManager.setProfileState({
            displayName: res.displayName,
            email: res.email,
            firstName: res.firstName,
            lastName: res.lastName,
            profile: res.profile,
            userId: res.userId,
            userName: res.userName,
          });
        }
      } catch (er) {
        console.log(er);
        if (window.location.pathname != "/login") {
          window.location.href = "/login";
        }
      }
    } catch (error) {
      console.error("Failed to fetch dropdown data:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    stateManager.setAccessTokenState(localStorage.getItem("auth") || null);
    refresh();
  }, []);
  return (
    <Provider.Provider
      value={{
        customTags,
        systemTags,
        spendingTypes,
        refresh,
      }}
    >
      {loading ? "loading" : children}
    </Provider.Provider>
  );
};

export const useContexts = () => {
  const context = useContext(Provider);
  if (context === undefined) {
    throw new Error(
      "useDropdownCache must be used within a DropdownCacheProvider"
    );
  }
  return context;
};
