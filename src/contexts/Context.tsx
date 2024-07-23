"use client";

import useSpendingTypeApi from "@/hooks/useApi/useSpendingTypeApi";
import useSystemTagApi from "@/hooks/useApi/useSystemTagApi";
import useUserApi from "@/hooks/useApi/useUserApi";
import { create } from "zustand";

export interface StateContext {
  systemTag: any[]; // Specify a more precise type if possible
  spendingTypes: any[]; // Specify a more precise type if possible
  accessToken: string | null; // Fixed typo from accressToken to accessToken
  refresh: () => Promise<void>;
}

const useContextStore = create<StateContext>((set) => ({
  systemTag: [],
  spendingTypes: [],
  accessToken: null,

  refresh: async () => {
    if (window == undefined) {
      return;
    }
    const actk = localStorage.getItem("auth") || null;

    set({
      accessToken: actk,
    });
    const userApi = useUserApi();
    const systemTagApi = useSystemTagApi();
    const spendingTypeApi = useSpendingTypeApi();

    const systemTags = await systemTagApi.getAll();
    const spendingTypes = await spendingTypeApi.getAll();
    const userProfile = actk ? await userApi.getProfile() : null;
    set({
      systemTag: systemTags,
      spendingTypes: spendingTypes,
    });
    console.log(userProfile);
  },
}));

export default useContextStore;
