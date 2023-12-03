/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import axios from "axios";
import useUserData from "../../hooks/useUserData";
import { TUser } from "../../interfaces/UserInterface";
import Container from "../../components/Container";
import Loading from "../../components/Loading";

interface Filter {
  domain: string;
  gender: string;
  available: string;
}

const AllUsersTable = () => {
  const [allUserData, , isLoading] = useUserData();
  const users: TUser[] = allUserData?.data?.users || [];

  const [selectedUsers, setSelectedUsers] = useState<TUser[]>([]);
  const [filter, setFilter] = useState({
    domain: "",
    gender: "",
    available: "undefined",
  });

  const members = selectedUsers.map((member) => {
    return { user: member._id };
  });
  const [teamName, setTeamName] = useState<string | number>("");
  const [error, setError] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoadingForFiltered, setIsLoadingForFiltered] = useState(true);

  // user selection handler with unique domain and available
  const handleUserSelection = (selectedUser: TUser) => {
    const isAlreadySelected = selectedUsers.some(
      (user) => user.id === selectedUser.id || user._id === selectedUser._id
    );

    const isSameDomainSelected = selectedUsers.some(
      (user) => user.domain === selectedUser.domain
    );

    const isAvailable = selectedUser.available;

    if (!isAlreadySelected && !isSameDomainSelected && isAvailable) {
      setSelectedUsers((prevSelectedUsers) => [
        ...prevSelectedUsers,
        selectedUser,
      ]);
      setError(null); // Clear any previous errors
    } else {
      // Toggle selection
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((user) => user._id !== selectedUser._id)
      );

      if (!isAlreadySelected) {
        if (isSameDomainSelected) {
          setError("Cannot select a user from the same domain again");
        } else if (!isAvailable) {
          setError("Cannot select a user with available set to false");
        } else {
          setError("Invalid user selection");
        }
      }
    }
  };

  // team creation handler
  // TODO: have to update user available false
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

  //! filtering start
  const handleFilterChange = (
    type: keyof Filter, // The type should be one of the keys of the Filter interface
    value: string | boolean
  ) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [type]: value,
    }));
  };

  // Fetch users based on filter when filter changes
  useEffect(() => {
    const fetchFilteredUsers = async () => {
      setIsLoadingForFiltered(true);

      try {
        const response = await axios.get("http://localhost:5000/api/users", {
          params: filter,
        });
        setFilteredUsers(response.data.data.users);
      } catch (error) {
        console.error("Error fetching filtered users:", error);
      } finally {
        setIsLoadingForFiltered(false);
      }
    };

    fetchFilteredUsers();
  }, [filter]);
  //! filtering end

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <Container>
        <div className="mt-12">
          <SectionTitle title="Create A Team From Here" />
          <p className="text-red-500 mb-4">{error}</p>

          <div className="flex items-center space-x-4 mb-4">
            {/* team name  */}
            <div>
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

            {/* filtering  */}
            <div>
              {/* Domain filter dropdown */}
              <select
                onChange={(e) => handleFilterChange("domain", e.target.value)}
                value={filter.domain}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">All Domains</option>
                {users
                  .map((user) => user.domain)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
              </select>
              {/* Gender filter dropdown */}
              <select
                onChange={(e) => handleFilterChange("gender", e.target.value)}
                value={filter.gender}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">All Genders</option>
                {users
                  .map((user) => user.gender)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
              </select>
              {/* available filter dropdown */}
              <select
                onChange={(e) =>
                  handleFilterChange("available", e.target.value)
                }
                value={filter.available}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">All available</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>

          {selectedUsers.length > 0 && (
            <p className="mb-2 text-blue-500">{`Selected Users: ${selectedUsers.length}`}</p>
          )}

          <div className="overflow-x-auto">
            {isLoadingForFiltered ? (
              <Loading />
            ) : (
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
                  {(filteredUsers.length > 0 ? filteredUsers : users).map(
                    (user) => (
                      <tr key={user._id}>
                        <th>
                          <input
                            type="checkbox"
                            onChange={() => handleUserSelection(user)}
                            checked={selectedUsers.some(
                              (selectedUser) => selectedUser._id === user._id
                            )}
                            className="checkbox"
                            disabled={
                              selectedUsers.some(
                                (selectedUser) =>
                                  selectedUser.domain === user.domain &&
                                  selectedUser._id !== user._id
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
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default AllUsersTable;
