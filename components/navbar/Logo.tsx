import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { MdMapsHomeWork } from "react-icons/md";
import { TbHomeHand } from "react-icons/tb";

function Logo() {
  return (
    <Button size="default" variant="ghost" asChild className="hover:bg-transparent p-0">
      <Link href="/" className="flex items-center gap-2">
        <div className="bg-orange-600 rounded-md p-1">
          <TbHomeHand className="w-6 h-6 text-white" />
        </div>
        <span className="font-bold text-2xl tracking-tight hidden sm:block">ZoomStore</span>
      </Link>
    </Button>
  );
}

export default Logo;
