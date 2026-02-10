import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { QrCode, MapPin, Calendar, Image as ImageIcon, Upload, Download, Heart } from "lucide-react";
import { toast } from "sonner";

interface GraveRecord {
  id: string;
  plotNumber: string;
  section: string;
  deceasedName: string;
  dateOfBirth: string;
  dateOfDeath: string;
  dateOfBurial: string;
  epitaph: string;
  images: string[];
}

interface FamilyPortalProps {
  onBack: () => void;
  mode?: "search" | "family";
}

export function SearchGravePage({ onBack, mode = "search" }: FamilyPortalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrave, setSelectedGrave] = useState<GraveRecord | null>(null);

  const isFamilyMode = mode === "family";
  const title = isFamilyMode ? "Family Portal" : "Search Grave";
  const description = isFamilyMode
    ? "View grave information related to your deceased relatives."
    : "Search grave information using grave number or deceased name.";


  const graveRecords: GraveRecord[] = [
    {
      id: "1",
      plotNumber: "A-101",
      section: "Section A",
      deceasedName: "Ahmed Abdullah",
      dateOfBirth: "March 15, 1965",
      dateOfDeath: "November 20, 2024",
      dateOfBurial: "November 21, 2024",
      epitaph: "Inna lillahi wa inna ilayhi raji'un. A devoted father and servant of Allah.",
      images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"]
    },
    {
      id: "2",
      plotNumber: "B-202",
      section: "Section B",
      deceasedName: "Fatima Zahra",
      dateOfBirth: "July 8, 1970",
      dateOfDeath: "December 10, 2024",
      dateOfBurial: "December 11, 2024",
      epitaph: "May Allah grant her Jannah. A loving mother and devoted believer.",
      images: ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop"]
    },
    {
      id: "3",
      plotNumber: "C-303",
      section: "Section C",
      deceasedName: "Ali Hassan",
      dateOfBirth: "January 22, 1958",
      dateOfDeath: "October 5, 2024",
      dateOfBurial: "October 6, 2024",
      epitaph: "May his soul rest in eternal peace. Respected elder and community leader.",
      images: ["https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop"]
    }
  ];

  const handleSearch = () => {
    const found = graveRecords.find(
      record =>
        record.deceasedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.plotNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (found) {
      setSelectedGrave(found);
      toast.success("Record found");
    } else {
      setSelectedGrave(null);
      toast.error("No record found");
    }
  };

  const handleGenerateQR = () => {
    toast.success("QR Code generated and ready for download");
  };

  const handleUploadImage = () => {
    toast.success("Image uploaded successfully");
  };

  return (
    <div className="min-h-screen bg-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-slate-100">{title}</h1>
            <p className="text-slate-300 text-sm mt-1">{description}</p>
          </div>
          <Button onClick={onBack} variant="outline" className="bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600">
            Back to Dashboard
          </Button>
        </div>

        {/* Search Section */}
        <Card className="border-slate-700 bg-slate-50 mb-6">
          <CardHeader className="bg-slate-900 text-white rounded-t-lg border-b border-slate-700">
            <CardTitle className="text-slate-100">{title}</CardTitle>
            <CardDescription className="text-slate-300">
              {isFamilyMode ? "Enter your relative's name or plot number" : "Enter grave number or deceased name"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Input
                placeholder="Enter name or plot number (e.g., John Smith or A-101)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 border-slate-300"
              />
              <Button
                onClick={handleSearch}
                className="bg-emerald-700 hover:bg-emerald-800 text-white"
              >
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {selectedGrave ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-slate-700 bg-slate-50">
                <CardHeader className="bg-slate-900 text-white rounded-t-lg border-b border-slate-700">
                  <CardTitle className="text-slate-100">Memorial Information</CardTitle>
                  <CardDescription className="text-slate-300">
                    Details for {selectedGrave.deceasedName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Tabs defaultValue="details">
                    <TabsList className="mb-4">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="gallery">Gallery</TabsTrigger>
                      <TabsTrigger value="location">Location</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-600">Full Name</p>
                          <p className="text-slate-900 mt-1">{selectedGrave.deceasedName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Plot Number</p>
                          <p className="text-slate-900 mt-1">{selectedGrave.plotNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Date of Birth</p>
                          <p className="text-slate-900 mt-1">{selectedGrave.dateOfBirth}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Date of Death</p>
                          <p className="text-slate-900 mt-1">{selectedGrave.dateOfDeath}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Date of Burial</p>
                          <p className="text-slate-900 mt-1">{selectedGrave.dateOfBurial}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Section</p>
                          <p className="text-slate-900 mt-1">{selectedGrave.section}</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-slate-200">
                        <p className="text-sm text-slate-600 mb-2">Epitaph</p>
                        <div className="bg-slate-100 p-4 rounded-lg border-l-4 border-emerald-700">
                          <p className="text-slate-900 italic flex items-start gap-2">
                            <Heart className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                            {selectedGrave.epitaph}
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="gallery">
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          {selectedGrave.images.map((image, index) => (
                            <div key={index} className="aspect-square rounded-lg overflow-hidden border-2 border-slate-200">
                              <img
                                src={image}
                                alt={`Memorial ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          <button
                            onClick={handleUploadImage}
                            className="aspect-square rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 hover:border-emerald-700 hover:bg-emerald-50 transition-colors"
                          >
                            <Upload className="w-8 h-8 text-slate-400" />
                            <span className="text-xs text-slate-600">Upload Photo</span>
                          </button>
                        </div>
                        <p className="text-sm text-slate-600">
                          Add photos and memories to honor your loved one
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="location">
                      <div className="space-y-4">
                        <div className="bg-slate-100 p-6 rounded-lg text-center">
                          <MapPin className="w-16 h-16 mx-auto mb-4 text-emerald-700" />
                          <h3 className="text-slate-900 mb-2">Plot Location</h3>
                          <p className="text-slate-700 mb-1">{selectedGrave.section}</p>
                          <Badge className="bg-emerald-700 text-white">
                            {selectedGrave.plotNumber}
                          </Badge>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-900 mb-2">
                            <strong>Directions:</strong>
                          </p>
                          <p className="text-sm text-blue-800">
                            Located in {selectedGrave.section}, row {selectedGrave.plotNumber.split('-')[1].charAt(0)},
                            on the west side of the main pathway.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* QR Code Card */}
              <Card className="border-slate-700 bg-slate-50">
                <CardHeader className="bg-slate-900 text-white rounded-t-lg border-b border-slate-700">
                  <CardTitle className="text-slate-100 text-sm">QR Code</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-white p-4 rounded-lg border-2 border-slate-200 mb-4">
                    <div className="aspect-square bg-slate-100 rounded flex items-center justify-center">
                      <QrCode className="w-32 h-32 text-slate-400" />
                    </div>
                  </div>
                  <Button
                    onClick={handleGenerateQR}
                    variant="outline"
                    className="w-full border-slate-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download QR Code
                  </Button>
                  <p className="text-xs text-slate-600 mt-2 text-center">
                    Scan to access memorial page
                  </p>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-slate-700 bg-slate-50">
                <CardHeader className="bg-slate-900 text-white rounded-t-lg border-b border-slate-700">
                  <CardTitle className="text-slate-100 text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Visit
                  </Button>
                  <Button variant="outline" className="w-full border-slate-300 justify-start">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    View All Photos
                  </Button>
                  <Button variant="outline" className="w-full border-slate-300 justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>

              {/* Memorial Stats */}
              <Card className="border-slate-700 bg-slate-50">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-slate-600">Memorial Views</p>
                    <p className="text-slate-900 mt-1">1,247</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                    <p className="text-sm text-slate-600">Photos</p>
                    <p className="text-slate-900 mt-1">{selectedGrave.images.length}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="border-slate-700 bg-slate-50">
            <CardContent className="p-12">
              <div className="text-center text-slate-500">
                <Heart className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                <h3 className="text-slate-700 mb-2">Search for a Memorial</h3>
                <p className="text-sm">
                  Enter a name or plot number above to access memorial information
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}