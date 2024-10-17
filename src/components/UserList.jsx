import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, resetUsers } from "../features/userSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, page, totalPages, loading } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(resetUsers());
    dispatch(fetchUsers(1));
  }, [dispatch]);

  const loadMore = () => {
    if (page <= totalPages) {
      dispatch(fetchUsers(page));
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white shadow-md p-4 rounded-md">
            <img
              src={user.avatar}
              alt={user.first_name}
              className="rounded-full w-24 h-24 mx-auto"
            />
            <h2 className="text-center mt-2">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-center text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : page <= totalPages ? (
        <button onClick={loadMore} className="bg-blue-500 text-white p-2 mt-4">
          Load More
        </button>
      ) : (
        <p>No more users to load.</p>
      )}
    </div>
  );
};

export default UserList;
