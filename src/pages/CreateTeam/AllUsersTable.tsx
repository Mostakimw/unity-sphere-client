/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { TUser } from "../Users/UserInterface";
import SectionTitle from "../../components/SectionTitle";
import axios from "axios";
import useUserData from "../../hooks/useUserData";

const AllUsersTable = () => {
  const [allUserData] = useUserData();
  const users: TUser[] = allUserData?.data?.users || [];
  // console.log(users[0]);

  const [selectedUsers, setSelectedUsers] = useState<TUser[]>([]);
  // console.log("selected", selectedUsers);
  const members = selectedUsers.map((member) => {
    return { user: member._id };
  });
  console.log(members);
  const [teamName, setTeamName] = useState<string | number>("");
  const [error, setError] = useState<string | null>(null);

  // user selection handler with unique domain and availability
  const handleUserSelection = (selectedUser: TUser) => {
    const isAlreadySelected = selectedUsers.some(
      (user) => user.id === selectedUser.id
    );

    const isSameDomainSelected = selectedUsers.some(
      (user) => user.domain === selectedUser.domain
    );

    const isAvailable = selectedUser.available;

    if (!isAlreadySelected && !isSameDomainSelected && isAvailable) {
      setSelectedUsers([...selectedUsers, selectedUser]);
      setError(null); // Clear any previous errors
    } else {
      if (isSameDomainSelected) {
        setError("Cannot select a user from the same domain again");
      } else if (!isAvailable) {
        setError("Cannot select a user with availability set to false");
      } else {
        setError("Invalid user selection");
      }
    }
  };

  // team creation handler
  // TODO: have to update user availability false
  const handleCreateTeam = async () => {
    if (teamName && selectedUsers.length > 0) {
      const teamData = {
        team_name: teamName,
        members: members,
      };

      const apiUrl = "http://localhost:5000/api/team";

      try {
        // saving the team data
        await axios.post(apiUrl, teamData);
        setSelectedUsers([]);
        setTeamName("");
        setError(null);
      } catch (error: any) {
        // Handle error response
        if (error.response) {
          console.error("Error creating team:", error.response.data.message);
          // set error if team name is same
          setError(error.response.data.message);
        } else if (error.request) {
          console.error("Request made, but no response received");
        } else {
          setError("Team name and at least one user must be selected");
        }
      }
    }
  };

  return (
    <div className="mt-12">
      <SectionTitle title="Create A Team" />
      <p>{error}</p>

      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Enter Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleCreateTeam}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
        >
          Create Team
        </button>
      </div>

      <p className="mb-2">{`Selected Users: ${selectedUsers.length}`}</p>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Select</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Domain</th>
              <th>Available</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th>
                  <input
                    type="checkbox"
                    onChange={() => handleUserSelection(user)}
                    checked={selectedUsers.some(
                      (selectedUser) => selectedUser.id === user.id
                    )}
                    className="checkbox"
                    disabled={
                      selectedUsers.some(
                        (selectedUser) =>
                          selectedUser.domain === user.domain &&
                          selectedUser.id !== user.id
                      ) || !user.available
                    }
                  />
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.avatar} alt="Avatar" />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-bold">
                  {`${user.first_name} ${user.last_name}`}
                </td>
                <td>{user.domain}</td>
                <td>{user.available ? "True" : "False"}</td>
                <td>{user.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsersTable;
