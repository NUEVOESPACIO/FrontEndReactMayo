import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  type LoginFormData,
} from "../../schemas/loginSchema";

import { login } from "../../services/authServices";

import { useAuth } from "../../hooks/useAuths";

export default function LoginForm() {

  const [serverError, setServerError] =
    useState("");

  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting, }, } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {

    try {

      setServerError("");

      const response = await login(
        data.username,
        data.password

      );

      authLogin(
        response.token,
        response.user
      );

      navigate("/");

    } catch (error: any) {

      const message =
        error.response?.data?.message ||
        "Error al iniciar sesión";

      setServerError(message);
    }
  };

  return (
    <div className={containerStyles}>

      <h1 className={titleStyles}>
        Iniciar Sesión
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        {/* USERNAME */}

        <div>

          <input
            type="text"
            placeholder="Usuario"
            {...register("username")}
            className={inputStyles}
          />

          {errors.username && (
            <p className={errorStyles}>
              {errors.username.message}
            </p>
          )}

        </div>



        {/* PASSWORD */}

        <div>

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={inputStyles}
          />

          {errors.password && (
            <p className={errorStyles}>
              {errors.password.message}
            </p>
          )}

        </div>

        {/* SERVER ERROR */}

        {serverError && (
          <p className={errorStyles}>
            {serverError}
          </p>
        )}

        {/* BUTTON */}

        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonStyles}
        >
          {
            isSubmitting
              ? "Ingresando..."
              : "Ingresar"
          }
        </button>

      </form>
    </div>
  );
}

/* =========================
   STYLES
========================= */

const containerStyles = `
  w-full
  max-w-md
  bg-white
  p-8
  rounded-2xl
  shadow-xl
`;

const titleStyles = `
  text-3xl
  font-bold
  text-center
  mb-6
`;

const inputStyles = `
  w-full
  border
  border-gray-300
  rounded-lg
  p-3
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
`;

const buttonStyles = `
  w-full
  bg-blue-600
  hover:bg-blue-700
  disabled:bg-blue-300
  text-white
  p-3
  rounded-lg
  transition
  font-semibold
`;

const errorStyles = `
  text-red-500
  text-sm
  mt-1
`;