import React from "react";
import { useController } from "react-hook-form";

type InputProps = {
  name: string;
  rules?: Parameters<typeof useController>[0]["rules"];
  label: string;
  labelProps?: React.HTMLProps<HTMLLabelElement>;
  inputProps?: React.HTMLProps<HTMLTextAreaElement>;
};

function Textarea(
  { name, rules, label, labelProps, inputProps }: InputProps,
  ref: React.Ref<HTMLTextAreaElement>
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
        <textarea
          ref={field.ref}
          className="textarea textarea-bordered"
          name={name}
          id={name}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          {...inputProps}
        ></textarea>

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

export default React.forwardRef(Textarea);
