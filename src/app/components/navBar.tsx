"use client";
import { useViewportSize } from "@mantine/hooks";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { width } = useViewportSize();

  useEffect(() => {
    // Check if the user is logged in
    const user = localStorage.getItem("user");

    setIsLoggedIn(!!user); // Convert user to a boolean value
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  const user = localStorage.getItem("user");

  return (
    <div className="p-10 h-14 flex flex-row justify-center md:justify-between w-full mx-auto">
      <div className="flex justify-center items-center">
        <Image src="/logo.png" alt="Logo" width={150} height={150} />
      </div>
      <div className="hidden md:flex flex-row justify-center items-center">
        <h1 className="text-white text-base md:text-xl mr-4">
          Hello, {JSON.parse(user).first_name} !
        </h1>
        <div className="relative w-24 h-24">
          <Image
            src={JSON.parse(user).avatar}
            alt="Avatar"
            width={width >= 718 ? 75 : 55}
            height={width >= 718 ? 75 : 55}
            className="rounded-full object-cover translate-y-3 md:translate-y-0"
          />
        </div>
      </div>
    </div>
  );
}
