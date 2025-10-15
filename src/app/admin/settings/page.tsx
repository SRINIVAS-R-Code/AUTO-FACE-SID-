
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const settingsFormSchema = z.object({
  // General
  systemName: z.string().min(1, "System name cannot be empty."),
  timeZone: z.string(),
  
  // AI & Monitoring
  enableFaceRecognition: z.boolean(),
  lowEngagementThreshold: z.number().min(0).max(100),
  inactivityTimeout: z.number().min(1).max(60),

  // Notifications
  enableEmailNotifications: z.boolean(),
  notificationEmails: z.string().email("Please enter a valid email."),
  enableSlackNotifications: z.boolean(),
  slackWebhookUrl: z.string().url("Please enter a valid Slack webhook URL.").optional().or(z.literal('')),

  // Security & Privacy
  dataRetentionPeriod: z.enum(["30d", "90d", "180d", "365d"]),
  twoFactorAuth: z.boolean(),
})

type SettingsFormValues = z.infer<typeof settingsFormSchema>

export default function SettingsPage() {
  const { toast } = useToast()

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      systemName: "MonitorAI",
      timeZone: "America/New_York",
      enableFaceRecognition: true,
      lowEngagementThreshold: 30,
      inactivityTimeout: 15,
      enableEmailNotifications: true,
      notificationEmails: "alerts@monitorai.com",
      enableSlackNotifications: false,
      slackWebhookUrl: "",
      dataRetentionPeriod: "90d",
      twoFactorAuth: true,
    },
  })

  function onSubmit(data: SettingsFormValues) {
    console.log(data)
    toast({
      title: "Settings Saved",
      description: "Your new system settings have been successfully applied.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Advanced System Settings</h1>
        <p className="text-muted-foreground">Customize and configure the core functionalities of the application.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="ai">AI & Monitoring</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Basic system configuration and personalization.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   <FormField
                    control={form.control}
                    name="systemName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>System Name</FormLabel>
                        <FormControl>
                          <Input placeholder="MonitorAI" {...field} />
                        </FormControl>
                        <FormDescription>The name displayed throughout the application.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="timeZone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Zone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a time zone" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                            </SelectContent>
                        </Select>
                         <FormDescription>Set the default time zone for reporting.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai">
              <Card>
                <CardHeader>
                  <CardTitle>AI & Monitoring</CardTitle>
                  <CardDescription>Configure the behavior of the AI-powered monitoring features.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="enableFaceRecognition"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Enable Face Recognition</FormLabel>
                          <FormDescription>
                            Turn on face recognition for automatic check-ins.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lowEngagementThreshold"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Low Engagement Threshold: {field.value}%</FormLabel>
                        <FormControl>
                          <Slider
                            min={0} max={100} step={5}
                            value={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormControl>
                        <FormDescription>Set the activity level below which an employee is flagged for low engagement.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="inactivityTimeout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inactivity Timeout (minutes)</FormLabel>
                         <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a timeout duration" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="5">5 minutes</SelectItem>
                                <SelectItem value="10">10 minutes</SelectItem>
                                <SelectItem value="15">15 minutes</SelectItem>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="60">60 minutes</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormDescription>Time after which an idle employee is marked as "Away".</FormDescription>
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
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage how and when you receive system alerts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <FormField
                        control={form.control}
                        name="enableEmailNotifications"
                        render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                            <FormLabel>Enable Email Notifications</FormLabel>
                            <FormDescription>
                                Receive alerts via email for important events.
                            </FormDescription>
                            </div>
                            <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="notificationEmails"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notification Email Address</FormLabel>
                            <FormControl>
                            <Input placeholder="alerts@yourcompany.com" {...field} />
                            </FormControl>
                            <FormDescription>The email address that receives system alerts.</FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="enableSlackNotifications"
                        render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                            <FormLabel>Enable Slack Notifications</FormLabel>
                            <FormDescription>
                                Send alerts directly to a Slack channel.
                            </FormDescription>
                            </div>
                            <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                     {form.watch("enableSlackNotifications") && (
                        <FormField
                            control={form.control}
                            name="slackWebhookUrl"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Slack Webhook URL</FormLabel>
                                <FormControl>
                                <Input placeholder="https://hooks.slack.com/services/..." {...field} />
                                </FormControl>
                                <FormDescription>The incoming webhook URL for your Slack channel.</FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                     )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security & Privacy</CardTitle>
                  <CardDescription>Manage data retention and user access policies.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <FormField
                        control={form.control}
                        name="dataRetentionPeriod"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Data Retention Period</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a retention period" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="30d">30 Days</SelectItem>
                                    <SelectItem value="90d">90 Days</SelectItem>
                                    <SelectItem value="180d">180 Days</SelectItem>
                                    <SelectItem value="365d">365 Days</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>How long to store monitoring data and logs.</FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="twoFactorAuth"
                        render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                            <FormLabel>Require Two-Factor Authentication</FormLabel>
                            <FormDescription>
                                Enforce 2FA for all administrator accounts.
                            </FormDescription>
                            </div>
                            <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
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
