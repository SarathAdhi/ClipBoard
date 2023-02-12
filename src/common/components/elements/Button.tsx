import clsx from "clsx";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "success" | "outline" | "danger";
}

export const Button: React.FC<Props> = ({
  children,
  className,
  variant = "outline",
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "rounded-md py-2 px-4 duration-150 active:scale-90 font-medium tracking-[0.3px] text-[18px]",
        variant === "success" && "bg-[#1e955d] text-white",
        variant === "danger" && "bg-[#FF0000] text-white",
        variant === "outline" && "border-2 border-gray-400"
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
