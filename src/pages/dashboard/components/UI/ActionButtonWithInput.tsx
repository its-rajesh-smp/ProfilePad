import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/shadcn/ui/popover";
import { useState } from "react";
import { DashboardCardType } from "../../types/dashboard.type";

interface IActionButtonProps {
  onSubmit: (data: { [key: string]: string; type: DashboardCardType }) => void;
  fieldName: string;
  type: DashboardCardType;
  icon?: React.ReactNode;
}

function ActionButtonWithInput({
  onSubmit,
  fieldName,
  type,
  icon,
}: IActionButtonProps) {
  const [input, setInput] = useState<string>("");

  const handleButtonClick = () => {
    onSubmit({
      [fieldName]: input,
      type,
    });
    setInput("");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="xs" uiType="icon" icon={icon} />
      </PopoverTrigger>
      <PopoverContent className="p-0" sideOffset={20}>
        <div className="flex items-center p-1">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-full w-full border-0 outline-none focus-visible:ring-0"
          />
          <Button onClick={handleButtonClick}>Add</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ActionButtonWithInput;