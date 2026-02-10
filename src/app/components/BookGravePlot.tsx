import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, MapPin, User, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface BookGravePlotProps {
  onBack: () => void;
}

export function BookGravePlot({ onBack }: BookGravePlotProps) {
  const [formData, setFormData] = useState({
    deceasedName: "",
    deceasedAge: "",
    dateOfDeath: undefined as Date | undefined,
    dateOfBurial: undefined as Date | undefined,
    section: "",
    plotNumber: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    relationship: "",
    additionalNotes: ""
  });

  const sections = ["Section A", "Section B", "Section C", "Section D", "Section E"];
  const availablePlots = ["A-101", "A-102", "B-201", "B-202", "C-301", "C-302", "D-401", "E-501"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.deceasedName || !formData.section || !formData.plotNumber || !formData.contactName) {
      toast.error("Please fill in all required fields");
      return;
    }


    toast.success("Booking confirmation: Grave status updated to booked.");

    // Reset form
    setFormData({
      deceasedName: "",
      deceasedAge: "",
      dateOfDeath: undefined,
      dateOfBurial: undefined,
      section: "",
      plotNumber: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      relationship: "",
      additionalNotes: ""
    });
  };

  return (
    <div className="min-h-screen bg-slate-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-slate-100">Book Grave Plot</h1>
            <p className="text-slate-300 text-sm mt-1">Reserve a grave plot for burial</p>
          </div>
          <Button onClick={onBack} variant="outline" className="bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600">
            Back to Dashboard
          </Button>
        </div>

        <Card className="border-slate-700 bg-slate-50">
          <CardHeader className="bg-slate-900 text-white rounded-t-lg border-b border-slate-700">
            <CardTitle className="text-slate-100">Grave Plot Reservation</CardTitle>
            <CardDescription className="text-slate-300">
              Complete the form below to book a grave plot
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Deceased Information */}
              <div className="space-y-4">
                <h3 className="text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-700" />
                  Deceased Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deceasedName" className="text-slate-700">
                      Full Name <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="deceasedName"
                      value={formData.deceasedName}
                      onChange={(e) => setFormData({ ...formData, deceasedName: e.target.value })}
                      placeholder="Enter full name"
                      className="border-slate-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deceasedAge" className="text-slate-700">Age</Label>
                    <Input
                      id="deceasedAge"
                      type="number"
                      value={formData.deceasedAge}
                      onChange={(e) => setFormData({ ...formData, deceasedAge: e.target.value })}
                      placeholder="Age"
                      className="border-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700">Date of Death</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left border-slate-300"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dateOfDeath ? format(formData.dateOfDeath, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.dateOfDeath}
                          onSelect={(date) => setFormData({ ...formData, dateOfDeath: date })}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700">Date of Burial</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left border-slate-300"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dateOfBurial ? format(formData.dateOfBurial, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.dateOfBurial}
                          onSelect={(date) => setFormData({ ...formData, dateOfBurial: date })}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/* Plot Selection */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-700" />
                  Plot Selection
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="section" className="text-slate-700">
                      Section <span className="text-red-600">*</span>
                    </Label>
                    <Select value={formData.section} onValueChange={(value) => setFormData({ ...formData, section: value })}>
                      <SelectTrigger className="border-slate-300">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        {sections.map(section => (
                          <SelectItem key={section} value={section}>{section}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plotNumber" className="text-slate-700">
                      Plot Number <span className="text-red-600">*</span>
                    </Label>
                    <Select value={formData.plotNumber} onValueChange={(value) => setFormData({ ...formData, plotNumber: value })}>
                      <SelectTrigger className="border-slate-300">
                        <SelectValue placeholder="Select plot" />
                      </SelectTrigger>
                      <SelectContent>
                        {availablePlots.map(plot => (
                          <SelectItem key={plot} value={plot}>{plot}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-slate-900 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-emerald-700" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-slate-700">
                      Contact Name <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="Your full name"
                      className="border-slate-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship" className="text-slate-700">Relationship</Label>
                    <Input
                      id="relationship"
                      value={formData.relationship}
                      onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                      placeholder="e.g., Son, Daughter, Spouse"
                      className="border-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone" className="text-slate-700">Phone Number</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="border-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="text-slate-700">Email Address</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      placeholder="email@example.com"
                      className="border-slate-300"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="additionalNotes" className="text-slate-700">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="Any special requests or additional information..."
                  className="border-slate-300 min-h-[100px]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white">
                  Book Plot
                </Button>
                <Button type="button" onClick={onBack} variant="outline" className="flex-1 border-slate-300">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
