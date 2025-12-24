import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";

interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
}

export function ForgotPasswordPage({ onBackToLogin }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Simulate password reset request
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
    toast.success("Password reset link sent to your email!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800 px-4">
      <Card className="w-full max-w-md shadow-2xl border-slate-700">
        <CardHeader className="space-y-1 bg-slate-900 text-white rounded-t-lg border-b border-slate-700">
          <CardTitle className="text-center text-slate-100">Reset Password</CardTitle>
          <CardDescription className="text-center text-slate-300">
            Enter your email to receive a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-slate-50 pt-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@graveyard.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-slate-300"
                />
              </div>
              {error && (
                <div className="text-red-700 text-sm bg-red-50 p-3 rounded-md border border-red-200">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
                Send Reset Link
              </Button>
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="text-sm text-slate-600 hover:text-emerald-700 hover:underline"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-emerald-700 bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                <p className="font-medium">Check your email</p>
                <p className="text-sm mt-1">We've sent a password reset link to {email}</p>
              </div>
              <Button 
                onClick={onBackToLogin} 
                className="w-full bg-slate-700 hover:bg-slate-800 text-white"
              >
                Back to Sign In
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
