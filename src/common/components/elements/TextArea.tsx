import React from "react";
import clsx from "clsx";

export const TextArea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className, ...rest }) => {
  return (
    <textarea
      className={clsx(
        "focus:outline-none border-[2px] py-2 px-4 text-lg rounded-md w-full",
        className
      )}
      {...rest}
    />
  );
};
