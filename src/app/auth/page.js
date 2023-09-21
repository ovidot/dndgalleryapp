"use client";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateCurrentUser,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "@/app/firebase-config";
import { redirect, useRouter } from "next/navigation";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      router.push("/");
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center mx-auto border border-black max-w-7xl p-3 lg:p-12 gap-3 justify-center">
      <input
        type="email"
        placeholder="email"
        className="bg-transparent border border-gray-500 text-gray-950 rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-[50%] text-sm p-2.5"
        onChange={(event) => {
          setLoginEmail(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        className="bg-transparent border border-gray-500 text-gray-950 rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-[50%] text-sm p-2.5"
        onChange={(event) => {
          setLoginPassword(event.target.value);
        }}
      />
      <button
        onClick={() => login({ callbackUrl: "/" })}
        type="button"
        className="w-32 h-10 rounded-lg border border-black mt-5"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
