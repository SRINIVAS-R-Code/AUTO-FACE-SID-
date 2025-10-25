
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrainCircuit, Sparkles, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [backendMessage, setBackendMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Registration form states
  const [regFullName, setRegFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRole, setRegRole] = useState("user");

  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    // Only fetch if in browser
    if (typeof window !== 'undefined') {
      fetch('http://localhost:5000/api/data')
        .then(response => response.json())
        .then(data => setBackendMessage(data.message))
        .catch(error => {
          console.error('Error fetching from backend:', error);
          setBackendMessage('Backend not connected');
        });
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername === "admin" && trimmedPassword === "admin") {
      login("admin", "Admin", rememberMe);
    } else if (trimmedPassword === "user") {
      // Any username can be used for the user role
      login("user", trimmedUsername || "User", rememberMe);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid credentials",
        description: "Please check your username and password.",
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: regFullName,
          email: regEmail,
          password: regPassword,
          role: regRole
        })
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Registration Successful!",
          description: `Account created for ${data.email}. You can now login.`,
        });
        // Clear form
        setRegFullName("");
        setRegEmail("");
        setRegPassword("");
        setRegRole("user");
      } else {
        const error = await response.json();
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: error.error || "Unable to create account.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not connect to server. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary to-accent p-4">
      <div className="text-center mb-8 text-white">
        <div className="inline-block p-4 bg-white/20 rounded-2xl mb-4">
          <BrainCircuit size={40} className="text-white" />
        </div>
        <h1 className="text-5xl font-bold">AUTO FACE SID</h1>
        <p className="flex items-center justify-center gap-2 mt-2 text-lg">
          <Sparkles size={16} />
          Face Recognition and System Interaction Detection
        </p>
        {isMounted && backendMessage && (
          <p className="mt-4 text-sm bg-white/20 px-4 py-2 rounded-lg">
            Backend Status: {backendMessage}
          </p>
        )}
      </div>

      <Tabs defaultValue="signin" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2 bg-white/20">
          <TabsTrigger value="signin" className="text-white/80 data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent">Sign In</TabsTrigger>
          <TabsTrigger value="signup" className="text-white/80 data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card className="bg-background/80 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-3xl">Sign In</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-1 right-1 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember-me" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} />
                    <Label htmlFor="remember-me" className="text-sm font-normal">Remember me</Label>
                  </div>
                  <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                </div>
                <Button type="submit" className="w-full text-lg py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                  Sign In
                </Button>
                <CardDescription className="text-center text-sm pt-4 !font-extrabold text-muted-foreground/90">
                  Admin: `admin`/`admin` | User: any username /`user`
                </CardDescription>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card className="bg-background/80 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-3xl">Register</CardTitle>
              <CardDescription>This is for demonstration purposes only.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    id="fullname"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="new-password">Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Register As</Label>
                  <select
                    id="role"
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                  >
                    <option value="user">Employee / User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <Button type="submit" className="w-full text-lg py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                  Sign Up
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
