import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface GraveRecord {
    id: string;
    plotNumber: string;
    section: string;
    status: "available" | "occupied" | "reserved";
    deceasedName?: string;
    dateOfBurial?: string;
}

interface GraveRecordManagementProps {
    onBack: () => void;
}

export function GraveRecordManagement({ onBack }: GraveRecordManagementProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [records, setRecords] = useState<GraveRecord[]>([
        { id: "1", plotNumber: "A-101", section: "Section A", status: "occupied", deceasedName: "Ahmed Abdullah", dateOfBurial: "2024-11-21" },
        { id: "2", plotNumber: "A-102", section: "Section A", status: "available" },
        { id: "3", plotNumber: "B-201", section: "Section B", status: "reserved", deceasedName: "Reserved for Family" },
        { id: "4", plotNumber: "C-305", section: "Section C", status: "occupied", deceasedName: "Fatima Zahra", dateOfBurial: "2024-12-11" },
    ]);

    const handleDelete = (id: string) => {
        setRecords(records.filter(r => r.id !== id));
        toast.success("Record deleted successfully");
    };

    const filteredRecords = records.filter(record =>
        record.plotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.deceasedName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-900 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-slate-100 text-2xl font-bold">Manage Grave Records</h1>
                        <p className="text-slate-400 mt-1">Create, update, and delete grave records</p>
                    </div>
                    <Button onClick={onBack} variant="outline" className="bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700">
                        Back to Dashboard
                    </Button>
                </div>

                <Card className="border-slate-800 bg-slate-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div className="flex items-center space-x-2 w-full max-w-sm">
                            <Search className="w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Search records..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-500"
                            />
                        </div>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Record
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border border-slate-800">
                            <Table>
                                <TableHeader className="bg-slate-950">
                                    <TableRow className="border-slate-800 hover:bg-slate-900">
                                        <TableHead className="text-slate-400">Plot Number</TableHead>
                                        <TableHead className="text-slate-400">Section</TableHead>
                                        <TableHead className="text-slate-400">Status</TableHead>
                                        <TableHead className="text-slate-400">Deceased Name</TableHead>
                                        <TableHead className="text-slate-400">Date of Burial</TableHead>
                                        <TableHead className="text-right text-slate-400">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredRecords.map((record) => (
                                        <TableRow key={record.id} className="border-slate-800 hover:bg-slate-800/50">
                                            <TableCell className="font-medium text-slate-200">{record.plotNumber}</TableCell>
                                            <TableCell className="text-slate-300">{record.section}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={
                                                    record.status === "available" ? "border-emerald-500 text-emerald-500" :
                                                        record.status === "occupied" ? "border-slate-500 text-slate-400" :
                                                            "border-amber-500 text-amber-500"
                                                }>
                                                    {record.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-slate-300">{record.deceasedName || "-"}</TableCell>
                                            <TableCell className="text-slate-300">{record.dateOfBurial || "-"}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-emerald-500 hover:bg-emerald-950">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-950"
                                                        onClick={() => handleDelete(record.id)}
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
