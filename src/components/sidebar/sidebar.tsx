/** @format */

import React, { FC } from "react";
import { INote } from "../../types/note.interface";
import { Note } from "../note/note";
import style from "./sidebar.module.scss";

interface INavbar {
  notes: INote[];
  selectNote: (note: INote) => void;
}

export const Navbar: FC<INavbar> = ({ notes, selectNote }) => {
  return (
    <div className={style.container}>
      {notes.map((item) => (
        <Note
          note={item}
          key={item.id}
          selectNote={selectNote}
        />
      ))}
    </div>
  );
};
