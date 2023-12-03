import { TTeamUser } from "../../interfaces/TeamInterface";
import { TUser } from "../../interfaces/UserInterface";
import SocialMedia from "./SocialMedia";

interface TTeamMemberProps {
  member: TTeamUser;
}
const TeamMember: React.FC<TTeamMemberProps> = ({ member }) => {
  const user: TUser = member.user;
  return (
    <div className=" p-4  text-center">
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        className="w-32 h-32 rounded-full border-2 object-cover mb-4 mx-auto"
      />
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2 ">
          {`${user.first_name} ${user.last_name}`}
        </h2>
        <p className="text-gray-600 mb-2">{user.email}</p>
        <p className="text-gray-700">{user.domain}</p>
      </div>
      <div>
        <SocialMedia />
      </div>
    </div>
  );
};

export default TeamMember;
