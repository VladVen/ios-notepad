/** @format */

import React, { FC } from "react";
import { INote } from "../../types/note.interface";
import { TextField } from "@mui/material";

interface IEditArea {
  note: INote;
}
export const EditArea: FC<IEditArea> = ({ note }) => {
  return (
    <div>
      <div>{new Date(note.lastModified).toDateString()}</div>
      <TextField
        variant="standard"
        value={note.title}
      />
      <br />
      <TextField value={note.content} />
    </div>
  );
};
