import useTeamData from "../../hooks/userTeamData";
import { TTeam } from "../../interfaces/TeamInterface";
import SingleTeam from "./SingleTeam";
import Loading from "../../components/Loading";

const AllTeam = () => {
  const [teamData, , isLoading] = useTeamData();
  const teams: TTeam[] = teamData?.data || [];

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="bg-svg-background h-screen p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {teams.map((team) => (
          <SingleTeam key={team._id} team={team} />
        ))}
      </div>
    </div>
  );
};

export default AllTeam;
