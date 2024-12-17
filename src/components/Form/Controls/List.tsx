import React, { useEffect, useImperativeHandle } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useController } from "react-hook-form";

type InputProps = {
  label: string;
  labelProps?: React.HTMLProps<HTMLLabelElement>;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  type?: React.HTMLProps<HTMLInputElement>["type"];
  rules?: Parameters<typeof useController>[0]["rules"];
  name: string;
};

function SortableItem({ value, id, setItems }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleItemAddUpdate = (index: number, value: string) => {
    setItems((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const handleItemDelete = (currentItem: string) => {
    setItems((prev) => prev.filter((item) => item !== currentItem));
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="join w-full">
        <input
          ref={inputRef}
          type="text"
          value={value}
          className="input input-bordered join-item w-full"
          onChange={(e) => handleItemAddUpdate(id, e.target.value)}
          onBlur={(e) => handleItemAddUpdate(id, e.target.value)}
        />
        <button
          ref={setActivatorNodeRef}
          {...listeners}
          type="button"
          className="btn btn-neutral join-item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.499 8.248h15m-15 7.501h15"
            />
          </svg>
        </button>
        <button
          className="btn btn-error join-item min-w-[100px]"
          type="button"
          onClick={() => handleItemDelete(id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function List({
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

  const internalRef = React.useRef<HTMLInputElement>(null);
  const [items, setItems] = React.useState<string[]>(field.value || []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddItem = () => {
    if (internalRef.current?.value) {
      const newItem = internalRef.current.value.trim();
      setItems((prev) => [...prev, newItem]);
      internalRef.current.value = "";
    }
  };

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  useImperativeHandle(field.ref, () => internalRef.current!, []);

  useEffect(() => {
    field.onChange(items);
  }, [items]);

  return (
    <div>
      <label htmlFor={name} {...labelProps}>
        <div className="label">
          <span className="label-text">
            {rules?.required ? `${label} *` : label}
          </span>
        </div>
      </label>
      <div className="join w-full ">
        <input
          ref={internalRef}
          type={type}
          placeholder="Type here"
          className="input input-bordered join-item w-full "
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddItem();
            }
          }}
          {...inputProps}
        />

        <button
          className="btn btn-neutral join-item min-w-[100px]"
          type="button"
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </div>
      <div className="divider"></div>
      <div className="flex flex-col gap-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <SortableItem
                key={item}
                id={item}
                value={item}
                setItems={setItems}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      {error && (
        <span className="label-text-alt text-error">{error.message}</span>
      )}
    </div>
  );
}

export default List;
