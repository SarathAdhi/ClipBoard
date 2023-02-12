import React from "react";
import clsx from "clsx";
import Navbar from "../components/Navbar";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const PageLayout: React.FC<Props> = ({ children, className }) => {
  return (
    <main className="min-h-screen bg-slate-100 flex flex-col gap-4 items-center">
      <Navbar />

      <div
        className={clsx(
          "flex-1 w-full max-w-[1280px] p-2 sm:p-4 flex flex-col",
          className
        )}
      >
        {children}
      </div>
    </main>
  );
};
