import { useState } from "react";
import Button from "./Button";
import { Menu, MenuItem } from "@mui/material";
import { FaChevronDown } from "react-icons/fa";

type DropDownProps = {
  selectedType: string;
  setSelectedType: (type: string) => void;
  options?: string[];
};

const DropDown = ({
  selectedType,
  setSelectedType,
  options = ["pending", "in progress", "completed"],
}: DropDownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (type: string) => {
    setSelectedType(type);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        aria-controls={open ? "type-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        Type: {selectedType[0].toUpperCase() + selectedType.substring(1)}{" "}
        <FaChevronDown />
      </Button>
      <Menu
        id="type-menu"
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        PaperProps={{ sx: { borderRadius: "16px", width: "115px" } }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleSelect(option)}>
            {option[0].toUpperCase() + option.substring(1)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DropDown;
