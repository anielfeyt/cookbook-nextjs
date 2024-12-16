import React from "react";
import { useController } from "react-hook-form";

type InputProps = {
  label: string;
  name: string;
  rules?: Parameters<typeof useController>[0]["rules"];
  labelProps?: React.HTMLProps<HTMLLabelElement>;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  type?: React.HTMLProps<HTMLInputElement>["type"];
};

function FileInput(
  { label, name, rules, labelProps, inputProps, type = "file" }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
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
          className="file-input file-input-bordered w-full"
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

export default React.forwardRef(FileInput);
