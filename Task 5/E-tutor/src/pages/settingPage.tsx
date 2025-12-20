import { useState } from "react";
import {
  Select,
  SelectContents,
  SelectItem,
  SelectTrigger,
} from "../components/ui/customSelect.tsx";

const SettingPage = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div>
      <Select label="Course Category" value={value} onValueChange={setValue}>
        <SelectTrigger placeholder="Select option" />
        <SelectContents>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContents>
      </Select>
    </div>
  );
};

export default SettingPage;
