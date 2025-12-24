import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Search, MapPin, CheckCircle2, XCircle, Clock } from "lucide-react";

interface Plot {
  id: string;
  plotNumber: string;
  status: "available" | "occupied" | "reserved";
  deceasedName?: string;
  section: string;
}

interface GraveyardMapProps {
  onBack: () => void;
}

export function GraveyardMap({ onBack }: GraveyardMapProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);

  // Mock data for graveyard plots
  const sections = ["Section A", "Section B", "Section C", "Section D", "Section E"];

  const plots: Plot[] = [
    // Section A
    { id: "1", plotNumber: "A-101", status: "occupied", deceasedName: "Ahmed Abdullah", section: "Section A" },
    { id: "2", plotNumber: "A-102", status: "available", section: "Section A" },
    { id: "3", plotNumber: "A-103", status: "reserved", section: "Section A" },
    { id: "4", plotNumber: "A-104", status: "available", section: "Section A" },
    { id: "5", plotNumber: "A-105", status: "occupied", deceasedName: "Fatima Zahra", section: "Section A" },
    { id: "6", plotNumber: "A-106", status: "available", section: "Section A" },
    { id: "7", plotNumber: "A-107", status: "available", section: "Section A" },
    { id: "8", plotNumber: "A-108", status: "reserved", section: "Section A" },

    // Section B
    { id: "9", plotNumber: "B-201", status: "available", section: "Section B" },
    { id: "10", plotNumber: "B-202", status: "occupied", deceasedName: "Ali Hassan", section: "Section B" },
    { id: "11", plotNumber: "B-203", status: "available", section: "Section B" },
    { id: "12", plotNumber: "B-204", status: "available", section: "Section B" },
    { id: "13", plotNumber: "B-205", status: "reserved", section: "Section B" },
    { id: "14", plotNumber: "B-206", status: "occupied", deceasedName: "Khadija Bibi", section: "Section B" },
    { id: "15", plotNumber: "B-207", status: "available", section: "Section B" },
    { id: "16", plotNumber: "B-208", status: "available", section: "Section B" },

    // Section C
    { id: "17", plotNumber: "C-301", status: "available", section: "Section C" },
    { id: "18", plotNumber: "C-302", status: "available", section: "Section C" },
    { id: "19", plotNumber: "C-303", status: "occupied", deceasedName: "Mujtaba Hussain", section: "Section C" },
    { id: "20", plotNumber: "C-304", status: "available", section: "Section C" },
    { id: "21", plotNumber: "C-305", status: "available", section: "Section C" },
    { id: "22", plotNumber: "C-306", status: "reserved", section: "Section C" },
    { id: "23", plotNumber: "C-307", status: "available", section: "Section C" },
    { id: "24", plotNumber: "C-308", status: "available", section: "Section C" },

    // Section D
    { id: "25", plotNumber: "D-401", status: "available", section: "Section D" },
    { id: "26", plotNumber: "D-402", status: "available", section: "Section D" },
    { id: "27", plotNumber: "D-403", status: "available", section: "Section D" },
    { id: "28", plotNumber: "D-404", status: "occupied", deceasedName: "Haris Khan", section: "Section D" },
    { id: "29", plotNumber: "D-405", status: "available", section: "Section D" },
    { id: "30", plotNumber: "D-406", status: "available", section: "Section D" },
    { id: "31", plotNumber: "D-407", status: "reserved", section: "Section D" },
    { id: "32", plotNumber: "D-408", status: "available", section: "Section D" },

    // Section E
    { id: "33", plotNumber: "E-501", status: "available", section: "Section E" },
    { id: "34", plotNumber: "E-502", status: "available", section: "Section E" },
    { id: "35", plotNumber: "E-503", status: "available", section: "Section E" },
    { id: "36", plotNumber: "E-504", status: "available", section: "Section E" },
    { id: "37", plotNumber: "E-505", status: "occupied", deceasedName: "Aliyan Raza", section: "Section E" },
    { id: "38", plotNumber: "E-506", status: "available", section: "Section E" },
    { id: "39", plotNumber: "E-507", status: "available", section: "Section E" },
    { id: "40", plotNumber: "E-508", status: "available", section: "Section E" },
  ];

  const filteredPlots = plots.filter(plot => {
    const matchesSearch = plot.plotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plot.deceasedName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = selectedSection === "all" || plot.section === selectedSection;
    return matchesSearch && matchesSection;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-emerald-600 hover:bg-emerald-700";
      case "occupied":
        return "bg-slate-600 hover:bg-slate-700";
      case "reserved":
        return "bg-amber-600 hover:bg-amber-700";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle2 className="w-3 h-3" />;
      case "occupied":
        return <XCircle className="w-3 h-3" />;
      case "reserved":
        return <Clock className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const stats = {
    total: plots.length,
    available: plots.filter(p => p.status === "available").length,
    occupied: plots.filter(p => p.status === "occupied").length,
    reserved: plots.filter(p => p.status === "reserved").length
  };

  return (
    <div className="min-h-screen bg-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-slate-100">View Graveyard Map</h1>
            <p className="text-slate-300 text-sm mt-1">Interactive map showing all grave plot locations and availability</p>
          </div>
          <Button onClick={onBack} variant="outline" className="bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600">
            Back to Dashboard
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-slate-700 bg-slate-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Plots</p>
                  <p className="text-slate-900 mt-1">{stats.total}</p>
                </div>
                <MapPin className="w-8 h-8 text-slate-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-slate-700 bg-slate-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Available</p>
                  <p className="text-emerald-700 mt-1">{stats.available}</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-slate-700 bg-slate-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Occupied</p>
                  <p className="text-slate-900 mt-1">{stats.occupied}</p>
                </div>
                <XCircle className="w-8 h-8 text-slate-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-slate-700 bg-slate-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Reserved</p>
                  <p className="text-amber-700 mt-1">{stats.reserved}</p>
                </div>
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map View */}
          <div className="lg:col-span-2">
            <Card className="border-slate-700 bg-slate-50">
              <CardHeader className="bg-slate-900 text-white rounded-t-lg border-b border-slate-700">
                <CardTitle className="text-slate-100">Plot Map</CardTitle>
                <CardDescription className="text-slate-300">Click on any plot to view details</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4 flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Search by plot number or name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-slate-300"
                      />
                    </div>
                  </div>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-700"
                  >
                    <option value="all">All Sections</option>
                    {sections.map(section => (
                      <option key={section} value={section}>{section}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-8 gap-2">
                  {filteredPlots.map(plot => (
                    <button
                      key={plot.id}
                      onClick={() => setSelectedPlot(plot)}
                      className={`${getStatusColor(plot.status)} text-white p-3 rounded text-xs transition-all hover:scale-105 ${selectedPlot?.id === plot.id ? "ring-2 ring-blue-400" : ""
                        }`}
                      title={`${plot.plotNumber} - ${plot.status}`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        {getStatusIcon(plot.status)}
                        <span>{plot.plotNumber.split('-')[1]}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex gap-4 justify-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-emerald-600 rounded"></div>
                    <span className="text-slate-700">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-slate-600 rounded"></div>
                    <span className="text-slate-700">Occupied</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-amber-600 rounded"></div>
                    <span className="text-slate-700">Reserved</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Panel */}
          <div>
            <Card className="border-slate-700 bg-slate-50">
              <CardHeader className="bg-slate-900 text-white rounded-t-lg border-b border-slate-700">
                <CardTitle className="text-slate-100">Plot Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {selectedPlot ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-slate-600 text-sm">Plot Number</Label>
                      <p className="text-slate-900 mt-1">{selectedPlot.plotNumber}</p>
                    </div>
                    <div>
                      <Label className="text-slate-600 text-sm">Section</Label>
                      <p className="text-slate-900 mt-1">{selectedPlot.section}</p>
                    </div>
                    <div>
                      <Label className="text-slate-600 text-sm">Status</Label>
                      <div className="mt-1">
                        <Badge className={`${selectedPlot.status === "available" ? "bg-emerald-600" :
                            selectedPlot.status === "occupied" ? "bg-slate-600" :
                              "bg-amber-600"
                          } text-white`}>
                          {selectedPlot.status.charAt(0).toUpperCase() + selectedPlot.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    {selectedPlot.deceasedName && (
                      <div>
                        <Label className="text-slate-600 text-sm">Deceased Name</Label>
                        <p className="text-slate-900 mt-1">{selectedPlot.deceasedName}</p>
                      </div>
                    )}
                    {selectedPlot.status === "available" && (
                      <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white mt-4">
                        Book This Plot
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-slate-400" />
                    <p>Select a plot to view details</p>
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

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}