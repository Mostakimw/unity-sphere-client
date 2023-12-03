import { TTeam } from "../../interfaces/TeamInterface";
import TeamMember from "./TeamMember";

interface TSingleTeam {
  team: TTeam;
}

const SingleTeam: React.FC<TSingleTeam> = ({ team }) => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="font-bold text-2xl text-center uppercase mb-2">
        {team.team_name} Team
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.members.map((member, index: number) => (
          <TeamMember key={index} member={member}></TeamMember>
        ))}
      </div>
    </div>
  );
};

export default SingleTeam;
