import React, { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FiSearch, FiFilter, FiUser, FiShield } from "react-icons/fi";

type Role = "Admin" | "User";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "Active" | "Invited" | "Disabled";
}

const initialUsers: UserRecord[] = [
  { id: "1", name: "Jane Doe", email: "jane.doe@acmecorp.com", role: "Admin", status: "Active" },
  { id: "2", name: "David Kim", email: "david.kim@acmecorp.com", role: "User", status: "Active" },
  { id: "3", name: "Priya Singh", email: "priya.singh@acmecorp.com", role: "User", status: "Invited" },
  { id: "4", name: "Michael Chen", email: "michael.chen@acmecorp.com", role: "Admin", status: "Active" },
  { id: "5", name: "Alex Rivera", email: "alex.rivera@acmecorp.com", role: "User", status: "Disabled" },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "All">("All");
  const [statusFilter, setStatusFilter] = useState<"All" | UserRecord["status"]>("All");

  const filteredUsers = useMemo(
    () =>
      users.filter((u) => {
        const matchSearch =
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase());
        const matchRole = roleFilter === "All" || u.role === roleFilter;
        const matchStatus = statusFilter === "All" || u.status === statusFilter;
        return matchSearch && matchRole && matchStatus;
      }),
    [users, search, roleFilter, statusFilter]
  );

  const handleRoleChange = (id: string, role: Role) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  };

  const statusBadgeClasses = (status: UserRecord["status"]) => {
    if (status === "Active") return "bg-emerald-100 text-emerald-700";
    if (status === "Invited") return "bg-amber-100 text-amber-700";
    return "bg-gray-200 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-slate-200">
      <Header />
      <Sidebar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              User Management
            </h1>
            <p className="text-gray-600 max-w-xl mt-1">
              Manage users, roles, and permissions for your company.
            </p>
          </div>
          <button className="inline-flex items-center justify-center rounded-lg bg-emerald-600 text-white px-4 py-2 text-sm font-semibold shadow hover:bg-emerald-700 transition">
            <FiUser className="mr-2" /> Invite User
          </button>
        </div>

        {/* Filters + search */}
        <section className="bg-white rounded-2xl shadow border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative text-gray-500 focus-within:text-emerald-600">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="search"
                  placeholder="Search by name or email…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
              </div>
            </div>

            {/* Role + Status filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center text-gray-600 text-sm">
                <FiFilter className="mr-2" />
                <span className="font-semibold mr-2">Role:</span>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as Role | "All")}
                  className="rounded-full border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">All</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <span className="font-semibold mr-2">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="rounded-full border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Invited">Invited</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Users list */}
        <section className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiShield className="mr-2 text-emerald-600" />
              Company Users
            </h2>
            <span className="text-sm text-gray-500">
              {filteredUsers.length} user{filteredUsers.length !== 1 && "s"}
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Role selector */}
                  <div className="text-sm">
                    <span className="block text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Role
                    </span>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value as Role)
                      }
                      className="rounded-full border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                  </div>

                  {/* Status badge */}
                  <div className="text-sm">
                    <span className="block text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Status
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadgeClasses(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="px-6 py-10 text-center text-gray-500 text-sm">
                No users match your search or filters.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

