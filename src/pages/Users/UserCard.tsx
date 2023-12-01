import { TUser } from "./UserInterface";

interface TUserCard {
  user: TUser;
}

const UserCard: React.FC<TUserCard> = ({ user }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        className="w-32 h-32 rounded-full border-2 object-cover mb-4 mx-auto"
      />
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2">{`${user.first_name} ${user.last_name}`}</h2>
        <p className="text-gray-600 mb-2">{user.email}</p>
        <p className="text-gray-700">{`Domain: ${user.domain}`}</p>
      </div>
    </div>
  );
};

export default UserCard;
