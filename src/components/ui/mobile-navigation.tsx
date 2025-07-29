'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, BarChart3, Sparkles, User } from 'lucide-react';

const navItems = [
  {
    href: '/',
    icon: Home,
    label: 'Home',
  },
  {
    href: '/journal',
    icon: BookOpen,
    label: 'Journal',
  },
  {
    href: '/mood',
    icon: BarChart3,
    label: 'Mood',
  },
  {
    href: '/ai-summary',
    icon: Sparkles,
    label: 'AI Insights',
  },
  {
    href: '/profile',
    icon: User,
    label: 'Profile',
  },
];

export default function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden z-40">
      <div className="flex justify-around items-center max-w-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center p-2 min-w-[60px] rounded-lg transition-colors ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}