"use client";

import Link from "next/link";
import { Plus, Users, Settings, LogOut, User, Shield } from "lucide-react";

export default function NavLinks() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link
          href="/admin/users"
          className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                User Management
              </h3>
              <p className="text-sm text-gray-600">
                Manage users and permissions
              </p>
            </div>
          </div>
        </Link>
        <Link
          href="/admin/windows"
          className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Settings className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Window Management
              </h3>
              <p className="text-sm text-gray-600">
                Create and manage service windows
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/status"
          className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                System Status
              </h3>
              <p className="text-sm text-gray-600">Monitor system health</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
