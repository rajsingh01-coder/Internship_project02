import React from 'react';
import { AvatarWithBadge } from '@/components/common/Avatar/Avatar';
import { Notification } from '@/utils/api';
import { Heart, MessageCircle, UserPlus, AtSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
}

const notificationIcons = {
  like: { icon: Heart, color: 'text-destructive', bg: 'bg-destructive/10' },
  comment: { icon: MessageCircle, color: 'text-primary', bg: 'bg-primary/10' },
  follow: { icon: UserPlus, color: 'text-success', bg: 'bg-success/10' },
  mention: { icon: AtSign, color: 'text-warning', bg: 'bg-warning/10' },
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClick,
}) => {
  const { icon: Icon, color, bg } = notificationIcons[notification.type];

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-start gap-3 p-4 text-left transition-colors hover:bg-secondary/50 animate-fade-in",
        !notification.isRead && "bg-primary/5"
      )}
    >
      {/* Icon */}
      <div className={cn("p-2 rounded-full flex-shrink-0", bg)}>
        <Icon className={cn("h-4 w-4", color)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <AvatarWithBadge
            src={notification.user.avatar}
            alt={notification.user.name}
            isVerified={notification.user.isVerified}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm">
              <span className="font-semibold">{notification.user.name}</span>{' '}
              <span className="text-muted-foreground">{notification.message}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {notification.createdAt}
            </p>
          </div>
        </div>
      </div>

      {/* Unread indicator */}
      {!notification.isRead && (
        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
      )}
    </button>
  );
};

export default NotificationItem;
