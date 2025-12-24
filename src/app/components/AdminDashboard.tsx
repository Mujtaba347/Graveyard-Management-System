import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { LogOut, UserCircle, Users, Database, FileText, CheckSquare, Shield } from "lucide-react";

interface AdminDashboardProps {
    userEmail: string;
    onLogout: () => void;
    onNavigate: (page: string) => void;
}

export function AdminDashboard({ userEmail, onLogout, onNavigate }: AdminDashboardProps) {
    const adminActions = [
        {
            label: "Manage Users",
            icon: Users,
            page: "manage-users",
            description: "Add, edit, or remove system users"
        },
        {
            label: "Manage Grave Records",
            icon: Database,
            page: "manage-graves",
            description: "Update grave details and status"
        },
        {
            label: "Booking Requests",
            icon: CheckSquare,
            page: "booking-requests",
            description: "Approve or reject plot bookings"
        },
        {
            label: "Generate Reports",
            icon: FileText,
            page: "reports",
            description: "View and export system reports"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Header */}
            <header className="bg-slate-950 border-b border-slate-800 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <h1 className="text-emerald-500 font-bold text-xl flex items-center gap-2">
                                <Shield className="w-6 h-6" />
                                Admin Dashboard
                            </h1>
                            <p className="text-sm text-slate-400">System Administration</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <UserCircle className="size-5" />
                                <span>{userEmail}</span>
                            </div>
                            <Button
                                onClick={onLogout}
                                variant="outline"
                                className="flex items-center gap-2 bg-slate-900 text-slate-100 border-slate-700 hover:bg-slate-800"
                            >
                                <LogOut className="size-4" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-slate-100 text-2xl font-semibold">Admin Control Center</h2>
                    <p className="text-slate-400 mt-1">
                        Manage all aspects of the Graveyard Management System
                    </p>
                </div>

                {/* Admin Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {adminActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <Card key={index} className="border-slate-800 bg-slate-900 hover:bg-slate-800/50 transition-colors cursor-pointer group" onClick={() => onNavigate(action.page)}>
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <div className="p-3 rounded-lg bg-emerald-900/20 text-emerald-500 group-hover:bg-emerald-900/30 transition-colors">
                                        <Icon className="size-8" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-slate-100 text-lg">{action.label}</CardTitle>
                                        <CardDescription className="text-slate-400">{action.description}</CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
