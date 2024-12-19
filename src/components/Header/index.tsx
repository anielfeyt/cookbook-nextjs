"use client";

import { createClient } from "@/services/supabase/client";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type HeaderProps = {
  user: User | null;
};

function Header({ user }: HeaderProps, ref: React.Ref<HTMLHeadElement>) {
  const [open, setOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const router = useRouter();

  const checkAuthStatus = async () => {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <header
      ref={ref}
      className="fixed z-40 w-full top-0 py-2 sm:py-4 px-4 bg-base-200  shadow-md rounded-ee-lg rounded-es-lg"
    >
      <div className="flex gap-4 items-center justify-between">
        <div>
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Resepte"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <div>
          <nav className="hidden sm:inline">
            <ul className="flex gap-1">
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      className="btn btn-sm btn-secondary"
                      href="/recipes/me"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                        />
                      </svg>

                      <span>My Recipes</span>
                    </Link>{" "}
                  </li>
                  <li>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link className="btn  btn-primary btn-sm" href="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="btn ring-0 outline-none shadow-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <div
              className={`transition-all fixed bg-slate-600/95 backdrop-blur-sm top-0 w-full h-dvh ${
                open ? "left-full" : "left-0"
              }`}
            >
              <div className="flex justify-end p-4 text-white">
                <button onClick={toggleMenu}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <nav className="h-full text-white">
                <ul className="flex flex-col items-center justify-center text-2xl gap-4 h-[calc(100%-156px)]">
                  {user ? (
                    <>
                      <li>
                        <button onClick={toggleMenu} className="h-16">
                          <Link href="/recipes/me" className="flex gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-8"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                              />
                            </svg>
                            My Recipes
                          </Link>
                        </button>
                      </li>
                      <li>
                        <button onClick={handleLogout} className="flex gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                            />
                          </svg>
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <button onClick={toggleMenu}>
                        <Link className="btn btn-primary btn-lg" href="/login">
                          Login
                        </Link>
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default React.forwardRef(Header);
