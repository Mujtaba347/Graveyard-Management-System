import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Check, X, Clock, User, MapPin, Calendar } from "lucide-react";
import { toast } from "sonner";

interface BookingRequest {
    id: string;
    applicantName: string;
    deceasedName: string;
    plotNumber: string;
    requestDate: string;
    status: "pending" | "approved" | "rejected";
}

interface BookingRequestsProps {
    onBack: () => void;
}

export function BookingRequests({ onBack }: BookingRequestsProps) {
    const [requests, setRequests] = useState<BookingRequest[]>([
        {
            id: "1",
            applicantName: "John Doe",
            deceasedName: "Jane Doe",
            plotNumber: "A-102",
            requestDate: "2024-12-24",
            status: "pending"
        },
        {
            id: "2",
            applicantName: "Sarah Smith",
            deceasedName: "Robert Smith",
            plotNumber: "B-205",
            requestDate: "2024-12-23",
            status: "pending"
        },
        {
            id: "3",
            applicantName: "Ali Khan",
            deceasedName: "Fatima Khan",
            plotNumber: "C-301",
            requestDate: "2024-12-22",
            status: "approved"
        }
    ]);

    const handleAction = (id: string, action: "approve" | "reject") => {
        setRequests(requests.map(req => {
            if (req.id === id) {
                return { ...req, status: action === "approve" ? "approved" : "rejected" };
            }
            return req;
        }));

        if (action === "approve") {
            toast.success("Booking request approved successfully");
        } else {
            toast.info("Booking request rejected");
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-slate-100 text-2xl font-bold">Booking Requests</h1>
                        <p className="text-slate-400 mt-1">Review and manage grave plot booking applications</p>
                    </div>
                    <Button onClick={onBack} variant="outline" className="bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700">
                        Back to Dashboard
                    </Button>
                </div>

                <div className="grid gap-4">
                    {requests.map((request) => (
                        <Card key={request.id} className="border-slate-800 bg-slate-900">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold text-slate-100">{request.deceasedName}</h3>
                                            <Badge variant={request.status === "pending" ? "secondary" : request.status === "approved" ? "default" : "destructive"}
                                                className={
                                                    request.status === "pending" ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" :
                                                        request.status === "approved" ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" :
                                                            "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                                }>
                                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                            </Badge>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                                            <div className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                Applicant: {request.applicantName}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                Plot: {request.plotNumber}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                Date: {request.requestDate}
                                            </div>
                                        </div>
                                    </div>

                                    {request.status === "pending" && (
                                        <div className="flex gap-2 w-full md:w-auto">
                                            <Button
                                                onClick={() => handleAction(request.id, "approve")}
                                                className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white"
                                            >
                                                <Check className="w-4 h-4 mr-2" />
                                                Approve
                                            </Button>
                                            <Button
                                                onClick={() => handleAction(request.id, "reject")}
                                                variant="destructive"
                                                className="flex-1 md:flex-none bg-red-600 hover:bg-red-700"
                                            >
                                                <X className="w-4 h-4 mr-2" />
                                                Reject
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
