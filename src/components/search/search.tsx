/** @format */

import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { FC } from "react";

interface ISearch {
  search: string;
  setSearch: (search: string) => void;
  visibilityMenuHandler: () => void;
  visibleMenu: boolean;
}
export const Search: FC<ISearch> = ({
  search,
  setSearch,
  visibilityMenuHandler,
  visibleMenu,
}) => {
  return (
    <>
      <TextField
        onSelect={!visibleMenu ? visibilityMenuHandler : undefined}
        aria-label="Search for note"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};
