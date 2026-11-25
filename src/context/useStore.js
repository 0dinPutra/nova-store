import { useContext } from "react";
import StoreContext from "./StoreContextBase";

export function useStore() {
  return useContext(StoreContext);
}