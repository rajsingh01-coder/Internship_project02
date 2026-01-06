import React, { useState } from 'react';
import { Card, CardContent } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';
import { AvatarWithBadge } from '@/components/common/Avatar/Avatar';
import { Post as PostType } from '@/utils/api';
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostProps {
  post: PostType;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export const Post: React.FC<PostProps> = ({
  post,
  onLike,
  onComment,
  onShare,
}) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    onLike?.(post.id);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <Card hover className="animate-fade-in">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <AvatarWithBadge
              src={post.author.avatar}
              alt={post.author.name}
              isVerified={post.author.isVerified}
              size="md"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-semibold hover:underline cursor-pointer">
                  {post.author.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>@{post.author.username}</span>
                <span>·</span>
                <span>{post.createdAt}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="iconSm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="mb-3">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
        </div>

        {/* Image */}
        {post.image && (
          <div className="mb-3 -mx-4 sm:mx-0 sm:rounded-xl overflow-hidden">
            <img
              src={post.image}
              alt="Post content"
              className="w-full object-cover max-h-96"
              loading="lazy"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "gap-2 px-3",
                isLiked && "text-destructive hover:text-destructive"
              )}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-all",
                  isLiked && "fill-current animate-pulse-like"
                )}
              />
              <span className="text-sm">{formatNumber(likeCount)}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onComment?.(post.id)}
              className="gap-2 px-3"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{formatNumber(post.comments)}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare?.(post.id)}
              className="gap-2 px-3"
            >
              <Share2 className="h-4 w-4" />
              <span className="text-sm">{formatNumber(post.shares)}</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="iconSm"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={cn(isBookmarked && "text-primary")}
          >
            <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Post;
