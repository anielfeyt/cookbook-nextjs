import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  LinkComponent?: React.ElementType;
  href?: string;
  children: React.ReactNode;
  variant?: "contained" | "outlined" | "text";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses = {
  contained:
    "flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-slate-900 hover:border-slate-900/80 rounded-lg hover:bg-gray-100 hover:text-slate-700 focus:z-10 focus:ring-2 focus:ring-slate-700 focus:text-slate-700 dark:bg-slate-900 dark:border-slate-900 dark:text-white dark:hover:text-white dark:hover:bg-slate-900/80 dark:focus:ring-slate-500 dark:focus:text-white",
  outlined:
    "flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-slate-700 focus:z-10 focus:ring-2 focus:ring-slate-700 focus:text-slate-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-slate-500 dark:focus:text-white",
  text: "text-slate-500 dark:text-white",
};

function Button(
  {
    LinkComponent,
    href,
    children,
    variant = "contained",
    className,
    ...props
  }: ButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>
) {
  const Component = LinkComponent || "button";
  const classes = twMerge(variantClasses[variant], className);

  return (
    <Component ref={ref} href={href} className={classes} {...props}>
      {children}
    </Component>
  );
}

export default React.forwardRef(Button);
