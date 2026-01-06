import React, { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card/Card';
import { MessageItem } from '@/components/Message/MessageItem';
import { fetchMessages, Message } from '@/utils/api';
import { Loader2, Mail, Search, PenSquare } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';

export const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadMessages = async () => {
      const data = await fetchMessages();
      setMessages(data);
      setIsLoading(false);
    };
    loadMessages();
  }, []);

  const filteredMessages = messages.filter(m =>
    m.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = messages.reduce((acc, m) => acc + m.unreadCount, 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Messages</h1>
            {unreadCount > 0 && (
              <span className="h-6 px-2 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <Button variant="gradient" size="sm" className="gap-2">
            <PenSquare className="h-4 w-4" />
            New Message
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-card border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Messages List */}
        <Card className="overflow-hidden divide-y divide-border">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Mail className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">
                {searchQuery ? 'No messages found' : 'No messages yet'}
              </p>
              <p className="text-muted-foreground text-sm">
                {searchQuery
                  ? 'Try a different search term'
                  : 'Start a conversation with someone!'}
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messages;
