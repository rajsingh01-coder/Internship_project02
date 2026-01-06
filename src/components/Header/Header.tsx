import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Bell, Mail, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { AvatarWithBadge } from '@/components/common/Avatar/Avatar';
import { currentUser } from '@/utils/api';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/notifications', label: 'Notifications', icon: Bell, badge: 3 },
  { path: '/messages', label: 'Messages', icon: Mail, badge: 2 },
  { path: '/profile', label: 'Profile', icon: User },
];

export const Header: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border h-16">
      <div className="container mx-auto h-full px-4">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="font-semibold text-lg hidden sm:block">Social</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-full bg-secondary border-none text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="icon"
                    className={cn(
                      "relative",
                      isActive && "text-primary"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-medium">
                        {item.badge}
                      </span>
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* User Avatar & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <Link to="/profile" className="hidden md:block">
              <AvatarWithBadge
                src={currentUser.avatar}
                alt={currentUser.name}
                isVerified={currentUser.isVerified}
                size="sm"
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-card border-b border-border animate-slide-up">
          <div className="p-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-full bg-secondary border-none text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Mobile Nav Items */}
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-secondary"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-medium">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
