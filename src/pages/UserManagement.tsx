import React, { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  FiSearch,
  FiFilter,
  FiUser,
  FiShield,
  FiMoreHorizontal,
} from "react-icons/fi";

type Role = "Admin" | "User";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "Active" | "Invited" | "Disabled";
}

const initialUsers: UserRecord[] = [
  {
    id: "1",
    name: "Jane Doe",
    email: "jane.doe@acmecorp.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "2",
    name: "David Kim",
    email: "david.kim@acmecorp.com",
    role: "User",
    status: "Active",
  },
  {
    id: "3",
    name: "Priya Singh",
    email: "priya.singh@acmecorp.com",
    role: "User",
    status: "Invited",
  },
  {
    id: "4",
    name: "Michael Chen",
    email: "michael.chen@acmecorp.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "5",
    name: "Alex Rivera",
    email: "alex.rivera@acmecorp.com",
    role: "User",
    status: "Invited",
  },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "All">("All");
  const [statusFilter, setStatusFilter] = useState<
    "All" | UserRecord["status"]
  >("All");

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
    if (status === "Active")
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    if (status === "Invited")
      return "bg-amber-100 text-amber-700 border border-amber-200";
    return "bg-gray-100 text-gray-600 border border-gray-200";
  };

  return (
    <div className="min-h-screen bg-slate-200">
      <Header />
      <Sidebar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              User Management
            </h1>
            <p className="text-gray-600 max-w-2xl text-lg">
              Manage users, roles, and permissions for your company.
            </p>
          </div>
          <button className="inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-6 py-3 text-sm font-semibold shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
            <FiUser className="mr-2" size={16} />
            Invite User
          </button>
        </div>

        {/* Filters + search */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 mb-8 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="flex-1 max-w-lg">
              <div className="relative text-gray-500 focus-within:text-emerald-600">
                <FiSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={18}
                />
                <input
                  type="search"
                  placeholder="Search by name or email…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-6 py-3.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Role + Status filters */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-3">
                <div className="flex items-center text-gray-600 text-sm">
                  <FiFilter className="mr-2 text-emerald-600" size={16} />
                  <span className="font-semibold mr-3 text-gray-700">
                    Role:
                  </span>
                </div>
                <select
                  value={roleFilter}
                  onChange={(e) =>
                    setRoleFilter(e.target.value as Role | "All")
                  }
                  className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm transition-all duration-200"
                >
                  <option value="All">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <span className="font-semibold text-sm text-gray-700">
                  Status:
                </span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm transition-all duration-200"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Invited">Invited</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Users list */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden backdrop-blur-sm">
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                  <FiShield className="text-emerald-600" size={20} />
                </div>
                Company Users
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
                  {filteredUsers.length} user{filteredUsers.length !== 1 && "s"}
                </span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredUsers.map((user, index) => (
              <div
                key={user.id}
                className={`px-8 py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-gradient-to-r hover:from-slate-50 hover:to-emerald-50/30 transition-all duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                }`}
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-sm shadow-sm border border-emerald-200">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        user.status === "Active"
                          ? "bg-emerald-500"
                          : user.status === "Invited"
                          ? "bg-amber-500"
                          : "bg-gray-400"
                      }`}
                    ></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 lg:gap-8">
                  {/* Role selector */}
                  <div className="text-sm">
                    <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                      Role
                    </span>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value as Role)
                      }
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm transition-all duration-200 min-w-[90px]"
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                  </div>

                  {/* Status badge */}
                  <div className="text-sm">
                    <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                      Status
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm ${statusBadgeClasses(
                        user.status
                      )}`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          user.status === "Active"
                            ? "bg-emerald-500"
                            : user.status === "Invited"
                            ? "bg-amber-500"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      {user.status}
                    </span>
                  </div>

                  {/* Actions menu */}
                  <div className="flex items-center">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
                      <FiMoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="px-8 py-16 text-center">
                <div className="max-w-sm mx-auto">
                  <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <FiUser className="text-gray-400" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No users found
                  </h3>
                  <p className="text-gray-500 text-sm">
                    No users match your current search or filter criteria. Try
                    adjusting your filters or search terms.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
