import React, { useState } from 'react';
import { Card, CardContent } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';
import { AvatarWithBadge } from '@/components/common/Avatar/Avatar';
import { currentUser } from '@/utils/api';
import { Image, Smile, MapPin, Calendar } from 'lucide-react';

interface CreatePostProps {
  onPost?: (content: string) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPost }) => {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onPost?.(content);
      setContent('');
      setIsFocused(false);
    }
  };

  const maxLength = 280;
  const remaining = maxLength - content.length;

  return (
    <Card className="animate-fade-in">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <AvatarWithBadge
            src={currentUser.avatar}
            alt={currentUser.name}
            isVerified={currentUser.isVerified}
            size="md"
          />
          <div className="flex-1">
            <textarea
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsFocused(true)}
              maxLength={maxLength}
              rows={isFocused ? 3 : 1}
              className="w-full bg-transparent border-none resize-none text-lg placeholder:text-muted-foreground focus:outline-none transition-all"
            />

            {/* Action Bar */}
            <div className={`flex items-center justify-between pt-3 border-t border-border mt-3 transition-opacity ${isFocused ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="iconSm" className="text-primary">
                  <Image className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="iconSm" className="text-primary">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="iconSm" className="text-primary">
                  <MapPin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="iconSm" className="text-primary">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                {content.length > 0 && (
                  <span className={`text-sm ${remaining < 20 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {remaining}
                  </span>
                )}
                <Button
                  variant="gradient"
                  size="sm"
                  onClick={handleSubmit}
                  disabled={!content.trim()}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
