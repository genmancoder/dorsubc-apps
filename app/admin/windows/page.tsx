"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Link from "next/link";
import { Plus, Users, Settings, Shield } from "lucide-react";
import NavLinks from "../nav-links";
import AdminHeader from "@/components/admin/admin-header";

// Types
type User = {
  id: number;
  name: string;
  email: string;
};

type QueeWindow = {
  id: number;
  windowTitle: string;
  windowDescription: string;
  users?: User[];
};

export default function Cpanel() {
  const [windows, setWindows] = useState<QueeWindow[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [assignedUserIds, setAssignedUserIds] = useState<number[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editWindowOpen, setEditWindowOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const [selectedWindow, setSelectedWindow] = useState<QueeWindow | null>(null);

  const router = useRouter();

  const [form, setForm] = useState({
    windowTitle: "",
    windowDescription: "",
  });

  const [error, setError] = useState("");

  // Fetch all windows
  const fetchWindow = async () => {
    const res = await fetch("/api/window/list");
    if (res.ok) {
      const data = await res.json();
      setWindows(data);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    const res = await fetch("/api/users/list");
    if (res.ok) {
      setUsers(await res.json());
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchWindow(), fetchUsers()]).finally(() => {
      setIsLoading(false);
    });
  }, []);

  // Form handling
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { windowTitle, windowDescription } = form;
    if (!windowTitle || !windowDescription) {
      return "All fields are required.";
    }
    return "";
  };

  const resetForm = () => {
    setForm({
      windowTitle: "",
      windowDescription: "",
    });
  };

  // Add window
  const addWindow = async () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    const res = await fetch("/api/window/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      toast("Failed to create window.");
      return;
    }

    toast("Window has been created.");
    resetForm();
    fetchWindow();
    setOpen(false);
  };

  // Edit window
  const openEditWindowModal = (window: QueeWindow) => {
    setSelectedWindow(window);
    setForm({
      windowTitle: window.windowTitle,
      windowDescription: window.windowDescription,
    });
    setEditWindowOpen(true);
  };

  const updateWindow = async () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    if (!selectedWindow) return;

    try {
      const res = await fetch(`/api/window/${selectedWindow.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update window");

      toast("Window updated successfully.");
      setEditWindowOpen(false);
      setSelectedWindow(null);
      resetForm();
      fetchWindow();
    } catch (err) {
      console.error(err);
      toast("Error updating window.");
    }
  };

  // Assign users modal
  const openUsersModal = async (window: QueeWindow) => {
    setSelectedWindow(window);

    // fetch assigned users for this window
    const res = await fetch(`/api/window/${window.id}/users`);
    if (res.ok) {
      const data: User[] = await res.json();
      setAssignedUserIds(data.map((u) => u.id));
    } else {
      setAssignedUserIds([]);
    }

    setUsersOpen(true);
  };

  const updateWindowUsers = async () => {
    if (!selectedWindow) return;

    try {
      const res = await fetch(`/api/window/${selectedWindow.id}/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userIds: assignedUserIds,
        }),
      });

      if (!res.ok) throw new Error();

      toast("Users assigned successfully.");
      setUsersOpen(false);
      setSelectedWindow(null);
      setAssignedUserIds([]);
      fetchWindow();
    } catch (err) {
      console.error(err);
      toast("Failed to update users.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavLinks />

        {/* Window Management */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              Window Management
            </h2>
            <button
              onClick={() => setOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Window</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Window
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {windows.map((window) => (
                  <tr key={window.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {window.windowTitle}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {window.windowDescription}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className=" w-0 whitespace-nowrap">
                      <button
                        onClick={() => openUsersModal(window)}
                        className="hover:text-gray-900 text-green-600 mr-3"
                      >
                        Users
                      </button>
                      {/* <Link
                                                href={`/queue/${window.id}`}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                View Queue
                                            </Link> */}
                      <button
                        onClick={() => openEditWindowModal(window)}
                        className="hover:text-gray-900 text-green-600 p-1 rounded-sm text-sm mr-3"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Window Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Window</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Window Title
              </label>
              <input
                type="text"
                name="windowTitle"
                value={form.windowTitle}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter window title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                name="windowDescription"
                value={form.windowDescription}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter window description"
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={addWindow}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add Window
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Window Dialog */}
      <Dialog open={editWindowOpen} onOpenChange={setEditWindowOpen}>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Window</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Window Title
              </label>
              <input
                type="text"
                name="windowTitle"
                value={form.windowTitle}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                name="windowDescription"
                value={form.windowDescription}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <button
              onClick={() => setEditWindowOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={updateWindow}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Update Window
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Users Dialog */}
      <Dialog open={usersOpen} onOpenChange={setUsersOpen}>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Assign Users – {selectedWindow?.windowTitle}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2 max-h-64 overflow-y-auto border rounded-md p-3">
            {users.map((user) => (
              <label
                key={user.id}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={assignedUserIds.includes(user.id)}
                  onChange={() => {
                    setAssignedUserIds((prev) =>
                      prev.includes(user.id)
                        ? prev.filter((id) => id !== user.id)
                        : [...prev, user.id]
                    );
                  }}
                />
                {user.name} ({user.email})
              </label>
            ))}
          </div>

          <DialogFooter>
            <button
              onClick={() => setUsersOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={updateWindowUsers}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Update Users
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
