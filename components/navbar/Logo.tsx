import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { MdMapsHomeWork } from "react-icons/md";
import { TbHomeHand } from "react-icons/tb";

function Logo() {
  return (
    <Button size="icon" asChild>
      <Link href="/">
        {/* <MdMapsHomeWork className="w-6 h-6" /> */}
        <TbHomeHand className="w-6 h-6" />
      </Link>
    </Button>
  );
}

export default Logo;
