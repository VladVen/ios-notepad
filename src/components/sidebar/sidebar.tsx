/** @format */

import React, { FC } from "react";
import { INote } from "../../types/note.interface";
import { Note } from "../note/note";
import style from "./sidebar.module.scss";
import { useDeleteNoteMutation } from "../../redux/slices/notesSlice";

interface INavbar {
  notes: INote[];
  selectNote: (note: INote | null) => void;
  deleteMode: boolean;
  setCreateMode: () => void;
}

export const Navbar: FC<INavbar> = ({
  notes,
  selectNote,
  deleteMode,
  setCreateMode,
}) => {
  const [deleteNote] = useDeleteNoteMutation();

  const onDelete = (id: string) => {
    deleteNote(id);
    if (notes.some((item) => item.id === id)) {
      selectNote(null);
    }
  };

  return (
    <div
      className={style.container}
      onClick={setCreateMode}
    >
      {[...notes].reverse().map((item) => (
        <Note
          note={item}
          key={item.id}
          selectNote={selectNote}
          deleteMode={deleteMode}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
