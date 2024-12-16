import React from "react";
import { useController } from "react-hook-form";

type InputProps = {
  name: string;
  rules?: Parameters<typeof useController>[0]["rules"];
  label: string;
  labelProps?: React.HTMLProps<HTMLLabelElement>;
  inputProps?: React.HTMLProps<HTMLSelectElement>;
  options: { value: string | number; label: string }[];
};

function Select(
  { name, rules, label, labelProps, inputProps, options }: InputProps,
  ref: React.Ref<HTMLSelectElement>
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
        <select
          ref={field.ref}
          className="select select-bordered"
          name={name}
          id={name}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          {...inputProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

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

export default React.forwardRef(Select);
