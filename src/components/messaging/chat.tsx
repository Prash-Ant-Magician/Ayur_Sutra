
"use client";

import { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatRelative } from 'date-fns';

type Message = {
    id: string;
    text: string;
    senderId: string;
    timestamp: any;
};

type ChatUser = {
    id: string;
    name: string;
    avatar?: string;
};

interface ChatProps {
    sender: ChatUser;
    receiver: ChatUser;
}

export function Chat({ sender, receiver }: ChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const chatId = [sender.id, receiver.id].sort().join('_');
    const messagesCollectionRef = collection(db, 'chats', chatId, 'messages');

    useEffect(() => {
        const q = query(messagesCollectionRef, orderBy('timestamp', 'asc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newMessages = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Message));
            setMessages(newMessages);
        });

        return () => unsubscribe();
    }, [chatId]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === '') return;
        
        setIsLoading(true);
        const messageText = input;
        setInput('');

        try {
            await addDoc(messagesCollectionRef, {
                text: messageText,
                senderId: sender.id,
                timestamp: serverTimestamp(),
            });
        } catch (error) {
            console.error("Error sending message: ", error);
            // Optionally, handle the error in the UI, e.g., show a toast
        } finally {
            setIsLoading(false);
        }
    };
    
    const getMessageTimestamp = (timestamp: any) => {
        if (!timestamp) return 'sending...';
        return formatRelative(timestamp.toDate(), new Date());
    }

    return (
        <div className="flex flex-col h-[600px]">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-6">
                    {messages.map((message) => {
                        const isSender = message.senderId === sender.id;
                        const user = isSender ? sender : receiver;
                        return (
                            <div
                                key={message.id}
                                className={cn(
                                    "flex items-end gap-3",
                                    isSender ? "justify-end" : "justify-start"
                                )}
                            >
                                {!isSender && (
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div
                                    className={cn(
                                        "rounded-lg p-3 max-w-sm",
                                        isSender ? "bg-primary text-primary-foreground" : "bg-muted"
                                    )}
                                >
                                    <p className="text-sm">{message.text}</p>
                                     <p className={cn("text-xs mt-1", isSender ? "text-primary-foreground/70" : "text-muted-foreground/70")}>
                                        {getMessageTimestamp(message.timestamp)}
                                     </p>
                                </div>
                                {isSender && (
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>
            <div className="p-4 border-t">
                <div className="flex w-full items-center space-x-2">
                    <Input
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                        disabled={isLoading}
                    />
                    <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
