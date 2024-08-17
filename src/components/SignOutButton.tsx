'use client'
import React, { ButtonHTMLAttributes, useState } from "react";
import Button from "./ui/button";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Loader, Loader2, LogOut } from "lucide-react";

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton = ({ ...props }) => {
  const [isSigningOut, setisSigningOut] = useState<boolean>(false);
  return (
    <Button
      {...props}
      variant={"ghost"}
      onClick={async () => {
        setisSigningOut(true);
        try {
          await signOut();
        } catch (error) {
          toast.error("There was a problem signing out");
        } finally {
          setisSigningOut(false);
        }
      }}
    >
      {isSigningOut ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
    </Button>
  );
};

export default SignOutButton;
