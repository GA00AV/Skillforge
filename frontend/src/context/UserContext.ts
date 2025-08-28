import type { UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext } from "react";

export const UserContext = createContext<
  UseQueryResult<any, Error> | undefined
>(undefined);

export function useUserContext() {
  const userQuery = useContext(UserContext);
  if (userQuery === undefined) {
    throw new Error("Children must be wrapped by Provider");
  } else {
    return userQuery;
  }
}
