import { Badge } from '@/components/ui/badge';
import { Brain, Construction } from 'lucide-react';

interface AppStatusBadgeProps {
  status: 'ready' | 'training' | 'construction';
  className?: string;
}

export const AppStatusBadge = ({ status, className = '' }: AppStatusBadgeProps) => {
  if (status === 'ready') return null;

  const config = {
    training: {
      label: 'In Training',
      icon: Brain,
      className: 'bg-amber-500/20 text-amber-600 border-amber-500/30 dark:text-amber-400'
    },
    construction: {
      label: 'Under Construction',
      icon: Construction,
      className: 'bg-orange-500/20 text-orange-600 border-orange-500/30 dark:text-orange-400'
    }
  };

  const { label, icon: Icon, className: statusClassName } = config[status];

  return (
    <Badge 
      variant="outline" 
      className={`${statusClassName} ${className} flex items-center gap-1 text-xs px-2 py-1`}
    >
      <Icon size={12} />
      {label}
    </Badge>
  );
};