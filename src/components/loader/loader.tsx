/** @format */

import React, { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import style from "./loader.module.scss";

interface ILoader {}
export const Loader: FC<ILoader> = (props) => {
  return (
    <div className={style.container}>
      <CircularProgress />
    </div>
  );
};
