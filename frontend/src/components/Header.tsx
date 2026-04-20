import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <Button
        id="nav-menu-button"
        aria-controls={open ? "nav-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
      >
        Menu
      </Button>
      <Menu
        id="nav-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "nav-menu-button",
          },
        }}
      >
        <MenuItem onClick={handleClose} component={Link} to="/">
          Home
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/about">
          About Me
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/work">
          My Work
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/blog">
          Blog
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/contact">
          How To Reach Me
        </MenuItem>
      </Menu>
    </header>
  );
}
