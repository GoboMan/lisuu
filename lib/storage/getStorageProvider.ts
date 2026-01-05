import { IStorageProvider } from "./IStorageProvider";
import { LocalStorageProvider } from "./LocalStrorageProvider";

export const getStorageProvider = () : IStorageProvider => {
  return new LocalStorageProvider();
};