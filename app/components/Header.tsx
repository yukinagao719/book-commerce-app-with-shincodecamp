import Link from "next/link";
import Image from "next/image";
import React from "react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../lib/next-auth/options";
import { User } from "../types/types";

const Header = async () => {
  // const { data: session } = useSession();
  // const user = session?.user;
  // console.log(user);
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;

  return (
    <header>
      <div className="bg-slate-600 text-gray-200 shadow-lg">
        <nav className="flex justify-between items-center p-4">
          <Link href={"/"} className="text-xl font-bold">
            Book Commerce
          </Link>
          <div className="flex items-center gap-3 text-gray-300 ">
            <Link
              href={"/"}
              className="hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              ホーム
            </Link>
            <Link
              href={user ? "/profile" : "/api/auth/signin"}
              className="hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {user ? "プロフィール" : "ログイン"}
            </Link>
            {user ? (
              <Link
              href={"/api/auth/signout"}
                className="hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                // onClick={() => signOut({ callbackUrl: "/login" })}
              >
                ログアウト
              </Link>
            ) : (
              ""
            )}
            <Link href={"/profile"}>
              <Image
                className="rounded-full"
                width={50}
                height={50}
                alt="profile_icon"
                src={user?.image || "/default_icon.png"}
              />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
