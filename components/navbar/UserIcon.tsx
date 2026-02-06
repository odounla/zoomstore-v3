import { LuUser } from "react-icons/lu";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import Image from "next/image";

async function UserIcon() {
  const user = await currentUser();

  const profileImage = user?.imageUrl;

  if (profileImage) {
    return (
      <Image
        src={profileImage}
        alt="Profile"
        width={24}
        height={24}
        className="rounded-full object-cover"
        unoptimized
      />
    );
  }
  return <LuUser className="w-6 h-6 bg-primary rounded-full text-white" />;
}

export default UserIcon;
