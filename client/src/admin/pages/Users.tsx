import { useEffect, useState } from "react";
import type { User } from "../../types/user.type";
import adminApi from "../../apis/adminApi";

interface UserWithBookings extends User {
  bookings: number;
  totalPurchases: number;
}

const Users = () => {
  const [users, setUsers] = useState<UserWithBookings[]>([]);

  const fetchUsers = async () => {
    const res = await adminApi.get("/users");
    const data = res.data.data;
    return data;
  };

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">All Users</h1>
      </div>

      <div className="mt-10 w-full">
        <table className="w-full [&>*>tr>td]:text-xs [&>*>tr>th]:text-sm">
          <thead>
            <tr className="[&>th]:border [&>th]:border-neutral-400 [&>th]:py-3">
              <th>Name</th>
              <th>Bookings</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Total Purchases</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr className="[&>td]:border [&>td]:border-neutral-400 [&>td]:py-5 [&>td]:text-center">
                <td>{user.name}</td>
                <td>{user.bookings}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.totalPurchases}</td>
                <td>
                  <div className="flex flex-col items-center space-y-2">
                    <button className="px-4 py-2 rounded-lg text-[10px] bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white transition">
                      Edit
                    </button>
                    <button className="px-4 py-2 rounded-lg text-[10px] bg-red-400 text-white transition">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
