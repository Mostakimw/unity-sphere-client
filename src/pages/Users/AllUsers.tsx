import React, { useState, useEffect } from "react";
import SectionTitle from "../../components/SectionTitle";
import UserCard from "./UserCard";
import { TUser } from "../../interfaces/UserInterface";
import Container from "../../components/Container";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const PAGE_SIZE = 20;

  // fetching users by useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = `https://unity-sphere-server.vercel.app/api/users?page=${currentPage}&pageSize=${PAGE_SIZE}${
          searchQuery ? `&query=${searchQuery}` : ""
        }`;

        const response = await fetch(apiUrl);
        const { data } = await response.json();

        const { users, totalPages } = data;

        setUsers(users);
        setTotalPages(totalPages || 1);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentPage, searchQuery]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentPage(1); // Reset page when searching
  };

  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Container>
        <div className="mt-12">
          <SectionTitle title="ALL USERS" />

          {/* Search form */}
          <form
            onSubmit={handleSearchSubmit}
            className="mb-4 flex justify-center"
          >
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border p-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 ml-2">
              Search
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {users.length === 0 ? (
              <p>No users found</p>
            ) : (
              users.map((user) => <UserCard key={user.id} user={user} />)
            )}
          </div>

          {/* Pagination buttons */}
          {users.length === 0 ? (
            <p></p>
          ) : (
            <div className="flex justify-center my-12">
              {Array.from({ length: totalPages }, (_, index) => {
                const maxVisibleButtons = 5;
                const start = Math.max(
                  0,
                  currentPage - Math.floor(maxVisibleButtons / 2)
                );
                const end = Math.min(totalPages, start + maxVisibleButtons);

                const showEllipsisStart = start > 0;
                const showEllipsisEnd = end < totalPages;

                return (
                  <React.Fragment key={index + 1}>
                    {showEllipsisStart && index === 0 && <span>...</span>}
                    {index >= start && index < end && (
                      <button
                        className={`mx-2 p-2 ${
                          currentPage === index + 1
                            ? "bg-blue-500 text-white"
                            : ""
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    )}
                    {showEllipsisEnd && index === totalPages - 1 && (
                      <span>...</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default AllUsers;
