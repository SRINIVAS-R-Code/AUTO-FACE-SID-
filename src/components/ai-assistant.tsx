"use client"

import { useState } from "react"
import { Bot, Mic, Send, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { assistantFlow } from "@/ai/flows/ai-assistant-flow"
import { Skeleton } from "./ui/skeleton"

type Message = {
  role: "user" | "assistant"
  content: string
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const result = await assistantFlow(input)
      const assistantMessage: Message = {
        role: "assistant",
        content: result,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error fetching AI answer:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I'm having trouble connecting. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        >
          <Bot className="h-7 w-7" />
          <span className="sr-only">Open AI Assistant</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Assistant
          </SheetTitle>
           <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                     <AvatarFallback><Bot size={20}/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-xs rounded-lg p-3 text-sm md:max-w-md",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
                 {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                     <AvatarImage src="https://picsum.photos/seed/9/100/100" alt="User" data-ai-hint="person face" />
                     <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot size={20}/></AvatarFallback>
                </Avatar>
                <div className="max-w-xs rounded-lg p-3 text-sm md:max-w-md bg-muted">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-3 h-3 rounded-full" />
                    <Skeleton className="w-3 h-3 rounded-full" />
                    <Skeleton className="w-3 h-3 rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a question or for advice..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="button" variant="ghost" size="icon" disabled={isLoading}>
              <Mic className="h-5 w-5" />
              <span className="sr-only">Use voice input</span>
            </Button>
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
