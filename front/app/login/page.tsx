"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { api } from "@/app/api";
import { useRouter } from "next/navigation";

const Login = () => {
  const { register, handleSubmit, formState } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post("/user/auth", data);
      localStorage.setItem("user", JSON.stringify(response.data));
      router.push("/chat");
    } catch (err) {}
  };
  return (
    <div className="flex justify-center bg-slate-600 h-screen items-center ">
      <form onSubmit={handleSubmit(onSubmit)} className="border p-4 bg-white rounded">
        <div className="flex flex-col ">
          <input
            type="text"
            {...register("email")}
            placeholder="email"
            className="border m-2 p-1 rounded"
          />
          <input
            type="password"
            placeholder="senha"
            {...register("password")}
            className="border m-2 mb-4 p-1 rounded"
          />
          <button type="submit" className="bg-slate-600 text-white rounded m-2 p-1">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
