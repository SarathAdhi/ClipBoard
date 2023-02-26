import React from "react";
import clsx from "clsx";

type Props = {
  label?: string;
  conatinerClassName?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea: React.FC<Props> = ({
  conatinerClassName,
  className,
  label,
  ...rest
}) => {
  return (
    <div className={clsx("w-full grid gap-1", conatinerClassName)}>
      {label && (
        <label
          htmlFor={rest.name}
          className="text-lg font-semibold text-gray-600"
        >
          {label} {rest.required && <span className="text-red-500">*</span>}
        </label>
      )}

      <textarea
        id={rest.name}
        className={clsx(
          "focus:outline-none border-[2px] py-2 px-4 text-lg rounded-md w-full",
          className
        )}
        {...rest}
      />
    </div>
  );
};
