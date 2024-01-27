import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center bg-slate-600 h-screen align-center ">
      <div className="border p-4 bg-white rounded">
        <div className="flex flex-col ">
          <input type="text" placeholder="email" className="border m-2 p-1 rounded" />
          <input
            type="text"
            placeholder="senha"
            className="border m-2 mb-4 p-1 rounded"
          />
          <button className="bg-slate-600 text-white rounded m-2 p-1">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
