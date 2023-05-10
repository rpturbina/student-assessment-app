import * as React from 'react';

import { cn } from '@/lib/utils';

type LayoutProps = React.PropsWithChildren<{
  className?: string;
}>;

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div
      className={cn(
        'mx-auto min-h-screen w-full max-w-[90%] bg-white',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Layout;
