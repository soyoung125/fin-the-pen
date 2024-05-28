import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Checkbox } from "@mui/material";
import { pink } from "@mui/material/colors";

export interface CheckBoxProps {
  checked: boolean;
  handleChange: () => void;
}

function CheckBox({ checked, handleChange }: CheckBoxProps) {
  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      icon={<CheckCircleOutlineRoundedIcon />}
      checkedIcon={<CheckCircleRoundedIcon />}
    />
  );
}

export default CheckBox;
