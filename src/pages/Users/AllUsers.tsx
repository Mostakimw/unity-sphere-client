import { useState, useEffect } from "react";
import { TUser } from "./UserInterface";
import UserCard from "./UserCard";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  );
};

export default AllUsers;
