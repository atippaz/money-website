import useSpendingTypeApi from "@/hooks/useApi/useSpendingTypeApi";
import useSystemTagApi from "@/hooks/useApi/useSystemTagApi";
import useUserApi from "@/hooks/useApi/useUserApi";
import React, { createContext, useContext, useState, useEffect } from "react";
import stateManager from "./test";
import { useRouter } from "next/router";

interface Context {
  systemTags: [];
  spendingTypes: [];
  refresh: () => Promise<void>;
}

const Provider = createContext<Context | null>(null);
export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [systemTags, setSystemTags] = useState<[]>([]);
  const [spendingTypes, setspendingTypes] = useState<[]>([]);

  const refresh = async () => {
    try {
      let accressToken: string | null = stateManager.getState();

      const systemTagApi = useSystemTagApi();
      const spendingTypeApi = useSpendingTypeApi();
      const types = await spendingTypeApi.getAll();
      const tags = await systemTagApi.getAll();
      console.log(tags);
      setSystemTags((x) => tags);
      setspendingTypes((x) => types);
      const userApi = useUserApi();
      try {
        if (accressToken != null) {
          const res = await userApi.getProfile();
          console.log(res);
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
  };
  useEffect(() => {
    stateManager.setState(localStorage.getItem("auth") || null);
    refresh();
  }, []);
  return (
    <Provider.Provider
      value={{
        systemTags,
        spendingTypes,
        refresh,
      }}
    >
      {children}
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
