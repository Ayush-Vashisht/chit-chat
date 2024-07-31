"use client";
import React, { useState } from "react";
import Button from "./ui/button";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type FormData = z.infer<typeof addFriendValidator>;

const AddFriendButton = () => {
  const [showSuccessState, setShowuccessState] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });
  const AddFriend = async (email: string) => {
    try {
      const validatedEmail = await addFriendValidator.parse({ email });
      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });
      setShowuccessState(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
        return;
      }
      if (error instanceof AxiosError) {
        setError("email", { message: error.message });
        return;
      }
      setError("email", { message: "Something went wrong." });
    }
  };

  const onSubmit = async (data: FormData) => {
    AddFriend(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add friend by E-Mail
      </label>

      <div className="mt-2 flex gap-4">
        <input
          {...register("email")}
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="you@example.com"
        />
        <Button>Add</Button>
      </div>
      <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
      {showSuccessState ? (
        <p className="mt-1 text-sm text-green-600">Friend request sent!</p>
      ) : null}
    </form>
  );
};
export default AddFriendButton;