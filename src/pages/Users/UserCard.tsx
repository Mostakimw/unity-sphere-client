import { TUser } from "./UserInterface";

interface TUserCard {
  user: TUser;
}

const UserCard: React.FC<TUserCard> = ({ user }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md text-center">
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        className="w-32 h-32 rounded-full border-2 object-cover mb-4 mx-auto"
      />
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2 text-blue-600">
          {`${user.first_name} ${user.last_name}`}
        </h2>
        <p className="text-gray-600 mb-2">{user.email}</p>
        <p className="text-gray-700">
          <span className="font-semibold">Domain:</span> {user.domain}
        </p>
        <div className="mt-4">
          {user.available ? (
            <span className="bg-green-500 text-white py-1 px-2 rounded-full">
              Available
            </span>
          ) : (
            <span className="bg-red-500 text-white py-1 px-2 rounded-full">
              Not Available
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
