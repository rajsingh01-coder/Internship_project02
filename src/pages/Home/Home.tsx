import React, { useState, useEffect } from 'react';
import { Post } from '@/components/Post/Post';
import { CreatePost } from '@/components/Post/CreatePost';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { fetchPosts, Post as PostType, currentUser } from '@/utils/api';
import { Loader2 } from 'lucide-react';

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  const handleNewPost = (content: string) => {
    const newPost: PostType = {
      id: Date.now().toString(),
      author: currentUser,
      content,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      createdAt: 'Just now',
    };
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Feed */}
        <main className="lg:col-span-7 xl:col-span-8 space-y-4">
          <h1 className="text-2xl font-bold mb-6">Home</h1>
          
          <CreatePost onPost={handleNewPost} />

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                />
              ))}
            </div>
          )}
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

export default Home;
