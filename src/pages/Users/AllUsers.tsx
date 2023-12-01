import { useState, useEffect } from "react";
import { TUser } from "./UserInterface";
import UserCard from "./UserCard";
import SectionTitle from "../../components/SectionTitle";

const AllUsers = () => {
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
        <SectionTitle title="ALl USERS" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllUsers;
