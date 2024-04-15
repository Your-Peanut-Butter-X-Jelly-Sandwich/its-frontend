'use client';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux';
import { Spin } from 'antd';
import SUPPORTED_LANGUAGES from '@/constants/supportedLang';

function IdentityGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user.is_manager && (pathname.includes('student') || pathname.includes('tutor'))) {
      router.push(`/${pathname.match(`${SUPPORTED_LANGUAGES.join('|')}`)}/manager`);
    } else {
      setIsLoading(false);
    }
    if (user.is_tutor && (pathname.includes('student') || pathname.includes('manager'))) {
      router.push(`/${pathname.match(`${SUPPORTED_LANGUAGES.join('|')}`)}/tutor`);
    } else {
      setIsLoading(false);
    }
    if (user.is_student && (pathname.includes('manager') || pathname.includes('tutor'))) {
      router.push(`/${pathname.match(`${SUPPORTED_LANGUAGES.join('|')}`)}/student`);
    } else {
      setIsLoading(false);
    }
  }, [pathname]);

  return (
    <Spin spinning={isLoading} fullscreen={isLoading}>
      {children}
    </Spin>
  );
}

export default IdentityGuard;
