"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      toast.warn("Email tidak sesuai");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      toast.warn("Password tidak sesuai");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      toast.error("Email atau Password salah");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-6 md:p-14">
            <span className="mb-3 text-4xl font-bold">Selamat Datang</span>
            <span className="font-light text-gray-400 mb-8">
              Masukkan Username dan Password !
            </span>
            <form onSubmit={handleSubmit}>
              <div className="py-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="name">Username</Label>
                  <Input type="text" placeholder="Username" />
                </div>
              </div>
              <div className="py-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input type="password" placeholder="Password" />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                {" "}
                Sign In
              </button>
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </form>
            <Link className="text-sm mt-3 text-right" href={"/register"}>
              Belum memiliki akun?{" "}
              <span className="font-bold">Daftar disini</span>
            </Link>
          </div>
          <div className="relative">
            <Image
              src="/image/login-page.jpg"
              alt="login-page"
              className="w-[600px] h-full hidden rounded-r-2xl md:block object-cover"
              width={700}
              height={700}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
