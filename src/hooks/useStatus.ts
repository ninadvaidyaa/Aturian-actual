import { useQuery } from "@tanstack/react-query";
import { fetchAllStatus } from "api/settings.api";

export const useStatus = () => {
  const { data, isError } = useQuery(["status"], fetchAllStatus);

  return {
    data,
    isError,
  };
};
