import { createStorage } from "unstorage";
import idb from "unstorage/drivers/indexedb";

export const useIndexedDB = (opts?: { store?: string; base?: string }) =>
  createStorage({
    driver: idb({
      dbName: "paysha",
      storeName: opts?.store || "main",
      base: opts?.store || "",
    }),
  });
