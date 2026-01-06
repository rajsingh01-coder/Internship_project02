// Mock API data for the social media dashboard

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  isVerified?: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: User;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface Message {
  id: string;
  user: User;
  lastMessage: string;
  createdAt: string;
  unreadCount: number;
}

// Mock current user
export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  username: 'alexj',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  bio: 'Full-stack developer | Tech enthusiast | Coffee lover ☕',
  followers: 1234,
  following: 567,
  posts: 89,
  isVerified: true,
};

// Mock users
export const mockUsers: User[] = [
  currentUser,
  {
    id: '2',
    name: 'Sarah Chen',
    username: 'sarahc',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    bio: 'Designer & Creative Director',
    followers: 5678,
    following: 234,
    posts: 156,
    isVerified: true,
  },
  {
    id: '3',
    name: 'Mike Wilson',
    username: 'mikew',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Photographer | World traveler',
    followers: 3456,
    following: 890,
    posts: 234,
  },
  {
    id: '4',
    name: 'Emily Davis',
    username: 'emilyd',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Product Manager at TechCorp',
    followers: 2345,
    following: 456,
    posts: 67,
  },
  {
    id: '5',
    name: 'James Brown',
    username: 'jamesb',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'Startup founder | Angel investor',
    followers: 8901,
    following: 123,
    posts: 45,
    isVerified: true,
  },
];

// Mock posts
export const mockPosts: Post[] = [
  {
    id: '1',
    author: mockUsers[1],
    content: 'Just launched our new design system! 🎨 Really proud of what the team accomplished. Check it out and let me know what you think!',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    likes: 234,
    comments: 45,
    shares: 12,
    isLiked: false,
    createdAt: '2h ago',
  },
  {
    id: '2',
    author: mockUsers[2],
    content: 'Captured this beautiful sunset during my trip to Santorini 🌅 Sometimes you just need to pause and appreciate the moment.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop',
    likes: 567,
    comments: 89,
    shares: 34,
    isLiked: true,
    createdAt: '4h ago',
  },
  {
    id: '3',
    author: mockUsers[4],
    content: 'Excited to announce that we just closed our Series A! 🚀 Thank you to everyone who believed in our vision. The journey is just beginning!',
    likes: 1234,
    comments: 156,
    shares: 78,
    isLiked: false,
    createdAt: '6h ago',
  },
  {
    id: '4',
    author: mockUsers[3],
    content: 'Pro tip: The best products are built by teams that truly understand their users. Spend time with your customers today! 💡',
    likes: 345,
    comments: 67,
    shares: 23,
    isLiked: true,
    createdAt: '8h ago',
  },
];

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: mockUsers[1],
    message: 'liked your post',
    createdAt: '5m ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'follow',
    user: mockUsers[2],
    message: 'started following you',
    createdAt: '1h ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'comment',
    user: mockUsers[3],
    message: 'commented on your post: "Great work!"',
    createdAt: '2h ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'mention',
    user: mockUsers[4],
    message: 'mentioned you in a post',
    createdAt: '3h ago',
    isRead: true,
  },
];

// Mock messages
export const mockMessages: Message[] = [
  {
    id: '1',
    user: mockUsers[1],
    lastMessage: 'Hey! Did you see the new design?',
    createdAt: '10m ago',
    unreadCount: 2,
  },
  {
    id: '2',
    user: mockUsers[2],
    lastMessage: 'Thanks for the feedback!',
    createdAt: '1h ago',
    unreadCount: 0,
  },
  {
    id: '3',
    user: mockUsers[3],
    lastMessage: 'Let me know when you are free',
    createdAt: '3h ago',
    unreadCount: 1,
  },
];

// Simulated API functions
export const fetchPosts = (): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPosts), 500);
  });
};

export const fetchNotifications = (): Promise<Notification[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockNotifications), 300);
  });
};

export const fetchMessages = (): Promise<Message[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMessages), 300);
  });
};

export const fetchUser = (userId: string): Promise<User | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUsers.find(u => u.id === userId)), 200);
  });
};
