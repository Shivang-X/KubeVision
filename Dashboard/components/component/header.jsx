import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Header = () => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);
  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          {/* <h2 className="text-lg font-semibold">KubeVision</h2> */}
          <Link href="/" prefetch={false}>
            <img className="h-10" src="/kubernetes.svg" />
          </Link>
          <Link href="/" prefetch={false}>
            <h2 className="text-lg font-semibold">KubeVision</h2>
          </Link>
        </div>
        <div className="pr-20">
          <h3>
            <span className="text-xs font-normal text-muted-foreground pr-5 italic">
              Elapsed time
            </span>
            <span className="text-xl">
              {String(Math.floor(seconds / 3600)).padStart(2, "0")}:
              {String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")}:
              {String(seconds % 60).padStart(2, "0")}
            </span>
          </h3>
        </div>
      </header>
    </>
  );
};

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export default Header;
