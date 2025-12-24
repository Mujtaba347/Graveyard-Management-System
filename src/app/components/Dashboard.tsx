import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { LogOut, UserCircle, Users, MapPin, Database, Calendar, FileText, Bell, Heart, Settings, Search } from "lucide-react";

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export function Dashboard({ userEmail, onLogout, onNavigate }: DashboardProps) {
  const stats = [
    {
      title: "Total Plots",
      value: "500",
      icon: MapPin,
      description: "Available and occupied plots",
      color: "text-emerald-700"
    },
    {
      title: "Active Records",
      value: "287",
      icon: Database,
      description: "Current burial records",
      color: "text-blue-700"
    },
    {
      title: "Families",
      value: "423",
      icon: Users,
      description: "Registered families",
      color: "text-purple-700"
    },
    {
      title: "Notifications",
      value: "8",
      icon: Bell,
      description: "Pending notifications",
      color: "text-amber-700"
    }
  ];

  const quickActions = [
    {
      label: "Search Grave",
      icon: Search,
      page: "search-grave",
      description: "Find a grave record"
    },
    {
      label: "Book Grave Plot",
      icon: Calendar,
      page: "book-plot",
      description: "Reserve a new grave plot"
    },
    {
      label: "View Graveyard Map",
      icon: MapPin,
      page: "map",
      description: "View interactive map"
    },
    {
      label: "Family Portal",
      icon: Heart,
      page: "family-portal",
      description: "Access memorial records"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-800">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-slate-100">Graveyard Management System</h1>
              <p className="text-sm text-slate-300">Dashboard Overview</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <UserCircle className="size-5" />
                <span>{userEmail}</span>
              </div>
              <Button
                onClick={onLogout}
                variant="outline"
                className="flex items-center gap-2 bg-slate-800 text-slate-100 border-slate-600 hover:bg-slate-700"
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
          <h2 className="text-slate-100">Welcome Back</h2>
          <p className="text-slate-300 text-sm mt-1">
            Here's an overview of your graveyard management system
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-slate-700 bg-slate-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm text-slate-700">{stat.title}</CardTitle>
                  <Icon className={`size-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-slate-900">{stat.value}</div>
                  <p className="text-xs text-slate-600 mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="border-slate-700 bg-slate-50">
          <CardHeader className="bg-slate-900 text-white rounded-t-lg border-b border-slate-700">
            <CardTitle className="text-slate-100">Quick Actions</CardTitle>
            <CardDescription className="text-slate-300">Access key system features</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  onClick={() => onNavigate(action.page)}
                  variant="outline"
                  className="h-auto py-6 flex-col gap-3 border-slate-300 hover:bg-emerald-50 hover:border-emerald-700 transition-all"
                >
                  <Icon className="size-6 text-emerald-700" />
                  <div className="text-center">
                    <div className="text-slate-900">{action.label}</div>
                    <div className="text-xs text-slate-600 mt-1">{action.description}</div>
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="border-slate-700 bg-slate-50">
            <CardHeader className="bg-slate-900 text-white rounded-t-lg border-b border-slate-700">
              <CardTitle className="text-slate-100 text-sm">Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {[
                  { name: "Ahmed Abdullah", plot: "A-105", date: "Dec 20, 2024" },
                  { name: "Ali Hassan", plot: "B-203", date: "Dec 18, 2024" },
                  { name: "Mujtaba Hussain", plot: "C-301", date: "Dec 15, 2024" }
                ].map((booking, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-slate-200 last:border-0">
                    <div>
                      <p className="text-sm text-slate-900">{booking.name}</p>
                      <p className="text-xs text-slate-600">Plot: {booking.plot}</p>
                    </div>
                    <p className="text-xs text-slate-500">{booking.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-50">
            <CardHeader className="bg-slate-900 text-white rounded-t-lg border-b border-slate-700">
              <CardTitle className="text-slate-100 text-sm">System Status</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Database Status</span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Last Backup</span>
                  <span className="text-xs text-slate-600">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Storage Used</span>
                  <span className="text-xs text-slate-600">45% (2.3 GB)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}