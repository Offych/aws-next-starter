"use client"

import * as React from "react"
import { IconMessage, IconPlus, IconSend, IconTrash, IconX } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessage {
    id: string
    content: string
    role: "user" | "assistant"
    timestamp: Date
}

interface ChatSession {
    id: string
    title: string
    messages: ChatMessage[]
    createdAt: Date
}

interface ChatSidebarProps {
    onClose?: () => void
}

export function ChatSidebar({ onClose }: ChatSidebarProps) {
    const [sessions, setSessions] = React.useState<ChatSession[]>([
        {
            id: "1",
            title: "Project Analysis",
            messages: [
                {
                    id: "1",
                    content: "Can you help me analyze the performance metrics for Q4?",
                    role: "user",
                    timestamp: new Date(Date.now() - 3600000)
                },
                {
                    id: "2",
                    content: "I'd be happy to help analyze your Q4 performance metrics. Could you share the specific data points you'd like me to focus on?",
                    role: "assistant",
                    timestamp: new Date(Date.now() - 3500000)
                }
            ],
            createdAt: new Date(Date.now() - 3600000)
        },
        {
            id: "2",
            title: "Code Review",
            messages: [
                {
                    id: "3",
                    content: "Please review this React component for best practices",
                    role: "user",
                    timestamp: new Date(Date.now() - 7200000)
                }
            ],
            createdAt: new Date(Date.now() - 7200000)
        }
    ])

    const [activeSession, setActiveSession] = React.useState<string>("1")
    const [inputValue, setInputValue] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)

    const activeSessionData = sessions.find(s => s.id === activeSession)

    const createNewSession = () => {
        const newSession: ChatSession = {
            id: Date.now().toString(),
            title: "New Chat",
            messages: [],
            createdAt: new Date()
        }
        setSessions(prev => [newSession, ...prev])
        setActiveSession(newSession.id)
    }

    const deleteSession = (sessionId: string) => {
        setSessions(prev => prev.filter(s => s.id !== sessionId))
        if (activeSession === sessionId) {
            setActiveSession(sessions[0]?.id || "")
        }
    }

    const sendMessage = async () => {
        if (!inputValue.trim() || !activeSessionData) return

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            content: inputValue,
            role: "user",
            timestamp: new Date()
        }

        // Update session with user message
        setSessions(prev => prev.map(s =>
            s.id === activeSession
                ? { ...s, messages: [...s.messages, userMessage] }
                : s
        ))

        setInputValue("")
        setIsLoading(true)

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                content: "This is a simulated AI response. In a real implementation, this would be an actual AI API call.",
                role: "assistant",
                timestamp: new Date()
            }

            setSessions(prev => prev.map(s =>
                s.id === activeSession
                    ? { ...s, messages: [...s.messages, aiMessage] }
                    : s
            ))
            setIsLoading(false)
        }, 1000)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
            {/* Header */}
            <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold">AI Assistant</h2>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={createNewSession}
                        className="h-8 w-8 p-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                        <IconPlus className="h-4 w-4" />
                    </Button>
                    {onClose && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="h-8 w-8 p-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        >
                            <IconX className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Chat Sessions List */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-2 space-y-1">
                        {sessions.map((session) => (
                            <div
                                key={session.id}
                                className={cn(
                                    "group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors",
                                    activeSession === session.id
                                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                )}
                                onClick={() => setActiveSession(session.id)}
                            >
                                <div className="flex items-center space-x-2 min-w-0 flex-1">
                                    <IconMessage className="h-4 w-4 flex-shrink-0" />
                                    <span className="text-sm truncate">{session.title}</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        deleteSession(session.id)
                                    }}
                                >
                                    <IconTrash className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            <Separator className="bg-sidebar-border" />

            {/* Chat Messages */}
            <div className="flex-1 flex flex-col min-h-0">
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                        {activeSessionData?.messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(
                                    "flex gap-3",
                                    message.role === "user" ? "justify-end" : "justify-start"
                                )}
                            >
                                {message.role === "assistant" && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/ai-avatar.jpg" />
                                        <AvatarFallback>AI</AvatarFallback>
                                    </Avatar>
                                )}
                                <div
                                    className={cn(
                                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                                        message.role === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-sidebar-accent text-sidebar-accent-foreground"
                                    )}
                                >
                                    {message.content}
                                </div>
                                {message.role === "user" && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/user-avatar.jpg" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3 justify-start">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/ai-avatar.jpg" />
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                                <div className="bg-sidebar-accent text-sidebar-accent-foreground rounded-lg px-3 py-2 text-sm">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-sidebar-accent-foreground rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-sidebar-accent-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                                        <div className="w-2 h-2 bg-sidebar-accent-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                            className="flex-1 bg-sidebar-accent border-sidebar-border text-sidebar-accent-foreground placeholder:text-sidebar-accent-foreground/50"
                        />
                        <Button
                            size="sm"
                            onClick={sendMessage}
                            disabled={!inputValue.trim() || isLoading}
                            className="bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-accent-foreground"
                        >
                            <IconSend className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-sidebar-accent-foreground/70">
                        <span>Press Enter to send</span>
                        <Badge variant="secondary" className="bg-sidebar-accent text-sidebar-accent-foreground">AI Assistant</Badge>
                    </div>
                </div>
            </div>
        </div>
    )
} 