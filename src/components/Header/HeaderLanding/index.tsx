import React from "react";
// import Link from "next/link";
import { usePathname } from "next/navigation";
import getLocale from "@/common/utils/extractLocale";
import Link from "next/link";
const HeaderLanding: React.FC = () => {
  // const router = useRouter();
  const pathname = usePathname();
  const locale = getLocale(pathname);
  // const handleLogin = () => {
  //   router.push(`/${locale}/auth`);
  // };
  // const handleSignUp = () => {};
  return (
    <div className="bg-black h-20 px-10 text-white">
      <div className="flex justify-between h-full">
        <div className="flex flex-col justify-center">
          <div className="text-xl">Intelligent Tutoring System</div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex justify-center gap-10 font-semibold text-lg">
            <div className="text-center cursor-pointer hover:text-xl duration-150">
              <Link
                href={{
                  pathname: `/${locale}/auth`,
                  query: { action: "login" },
                }}
              >
                Login
              </Link>
            </div>
            <div className="text-center cursor-pointer hover:text-xl duration-150">
              <Link
                href={{
                  pathname: `/${locale}/auth`,
                  query: { action: "signup" },
                }}
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLanding;
