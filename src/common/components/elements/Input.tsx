import React from "react";
import clsx from "clsx";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...rest
}) => {
  return (
    <input
      className={clsx(
        "focus:outline-none border-[2px] py-2 px-4 text-lg rounded-md w-full",
        className
      )}
      {...rest}
    />
  );
};
