
"use client";

import { useState } from "react";
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
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername === "admin" && trimmedPassword === "admin") {
      login("admin");
    } else if (trimmedUsername === "user" && trimmedPassword === "user") {
      login("user");
    } else {
      toast({
        variant: "destructive",
        title: "Invalid credentials",
        description: "Please check your username and password.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary to-accent p-4">
      <div className="text-center mb-8 text-white">
        <div className="inline-block p-4 bg-white/20 rounded-2xl mb-4">
          <BrainCircuit size={40} className="text-white" />
        </div>
        <h1 className="text-5xl font-bold">MonitorAI</h1>
        <p className="flex items-center justify-center gap-2 mt-2 text-lg">
          <Sparkles size={16} />
          Face Recognition and System Interaction Detection
        </p>
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
                        <Checkbox id="remember-me" />
                        <Label htmlFor="remember-me" className="text-sm font-normal">Remember me</Label>
                    </div>
                    <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                </div>
                <Button type="submit" className="w-full text-lg py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                  Sign In
                </Button>
                <CardDescription className="text-center text-sm pt-4 font-semibold text-muted-foreground/90">
                  Demo: Use `admin`/`admin` for Admin Portal or `user`/`user` for User Portal.
                </CardDescription>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card className="bg-background/80 backdrop-blur-sm border-white/20">
             <CardHeader>
              <CardTitle className="text-3xl">Register</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input id="fullname" placeholder="Enter your full name" required />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="new-password">Password</Label>
                  <Input id="new-password" type="password" placeholder="Create a password" required />
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
