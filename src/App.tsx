/** @format */

import React, { useEffect, useState } from "react";
import "./App.scss";
import { Header } from "./components/header/header";
import { SideBar } from "./components/sidebar/sidebar";
import { useGetAllNotesQuery } from "./redux/api/notesApi";
import { INote } from "./types/note.interface";
import { EditArea } from "./components/editArea/editArea";
import { v4 } from "uuid";
import { Loader } from "./components/loader/loader";
import Modal from "@mui/material/Modal";

function App() {
  const { data, error, isFetching, isLoading } = useGetAllNotesQuery();
  const [currentNote, setCurrentNote] = useState<INote | null>(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [search, setSearch] = useState("");
  const [visibleMenu, setVisibleMenu] = useState(!!currentNote || false);

  const visibilityMenuHandler = () => {
    setVisibleMenu((prev) => !prev);
  };

  const deleteHandler = () => setDeleteMode((prev) => !prev);

  useEffect(() => {
    if (createMode) {
      setCurrentNote({
        id: v4(),
        content: "",
        title: "",
        lastModified: Date.now(),
      });
    }
  }, [createMode]);

  if (!data) {
    return <Loader />;
  }

  return (
    <div className="container">
      <Header
        setDeleteMode={deleteHandler}
        setCreateMod={() => setCreateMode(true)}
        search={search}
        setSearch={setSearch}
        visibilityMenuHandler={visibilityMenuHandler}
        visibleMenu={visibleMenu}
      />
      <div className="content">
        <SideBar
          notes={data.filter((item) => item.title.includes(search))}
          selectNote={setCurrentNote}
          deleteMode={deleteMode}
          setCreateMode={() => setCreateMode(false)}
        />
        {currentNote && (
          <EditArea
            key={currentNote.id}
            note={currentNote}
            createMode={createMode}
            createHandler={() => setCreateMode(false)}
            setCurrentNote={setCurrentNote}
          />
        )}
      </div>
      <Modal
        open={visibleMenu}
        sx={{ backgroundColor: "white", marginTop: "50px", padding: "10px" }}
        hideBackdrop
      >
        <SideBar
          notes={data.filter((item) => item.title.includes(search))}
          selectNote={(note) => {
            setCurrentNote(note);
            visibilityMenuHandler();
          }}
          deleteMode={deleteMode}
          setCreateMode={() => setCreateMode(false)}
        />
      </Modal>
    </div>
  );
}

export default App;
