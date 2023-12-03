import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TTeam } from "../interfaces/TeamInterface";

type UseTeamDataResult = [{ data: TTeam[] }, () => void, boolean];

const useTeamData = (): UseTeamDataResult => {
  const {
    data: allTeamData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allTeamData"],
    queryFn: async () => {
      const res = await axios.get(
        "https://unity-sphere-server.vercel.app/api/team"
      ); // Adjust the API endpoint
      return res.data;
    },
  });

  return [allTeamData, refetch, isLoading];
};

export default useTeamData;
