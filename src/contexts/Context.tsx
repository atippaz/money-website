import useSpendingTypeApi from "@/hooks/useApi/useSpendingTypeApi";
import useSystemTagApi from "@/hooks/useApi/useSystemTagApi";
import React, { createContext, useContext, useState, useEffect } from "react";

interface Context {
  systemTags: [];
  spendingTypes: [];
  accressToken: string;
  refresh: () => Promise<void>;
  init: () => Promise<void>;
}

const Provider = createContext<Context | null>(null);
export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [systemTags, setSystemTags] = useState<[]>([]);
  const [spendingTypes, setspendingTypes] = useState<[]>([]);
  const [accressToken, setAccressToken] = useState(
    localStorage.getItem("auth") || ""
  );
  // setAccressToken(localStorage.getItem("auth") || "");
  const init = async () => {
    try {
      // console.log("ss");
      const systemTagApi = useSystemTagApi();
      const spendingTypeApi = useSpendingTypeApi();
      const tags = await systemTagApi.getAll();
      const types = await spendingTypeApi.getAll();
      // setSystemTags((x) => tags);
      // setspendingTypes((x) => types);
    } catch (error) {
      console.error("Failed to fetch dropdown data:", error);
    }
  };
  const refresh = async () => {
    try {
      console.log("s");
      const systemTagApi = useSystemTagApi();
      // const spendingTypeApi = useSpendingTypeApi();
      // setSystemTags(await systemTagApi.getAll());
      // setspendingTypes(await spendingTypeApi.getAll());
    } catch (error) {
      console.error("Failed to fetch dropdown data:", error);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Provider.Provider
      value={{
        init,
        systemTags,
        spendingTypes,
        refresh,
        accressToken,
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
