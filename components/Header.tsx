import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex justify-center w-full h-16 items-center">
      <div className="flex justify-between items-center w-full mx-5 max-w-7xl">
        <div className="text-2xl font-semibold flex gap-2 items-center">
          <div className="relative w-10 h-10">
            <Image
              src="/logo.png"
              alt="TypeTrainer"
              fill
              sizes="(max-width: 100px) 40px, 40px"
              className="object-contain"
            />
          </div>
          <div className="font-semibold">TypeTrainer</div>
        </div>
        <div>
          <Link
            href="https://github.com/Bhavishya2601/TypeTrainer"
            target="_blank"
          >
            <Icon
              icon="mdi:github"
              width="35"
              height="35"
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
