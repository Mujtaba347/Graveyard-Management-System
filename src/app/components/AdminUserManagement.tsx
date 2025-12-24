import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { UserPlus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff" | "user";
  status: "active" | "inactive";
  createdAt: string;
}

interface AdminUserManagementProps {
  onBack: () => void;
}

export function AdminUserManagement({ onBack }: AdminUserManagementProps) {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Ahmed Ali",
      email: "ahmed@graveyard.com",
      role: "admin",
      status: "active",
      createdAt: "2024-06-15"
    },
    {
      id: "2",
      name: "Mujtaba Hassan",
      email: "mujtaba@graveyard.com",
      role: "staff",
      status: "active",
      createdAt: "2024-08-20"
    },
    {
      id: "3",
      name: "Haris Khan",
      email: "haris@graveyard.com",
      role: "user",
      status: "active",
      createdAt: "2024-10-10"
    },
    {
      id: "4",
      name: "Aliyan Raza",
      email: "aliyan@graveyard.com",
      role: "user",
      status: "active",
      createdAt: "2024-11-05"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user" as "admin" | "staff" | "user",
    password: ""
  });

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const user: User = {
      id: String(users.length + 1),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, user]);
    setIsAddDialogOpen(false);
    setNewUser({ name: "", email: "", role: "user", password: "" });
    toast.success("User added successfully");
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success("User deleted successfully");
  };

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === "active" ? "inactive" : "active" as "active" | "inactive" }
        : user
    ));
    toast.success("User status updated");
  };

  return (
    <div className="min-h-screen bg-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-slate-100">Manage User Accounts</h1>
            <p className="text-slate-300 text-sm mt-1">Add, edit, and manage system users</p>
          </div>
          <Button onClick={onBack} variant="outline" className="bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600">
            Back to Dashboard
          </Button>
        </div>

        <Card className="border-slate-700 bg-slate-50">
          <CardHeader className="bg-slate-900 text-white rounded-t-lg border-b border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-slate-100">User Management</CardTitle>
                <CardDescription className="text-slate-300">Manage all system users and their permissions</CardDescription>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-50">
                  <DialogHeader>
                    <DialogTitle className="text-slate-900">Add New User</DialogTitle>
                    <DialogDescription className="text-slate-600">
                      Create a new user account with appropriate role
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700">Full Name</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        placeholder="Enter full name"
                        className="border-slate-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        placeholder="user@example.com"
                        className="border-slate-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-slate-700">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        placeholder="Enter password"
                        className="border-slate-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-slate-700">Role</Label>
                      <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value as "admin" | "staff" | "user" })}>
                        <SelectTrigger className="border-slate-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddUser} className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
                      Create User
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-300"
                />
              </div>
            </div>
            
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-100">
                    <TableHead className="text-slate-700">Name</TableHead>
                    <TableHead className="text-slate-700">Email</TableHead>
                    <TableHead className="text-slate-700">Role</TableHead>
                    <TableHead className="text-slate-700">Status</TableHead>
                    <TableHead className="text-slate-700">Created At</TableHead>
                    <TableHead className="text-slate-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-slate-50">
                      <TableCell className="text-slate-900">{user.name}</TableCell>
                      <TableCell className="text-slate-600">{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.role === "admin" ? "bg-purple-100 text-purple-700" :
                          user.role === "staff" ? "bg-blue-100 text-blue-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className={`px-2 py-1 rounded text-xs ${
                            user.status === "active" 
                              ? "bg-emerald-100 text-emerald-700" 
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </button>
                      </TableCell>
                      <TableCell className="text-slate-600">{user.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-slate-300 text-slate-700 hover:bg-slate-100"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            className="border-red-300 text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}