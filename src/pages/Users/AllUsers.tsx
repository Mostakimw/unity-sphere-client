import { useState, useEffect } from "react";
import SectionTitle from "../../components/SectionTitle";
import UserCard from "./UserCard";
import { TUser } from "./UserInterface";

const AllUsers = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users?page=${currentPage}&pageSize=${PAGE_SIZE}`
        );
        const { data } = await response.json();
        const { users, totalPages } = data;
        console.log(data);

        setUsers(users);
        setTotalPages(totalPages || 1);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="mt-12">
        <SectionTitle title="ALL USERS" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`mx-2 p-2 ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllUsers;
