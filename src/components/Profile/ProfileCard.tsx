import React from 'react';
import { Card, CardContent } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';
import { AvatarWithBadge } from '@/components/common/Avatar/Avatar';
import { User } from '@/utils/api';
import { MapPin, Link as LinkIcon, Calendar } from 'lucide-react';

interface ProfileCardProps {
  user: User;
  isCurrentUser?: boolean;
  onFollow?: () => void;
  isFollowing?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  isCurrentUser = false,
  onFollow,
  isFollowing = false,
}) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <Card className="overflow-hidden animate-fade-in">
      {/* Cover Image */}
      <div className="h-24 gradient-primary" />
      
      <CardContent className="relative pt-0">
        {/* Avatar */}
        <div className="absolute -top-10 left-5">
          <AvatarWithBadge
            src={user.avatar}
            alt={user.name}
            isVerified={user.isVerified}
            size="xl"
            className="border-4 border-card"
          />
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2 mb-8">
          {isCurrentUser ? (
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
          ) : (
            <Button
              variant={isFollowing ? 'outline' : 'default'}
              size="sm"
              onClick={onFollow}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          )}
        </div>

        {/* User Info */}
        <div className="space-y-3">
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>

          <p className="text-sm">{user.bio}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              San Francisco, CA
            </span>
            <span className="flex items-center gap-1">
              <LinkIcon className="h-4 w-4" />
              portfolio.dev
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Joined Jan 2023
            </span>
          </div>

          {/* Stats */}
          <div className="flex gap-4 pt-2">
            <button className="hover:underline">
              <span className="font-bold">{formatNumber(user.following)}</span>{' '}
              <span className="text-muted-foreground">Following</span>
            </button>
            <button className="hover:underline">
              <span className="font-bold">{formatNumber(user.followers)}</span>{' '}
              <span className="text-muted-foreground">Followers</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
