import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, FileText, Download, BarChart3, PieChart } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface GenerateReportProps {
  onBack: () => void;
}

export function GenerateReport({ onBack }: GenerateReportProps) {
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [section, setSection] = useState("all");
  const [format, setFormat] = useState("pdf");

  const reportTypes = [
    { value: "occupancy", label: "Occupancy Report", icon: BarChart3 },
    { value: "bookings", label: "Booking History", icon: FileText },
    { value: "revenue", label: "Revenue Report", icon: PieChart },
    { value: "maintenance", label: "Maintenance Schedule", icon: FileText },
    { value: "custom", label: "Custom Report", icon: FileText }
  ];

  const sections = ["all", "Section A", "Section B", "Section C", "Section D", "Section E"];
  const formats = ["pdf", "excel", "csv"];

  const handleGenerateReport = () => {
    if (!reportType) {
      toast.error("Please select a report type");
      return;
    }

    // Simulate report generation
    toast.success(`Generating ${reportType} report in ${format.toUpperCase()} format...`);
    
    setTimeout(() => {
      toast.success("Report generated successfully! Download starting...");
    }, 2000);
  };

  // Mock data for preview
  const mockData = {
    occupancy: [
      { section: "Section A", total: 100, occupied: 45, available: 50, reserved: 5 },
      { section: "Section B", total: 100, occupied: 60, available: 35, reserved: 5 },
      { section: "Section C", total: 100, occupied: 30, available: 65, reserved: 5 },
      { section: "Section D", total: 100, occupied: 40, available: 55, reserved: 5 },
      { section: "Section E", total: 100, occupied: 25, available: 70, reserved: 5 }
    ],
    bookings: [
      { date: "2024-12-20", plot: "A-105", name: "Ahmed Abdullah", status: "Completed" },
      { date: "2024-12-18", plot: "B-203", name: "Ali Hassan", status: "Completed" },
      { date: "2024-12-15", plot: "C-301", name: "Mujtaba Hussain", status: "Pending" },
      { date: "2024-12-10", plot: "D-405", name: "Haris Khan", status: "Completed" }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-slate-100">Generate Reports</h1>
            <p className="text-slate-300 text-sm mt-1">Create and download various system reports</p>
          </div>
          <Button onClick={onBack} variant="outline" className="bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600">
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Configuration */}
          <div className="lg:col-span-1">
            <Card className="border-slate-700 bg-slate-50">
              <CardHeader className="bg-slate-900 text-white rounded-t-lg border-b border-slate-700">
                <CardTitle className="text-slate-100">Report Settings</CardTitle>
                <CardDescription className="text-slate-300">
                  Configure your report parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reportType" className="text-slate-700">Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger className="border-slate-300">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left border-slate-300"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left border-slate-300"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="section" className="text-slate-700">Section</Label>
                  <Select value={section} onValueChange={setSection}>
                    <SelectTrigger className="border-slate-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map(sec => (
                        <SelectItem key={sec} value={sec}>
                          {sec === "all" ? "All Sections" : sec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="format" className="text-slate-700">Export Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger className="border-slate-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formats.map(fmt => (
                        <SelectItem key={fmt} value={fmt}>
                          {fmt.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleGenerateReport} 
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Report Preview */}
          <div className="lg:col-span-2">
            <Card className="border-slate-700 bg-slate-50">
              <CardHeader className="bg-slate-900 text-white rounded-t-lg border-b border-slate-700">
                <CardTitle className="text-slate-100">Report Preview</CardTitle>
                <CardDescription className="text-slate-300">
                  {reportType ? `Preview of ${reportTypes.find(t => t.value === reportType)?.label}` : "Select a report type to see preview"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {reportType === "occupancy" && (
                  <div className="space-y-4">
                    <h3 className="text-slate-900">Graveyard Occupancy Summary</h3>
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-slate-100">
                          <tr>
                            <th className="px-4 py-2 text-left text-sm text-slate-700">Section</th>
                            <th className="px-4 py-2 text-right text-sm text-slate-700">Total</th>
                            <th className="px-4 py-2 text-right text-sm text-slate-700">Occupied</th>
                            <th className="px-4 py-2 text-right text-sm text-slate-700">Available</th>
                            <th className="px-4 py-2 text-right text-sm text-slate-700">Reserved</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockData.occupancy.map((row, index) => (
                            <tr key={index} className="border-t border-slate-200">
                              <td className="px-4 py-2 text-slate-900">{row.section}</td>
                              <td className="px-4 py-2 text-right text-slate-700">{row.total}</td>
                              <td className="px-4 py-2 text-right text-slate-700">{row.occupied}</td>
                              <td className="px-4 py-2 text-right text-emerald-700">{row.available}</td>
                              <td className="px-4 py-2 text-right text-amber-700">{row.reserved}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {reportType === "bookings" && (
                  <div className="space-y-4">
                    <h3 className="text-slate-900">Recent Bookings</h3>
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-slate-100">
                          <tr>
                            <th className="px-4 py-2 text-left text-sm text-slate-700">Date</th>
                            <th className="px-4 py-2 text-left text-sm text-slate-700">Plot</th>
                            <th className="px-4 py-2 text-left text-sm text-slate-700">Name</th>
                            <th className="px-4 py-2 text-left text-sm text-slate-700">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockData.bookings.map((booking, index) => (
                            <tr key={index} className="border-t border-slate-200">
                              <td className="px-4 py-2 text-slate-900">{booking.date}</td>
                              <td className="px-4 py-2 text-slate-700">{booking.plot}</td>
                              <td className="px-4 py-2 text-slate-700">{booking.name}</td>
                              <td className="px-4 py-2">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  booking.status === "Completed" 
                                    ? "bg-emerald-100 text-emerald-700" 
                                    : "bg-amber-100 text-amber-700"
                                }`}>
                                  {booking.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {reportType === "revenue" && (
                  <div className="space-y-4">
                    <h3 className="text-slate-900">Revenue Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="border-slate-200">
                        <CardContent className="p-4">
                          <p className="text-sm text-slate-600">Total Revenue</p>
                          <p className="text-slate-900 mt-1">$125,000</p>
                        </CardContent>
                      </Card>
                      <Card className="border-slate-200">
                        <CardContent className="p-4">
                          <p className="text-sm text-slate-600">This Month</p>
                          <p className="text-emerald-700 mt-1">$15,000</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <p className="text-sm text-slate-600">Revenue by Section</p>
                      <div className="mt-2 space-y-2">
                        {mockData.occupancy.map((section, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-slate-700">{section.section}</span>
                            <span className="text-slate-900">${(section.occupied * 2500).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {!reportType && (
                  <div className="text-center py-12 text-slate-500">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                    <p>Select a report type to see preview</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}