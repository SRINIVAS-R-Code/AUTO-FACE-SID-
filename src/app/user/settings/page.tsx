
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRef } from "react"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Camera, Image as ImageIcon, Sparkles } from "lucide-react"

const settingsFormSchema = z.object({
  // Profile
  fullName: z.string().min(1, "Name cannot be empty."),
  email: z.string().email(),
  
  // Notifications
  performanceSummaryEmails: z.boolean(),
  wellnessSuggestionEmails: z.boolean(),
  loginAlerts: z.boolean(),
})

type SettingsFormValues = z.infer<typeof settingsFormSchema>

export default function UserSettingsPage() {
  const { toast } = useToast()
  const { username, setUsername, avatarUrl, setAvatarUrl, email } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      fullName: username || "",
      email: email || "",
      performanceSummaryEmails: true,
      wellnessSuggestionEmails: true,
      loginAlerts: false,
    },
  })
  
  // Sync form with auth context changes
  form.watch(({ fullName }) => {
    if (fullName !== username) {
        form.setValue('fullName', username || '');
    }
  });


  function onSubmit(data: SettingsFormValues) {
    if (setUsername) {
      setUsername(data.fullName)
    }
    toast({
      title: "Settings Saved",
      description: "Your new settings have been successfully applied.",
    })
    console.log(data)
  }
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && setAvatarUrl) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setAvatarUrl(result);
          toast({
            title: "Profile Photo Updated",
            description: "Your new photo has been uploaded.",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRandomPhoto = () => {
    if (setAvatarUrl) {
      const newAvatarUrl = `https://picsum.photos/seed/${Date.now()}/100/100`;
      setAvatarUrl(newAvatarUrl);
      toast({
        title: "Profile Photo Updated",
        description: "A new random photo has been generated.",
      });
    }
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">My Settings</h1>
        <p className="text-muted-foreground">Manage your personal account and notification preferences.</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>My Profile</CardTitle>
                  <CardDescription>Update your personal information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   <FormItem className="flex items-center gap-6">
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="relative cursor-pointer">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src={avatarUrl || ''} alt={username || 'User'} data-ai-hint="person face" />
                                        <AvatarFallback>{username?.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity rounded-full">
                                        <Camera className="h-6 w-6" />
                                    </div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onSelect={handleUploadClick}>
                                    <ImageIcon className="mr-2 h-4 w-4" />
                                    <span>Upload Photo</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={handleRandomPhoto}>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    <span>Generate Random</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <input 
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileSelect}
                         />
                        <div>
                            <FormLabel>Profile Photo</FormLabel>
                            <FormDescription>Click the avatar to change your profile photo.</FormDescription>
                        </div>
                    </FormItem>
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@company.com" {...field} readOnly />
                        </FormControl>
                         <FormDescription>Your email address cannot be changed.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Change Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter a new password" {...field} />
                        </FormControl>
                         <FormDescription>Leave blank to keep your current password.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
               <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications from the system.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="performanceSummaryEmails"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Performance Summaries</FormLabel>
                          <FormDescription>Receive weekly performance summary emails.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="wellnessSuggestionEmails"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Wellness Suggestions</FormLabel>
                          <FormDescription>Receive email notifications for new wellness tips.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="loginAlerts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Login Alerts</FormLabel>
                          <FormDescription>Get an email alert for logins from new devices.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
