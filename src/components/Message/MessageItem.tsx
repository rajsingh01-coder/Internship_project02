import React from 'react';
import { AvatarWithBadge } from '@/components/common/Avatar/Avatar';
import { Message } from '@/utils/api';
import { cn } from '@/lib/utils';

interface MessageItemProps {
  message: Message;
  onClick?: () => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-secondary/50 animate-fade-in",
        message.unreadCount > 0 && "bg-primary/5"
      )}
    >
      {/* Avatar */}
      <AvatarWithBadge
        src={message.user.avatar}
        alt={message.user.name}
        isVerified={message.user.isVerified}
        isOnline={message.unreadCount > 0}
        size="md"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={cn(
            "font-semibold truncate",
            message.unreadCount > 0 && "text-foreground"
          )}>
            {message.user.name}
          </span>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {message.createdAt}
          </span>
        </div>
        <p className={cn(
          "text-sm truncate mt-0.5",
          message.unreadCount > 0 ? "text-foreground" : "text-muted-foreground"
        )}>
          {message.lastMessage}
        </p>
      </div>

      {/* Unread count */}
      {message.unreadCount > 0 && (
        <div className="h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center flex-shrink-0">
          {message.unreadCount}
        </div>
      )}
    </button>
  );
};

export default MessageItem;
