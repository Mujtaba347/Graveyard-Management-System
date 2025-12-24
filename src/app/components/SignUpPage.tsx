import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { UserPlus, Mail, Lock, User, Phone, Shield, CreditCard, MapPin } from "lucide-react";
import { toast } from "sonner";

interface SignUpPageProps {
  onSignUp: (name: string, email: string, password: string, phone: string, cnic: string, city: string) => void;
  onSwitchToLogin: () => void;
}

export function SignUpPage({ onSignUp, onSwitchToLogin }: SignUpPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cnic: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
    verificationCode: ""
  });
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const cities = [
    "Lahore",
    "Karachi",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Gujranwala"
  ];

  const handleSendVerification = () => {
    if (!formData.phone) {
      toast.error("Please enter your phone number");
      return;
    }

    if (formData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    // Simulate sending verification code
    setIsVerificationSent(true);
    toast.success("Verification code sent to your phone number");
  };

  const handleVerifyCode = () => {
    if (!formData.verificationCode) {
      toast.error("Please enter the verification code");
      return;
    }

    // Simulate verification (in real app, this would verify with backend)
    if (formData.verificationCode === "123456" || formData.verificationCode.length >= 4) {
      setIsVerified(true);
      toast.success("Phone number verified successfully!");
    } else {
      toast.error("Invalid verification code");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.cnic || !formData.phone || !formData.city || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Strict email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Check for common typos
    const lowerEmail = formData.email.toLowerCase();
    if (lowerEmail.endsWith("@gmail.co") || lowerEmail.endsWith("@yahoo.co") || lowerEmail.endsWith("@hotmail.co")) {
      toast.error("Please enter a correct email address. Example: muj347@gmail.com");
      return;
    }

    if (!isVerified) {
      toast.error("Please verify your phone number first");
      return;
    }

    // CNIC Validation (13 digits)
    const cnicRegex = /^\d{13}$/;
    if (!cnicRegex.test(formData.cnic.replace(/[^0-9]/g, ''))) {
      toast.error("CNIC must be 13 digits");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    onSignUp(formData.name, formData.email, formData.password, formData.phone, formData.cnic, formData.city);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800 p-4">
      <Card className="w-full max-w-md border-slate-700 bg-slate-50 my-8">
        <CardHeader className="space-y-1 bg-slate-900 text-white rounded-t-lg">
          <div className="flex items-center gap-2 mb-2">
            <UserPlus className="w-6 h-6 text-emerald-500" />
            <CardTitle className="text-slate-100">Create Account</CardTitle>
          </div>
          <CardDescription className="text-slate-300">
            Enter your information to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-700">
                Full Name <span className="text-red-600">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Ahmed Ali"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 border-slate-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email Address <span className="text-red-600">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ahmed@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 border-slate-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnic" className="text-slate-700">
                CNIC Number <span className="text-red-600">*</span>
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  id="cnic"
                  type="text"
                  placeholder="12345-1234567-1"
                  value={formData.cnic}
                  onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                  className="pl-10 border-slate-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-700">
                Phone Number <span className="text-red-600">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+92 300 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10 border-slate-300"
                  required
                  disabled={isVerified}
                />
              </div>
              {!isVerified && (
                <Button
                  type="button"
                  onClick={handleSendVerification}
                  variant="outline"
                  className="w-full mt-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  disabled={isVerificationSent && !isVerified}
                >
                  {isVerificationSent ? "Verification Code Sent" : "Send Verification Code"}
                </Button>
              )}
            </div>

            {isVerificationSent && !isVerified && (
              <div className="space-y-2">
                <Label htmlFor="verificationCode" className="text-slate-700">
                  Verification Code <span className="text-red-600">*</span>
                </Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="verificationCode"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={formData.verificationCode}
                      onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
                      className="pl-10 border-slate-300"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleVerifyCode}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white"
                  >
                    Verify
                  </Button>
                </div>
                <p className="text-xs text-slate-600">
                  Enter the verification code sent to your phone number
                </p>
              </div>
            )}

            {isVerified && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-700" />
                <p className="text-sm text-emerald-700">Phone number verified successfully!</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="city" className="text-slate-700">
                City <span className="text-red-600">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
                <Select
                  value={formData.city}
                  onValueChange={(value) => setFormData({ ...formData, city: value })}
                >
                  <SelectTrigger className="pl-10 border-slate-300">
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">
                Password <span className="text-red-600">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 border-slate-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-700">
                Confirm Password <span className="text-red-600">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10 border-slate-300"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white"
            >
              Create Account
            </Button>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}