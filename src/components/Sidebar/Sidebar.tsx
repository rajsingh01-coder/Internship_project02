import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';
import { AvatarWithBadge } from '@/components/common/Avatar/Avatar';
import { currentUser, mockUsers } from '@/utils/api';
import { TrendingUp, Hash } from 'lucide-react';

const trendingTopics = [
  { tag: 'ReactJS', posts: '12.5K' },
  { tag: 'TailwindCSS', posts: '8.2K' },
  { tag: 'TypeScript', posts: '15.1K' },
  { tag: 'WebDev', posts: '22.3K' },
];

export const Sidebar: React.FC = () => {
  const suggestedUsers = mockUsers.filter(u => u.id !== currentUser.id).slice(0, 3);

  return (
    <aside className="space-y-4">
      {/* Current User Card */}
      <Card className="animate-fade-in">
        <CardContent className="p-4">
          <Link to="/profile" className="flex items-center gap-3">
            <AvatarWithBadge
              src={currentUser.avatar}
              alt={currentUser.name}
              isVerified={currentUser.isVerified}
              size="lg"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{currentUser.name}</p>
              <p className="text-sm text-muted-foreground truncate">@{currentUser.username}</p>
            </div>
          </Link>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border text-sm">
            <div className="text-center">
              <p className="font-bold">{currentUser.posts}</p>
              <p className="text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{currentUser.followers.toLocaleString()}</p>
              <p className="text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{currentUser.following}</p>
              <p className="text-muted-foreground">Following</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-primary" />
            Trending
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {trendingTopics.map((topic) => (
              <button
                key={topic.tag}
                className="flex items-center gap-2 w-full text-left hover:bg-secondary/50 -mx-2 px-2 py-1.5 rounded-lg transition-colors"
              >
                <Hash className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">{topic.tag}</p>
                  <p className="text-xs text-muted-foreground">{topic.posts} posts</p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Who to Follow */}
      <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Who to follow</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {suggestedUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <AvatarWithBadge
                  src={user.avatar}
                  alt={user.name}
                  isVerified={user.isVerified}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
                </div>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default Sidebar;
