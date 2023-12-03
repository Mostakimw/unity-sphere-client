import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TUser } from "../interfaces/UserInterface";

type UseUserDataResult = [{ data: { users: TUser[] } }, () => void, boolean];

const useUserData = (): UseUserDataResult => {
  const {
    data: allUserData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allUserData"],
    queryFn: async () => {
      const res = await axios.get(
        "https://unity-sphere-server.vercel.app/api/users"
      );
      return res.data;
    },
  });

  return [allUserData, refetch, isLoading];
};

export default useUserData;
