"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { api } from "@/app/api";
import { useRouter } from "next/navigation";

const Cadastrar = () => {
  const { register, handleSubmit, formState } = useForm();
  const router = useRouter();

  return (
    <div className="flex justify-center bg-slate-600 h-screen items-center ">
      <form className="border p-4 bg-white rounded">
        <div className="flex flex-col ">
          <input
            type="text"
            {...register("nome")}
            placeholder="nome"
            className="border m-2 p-1 rounded"
            required
          />
          <input
            type="text"
            {...register("email")}
            placeholder="email"
            className="border m-2 p-1 rounded"
            required
          />
          <input
            type="password"
            placeholder="senha"
            {...register("password")}
            required
            className="border m-2 mb-4 p-1 rounded"
          />
          <button type="submit" className="bg-slate-600 text-white rounded m-2 p-1">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Cadastrar;
