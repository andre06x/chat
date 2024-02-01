"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { api } from "@/app/api";
import { useRouter } from "next/navigation";

const Cadastrar = () => {
  const { register, handleSubmit, formState } = useForm();
  const router = useRouter();

  async function cadastrar(data: any) {
    try {
      const response = await api.post("/user", data);
      alert("Cadastrado com sucesso! Você será redirecionado");
      router.push("/login");
    } catch (err) {
      alert(err.response.data.error || err.message);
    }
  }
  return (
    <div className="flex justify-center bg-slate-600 h-screen items-center ">
      <form onSubmit={handleSubmit(cadastrar)} className="border p-4 bg-white rounded">
        <div className="flex flex-col ">
          <input
            type="text"
            {...register("name")}
            placeholder="name"
            className="border m-2 p-1 rounded"
            required
          />
          <input
            type="email"
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
