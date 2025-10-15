
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { provideHealthSuggestions, ProvideHealthSuggestionsOutput } from "@/ai/flows/wellness-flow"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
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
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { HeartPulse, ShieldCheck, Dumbbell, Loader2, Wand2 } from "lucide-react"

const formSchema = z.object({
  stressLevel: z.number().min(1).max(10),
  ergonomicsSetup: z.string().min(10, { message: "Please describe your setup in a bit more detail." }),
  sleepQuality: z.enum(["good", "average", "poor"]),
  activityLevel: z.enum(["sedentary", "moderate", "active"]),
})

export function WellnessTracker() {
  const [suggestions, setSuggestions] = useState<ProvideHealthSuggestionsOutput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stressLevel: 5,
      ergonomicsSetup: "",
      sleepQuality: "average",
      activityLevel: "moderate",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setSuggestions(null)
    try {
      const result = await provideHealthSuggestions(values)
      setSuggestions(result)
      toast({
        title: "Suggestions Generated!",
        description: "Your personalized wellness tips are ready.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Could not generate suggestions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Wellness Check-in</CardTitle>
          <CardDescription>Log your daily wellness metrics to get personalized AI suggestions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="stressLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stress Level: {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={10}
                        step={1}
                        value={[field.value]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ergonomicsSetup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ergonomics Setup</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., ergonomic chair, standing desk, monitor at eye level..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sleepQuality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sleep Quality</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sleep quality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="average">Average</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activityLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select activity level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentary</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  <><Wand2 className="mr-2 h-4 w-4" /> Get AI Suggestions</>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {suggestions && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Wand2 /> AI-Powered Suggestions</CardTitle>
            <CardDescription>Here are some tips based on your check-in.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold flex items-center gap-2 mb-1"><HeartPulse className="text-primary"/> Stress Reduction</h4>
                <p className="text-sm text-muted-foreground">{suggestions.stressReductionSuggestion}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold flex items-center gap-2 mb-1"><ShieldCheck className="text-primary"/> Ergonomics Adjustment</h4>
                <p className="text-sm text-muted-foreground">{suggestions.ergonomicsAdjustmentSuggestion}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold flex items-center gap-2 mb-1"><Dumbbell className="text-primary"/> Healthy Habit</h4>
                <p className="text-sm text-muted-foreground">{suggestions.healthyHabitSuggestion}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
