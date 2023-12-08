"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loading from "@/components/ui/loading";

const Navbar = () => {
  const { data: session, status }: any = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul className="flex justify-between m-10 item-center">
        <div className="flex gap-10">
          <Link href="/dashboard"></Link>
          <div className="flex flex-row items-center gap-2">
            <span className="font-bold">{session?.user?.email}</span>
            <button
              onClick={async () => {
                await signOut();
                window.location.href = "/login";
              }}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 max-h text-sm p-2"
            >
              Logout
            </button>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
