import React from "react";
import { login } from "./actions";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 text-center max-w-screen-sm">
      {/* <div className="flex justify-center mb-4">
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
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </div>
      <h1 className="text-5xl font-bold mb-5">Log In</h1>
      <form method="post" action="/auth/google">
        <button className="btn btn-primary">Sign In with Google</button>
      </form> */}
      <button className="btn btn-lg btn-outline" onClick={login}>
        Log in
      </button>
    </div>
  );
}
