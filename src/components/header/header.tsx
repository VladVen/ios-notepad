/** @format */

import { TextField, InputAdornment, Button } from "@mui/material";
import React, { FC } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import style from "./header.module.scss";

interface IHeader {}
export const Header: FC<IHeader> = (props) => {
  return (
    <div className={style.container}>
      <div>
        <Button sx={{ minWidth: "30px" }}>
          <AddBoxIcon />
        </Button>

        <Button sx={{ minWidth: "30px" }}>
          <DeleteForeverIcon />
        </Button>
      </div>
      <div>
        <TextField
          placeholder="Search"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};
