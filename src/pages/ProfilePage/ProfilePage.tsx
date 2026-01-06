import React, { useState, useEffect } from 'react';
import { ProfileCard } from '@/components/Profile/ProfileCard';
import { Post } from '@/components/Post/Post';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { currentUser, fetchPosts, Post as PostType } from '@/utils/api';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ProfilePage: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      // Filter to only show current user's posts (simulated)
      const userPosts = data.map(post => ({ ...post, author: currentUser }));
      setPosts(userPosts);
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content */}
        <main className="lg:col-span-7 xl:col-span-8 space-y-4">
          <ProfileCard user={currentUser} isCurrentUser />

          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full justify-start bg-card border border-border rounded-xl p-1">
              <TabsTrigger value="posts" className="flex-1 rounded-lg">
                Posts
              </TabsTrigger>
              <TabsTrigger value="replies" className="flex-1 rounded-lg">
                Replies
              </TabsTrigger>
              <TabsTrigger value="media" className="flex-1 rounded-lg">
                Media
              </TabsTrigger>
              <TabsTrigger value="likes" className="flex-1 rounded-lg">
                Likes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-4 space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                posts.map((post) => (
                  <Post key={post.id} post={post} />
                ))
              )}
            </TabsContent>

            <TabsContent value="replies" className="mt-4">
              <div className="text-center py-12 text-muted-foreground">
                No replies yet
              </div>
            </TabsContent>

            <TabsContent value="media" className="mt-4">
              <div className="text-center py-12 text-muted-foreground">
                No media yet
              </div>
            </TabsContent>

            <TabsContent value="likes" className="mt-4">
              <div className="text-center py-12 text-muted-foreground">
                No likes yet
              </div>
            </TabsContent>
          </Tabs>
        </main>

        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-5 xl:col-span-4">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProfilePage;
