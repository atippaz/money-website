import useSpendingTypeApi from "@/hooks/useApi/useSpendingTypeApi";
import useSystemTagApi from "@/hooks/useApi/useSystemTagApi";
import React, { createContext, useContext, useState, useEffect } from "react";

interface Context {
  systemTags: [];
  spendingTypes: [];
  accressToken: string;
  refresh: () => Promise<void>;
}

const Provider = createContext<Context | null>(null);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [systemTags, setSystemTags] = useState<[]>([]);
  const [spendingTypes, setspendingTypes] = useState<[]>([]);
  const [accressToken, setAccressToken] = useState("");

  const refresh = async () => {
    try {
      const systemTagApi = useSystemTagApi();
      const spendingTypeApi = useSpendingTypeApi();
      await setSystemTags(await systemTagApi.getAll());
      await setspendingTypes(await spendingTypeApi.getAll());
      setAccressToken(localStorage.getItem("auth") || "");
    } catch (error) {
      console.error("Failed to fetch dropdown data:", error);
    }
  };

  return (
    <Provider.Provider
      value={{
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
let requestProvider = false;
export const useContexts = () => {
  const context = useContext(Provider);
  console.log("usecon");
  if (context === undefined || context === null) {
    throw new Error(
      "useDropdownCache must be used within a DropdownCacheProvider"
    );
  }
  if (!requestProvider) {
    requestProvider = true;
    context.refresh();
  }
  return context;
};
