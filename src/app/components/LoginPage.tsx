import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Loader2 } from "lucide-react";

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onSwitchToSignUp: () => void;
  onForgotPassword: () => void;
}

export function LoginPage({ onLogin, onSwitchToSignUp, onForgotPassword }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Strict email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Check for common typos
    const lowerEmail = email.toLowerCase();
    if (lowerEmail.endsWith("@gmail.co") || lowerEmail.endsWith("@yahoo.co") || lowerEmail.endsWith("@hotmail.co")) {
      setError("Please enter a correct email address. Example: muj347@gmail.com");
      setIsLoading(false);
      return;
    }

    // Password validation (at least 8 characters)
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    // Simulate network delay
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onLogin(email, password);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800 px-4">
      <Card className="w-full max-w-md shadow-2xl border-slate-700">
        <CardHeader className="space-y-1 bg-slate-900 text-white rounded-t-lg border-b border-slate-700">
          <CardTitle className="text-center text-slate-100">Graveyard Management System</CardTitle>
          <CardDescription className="text-center text-slate-300">
            Sign in to access the management dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-slate-50 pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@graveyard.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="border-slate-300 focus:ring-emerald-700"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <button
                  type="button"
                  onClick={onForgotPassword}
                  disabled={isLoading}
                  className="text-sm text-emerald-700 hover:underline font-medium disabled:opacity-50"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password (min 8 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className="border-slate-300 focus:ring-emerald-700"
              />
            </div>
            {error && (
              <div className="text-red-700 text-sm bg-red-50 p-3 rounded-md border border-red-200 animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <div className="text-center mt-4">
              <p className="text-sm text-slate-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToSignUp}
                  disabled={isLoading}
                  className="text-emerald-700 hover:underline font-medium disabled:opacity-50"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}