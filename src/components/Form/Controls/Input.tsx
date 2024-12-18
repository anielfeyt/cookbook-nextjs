import React from "react";
import { useController } from "react-hook-form";

type InputProps = {
  label: string;
  labelProps?: React.HTMLProps<HTMLLabelElement>;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  type?: React.HTMLProps<HTMLInputElement>["type"];
  name: string;
  rules?: Parameters<typeof useController>[0]["rules"];
};

function Input({
  name,
  rules,
  label,
  labelProps,
  inputProps,
  type = "text",
}: InputProps) {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    rules,
  });

  return (
    <div>
      <label className="form-control w-full " {...labelProps}>
        <div className="label">
          <span className="label-text">
            {rules?.required ? `${label} *` : label}
          </span>
        </div>
        <input
          ref={field.ref}
          name={name}
          id={name}
          type={type}
          placeholder="Type here"
          className="input input-bordered w-full"
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          {...inputProps}
        />

        {/* <div className="label">
        <span className="label-text-alt">Bottom Left label</span>
        <span className="label-text-alt">Bottom Right label</span>
      </div> */}
      </label>
      {error && (
        <span className="label-text-alt text-error">{error.message}</span>
      )}
    </div>
  );
}

export default Input;
