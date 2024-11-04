import { debounce } from "@/common/heplers/debounce";

import { useCallback } from "react";

interface IAutoSaveTextFieldProps {
  children?: React.ReactNode;
  id: string;
  fieldToUpdate: string;
  className?: string;
  onChange?: (id: string, data: any) => void;
  onSave?: (data: any) => void;
}

function AutoSaveTextField({
  id,
  fieldToUpdate,
  children,
  className,
  onChange,
}: IAutoSaveTextFieldProps) {
  const debouncedUpdateOnDb = useCallback(
    debounce((value: string) => {
      onChange?.(id, { [fieldToUpdate]: value });
    }, 500),
    [id],
  );

  const onTextChange = (e: any) => {
    const newText = e.target.innerText;
    debouncedUpdateOnDb(newText);
  };

  return (
    <span
      className={`h-full w-full ${className}`}
      contentEditable
      suppressContentEditableWarning
      onInput={onTextChange}
    >
      {children}
    </span>
  );
}

export default AutoSaveTextField;
