'use client';
import React from 'react';
import { useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAppDispatch } from '@/redux';
import { setAuthTokens, setAuthUser } from '@/redux/slices/auth';
import { useLazyAuthRetrieveUserQuery } from '@/redux/apis/auth';
import getLocale from '@/common/utils/extractLocale';

const PostSocialAuthContainer: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [authRetrieveUser] = useLazyAuthRetrieveUserQuery();

  const retrieveUser = async () => {
    const data = await authRetrieveUser().unwrap();
    dispatch(setAuthUser(data));
    const locale = getLocale(pathname);
    if (data.is_student) {
      router.replace(`/${locale}/student`);
    } else if (data.is_tutor) {
      router.push(`/${locale}/tutor`);
    } else if (data.is_manager) {
      router.push(`/${locale}/manager`);
    } else {
      router.push(`/${locale}`);
    }
  };
  useEffect(() => {
    const access = searchParams.get('access');
    const refresh = searchParams.get('refresh');
    if (access && refresh) {
      dispatch(setAuthTokens({ access, refresh }));
    }
    retrieveUser();
  }, []);
  return <div>Login Success, Redirecting To Main Page...</div>;
};

export default PostSocialAuthContainer;
