import { useState, useEffect } from "react";
import { TUser } from "../Users/UserInterface";
import SectionTitle from "../../components/SectionTitle";

const AllUsersTable = () => {
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data: TUser[]) => {
        setUsers(data);
      });
  }, []);
  return (
    <>
      <div className="mt-12">
        <SectionTitle title="Create A Team" />
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
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
                    <input type="checkbox" className="checkbox" />
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
    </>
  );
};

export default AllUsersTable;
