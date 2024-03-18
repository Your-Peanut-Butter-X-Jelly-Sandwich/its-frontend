'use client';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux';
import { Spin } from 'antd';
import SUPPORTED_LANGUAGES from '@/constants/supportedLang';
function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!isAuthenticated) {
      if (pathname.includes('student') || pathname.includes('tutor')) {
        router.push(`/${pathname.match(`${SUPPORTED_LANGUAGES.join('|')}`)}/auth`);
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
    if (isAuthenticated) {
      setIsLoading(false);
    }
  }, [pathname]);

  return (
    <Spin spinning={isLoading} fullscreen={isLoading}>
      {children}
    </Spin>
  );
}

export default AuthGuard;
