/** @format */

import { Button } from "@mui/material";
import React, { FC } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import style from "./header.module.scss";
import { Search } from "../search/search";
import MenuIcon from "@mui/icons-material/Menu";

interface IHeader {
  setDeleteMode: () => void;
  setCreateMod: () => void;
  search: string;
  setSearch: (search: string) => void;
  visibilityMenuHandler: () => void;
  visibleMenu: boolean;
}
export const Header: FC<IHeader> = ({
  setDeleteMode,
  setCreateMod,
  search,
  setSearch,
  visibilityMenuHandler,
  visibleMenu,
}) => {
  const addNewNoteHandler = () => {
    setCreateMod();
    if (visibleMenu) {
      visibilityMenuHandler();
    }
  };
  const deleteModeHandler = () => {
    setDeleteMode();
    if (!visibleMenu) {
      visibilityMenuHandler();
    }
  };

  return (
    <nav className={style.container}>
      <div>
        <Button
          className={style.menu}
          onClick={visibilityMenuHandler}
          aria-label="Menu "
        >
          <MenuIcon sx={{ fontSize: 25 }} />
        </Button>

        <Button
          onClick={addNewNoteHandler}
          aria-label="Add New Note"
        >
          <AddBoxIcon sx={{ fontSize: 25 }} />
        </Button>

        <Button
          onClick={deleteModeHandler}
          aria-label="Delete Mode"
        >
          <DeleteForeverIcon sx={{ fontSize: 25 }} />
        </Button>
      </div>
      <div>
        <Search
          search={search}
          visibilityMenuHandler={visibilityMenuHandler}
          visibleMenu={visibleMenu}
          setSearch={setSearch}
        />
      </div>
    </nav>
  );
};
