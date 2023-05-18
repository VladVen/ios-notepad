/** @format */

import { Skeleton } from "@mui/material";
import React, { FC } from "react";

interface ILoader {}
export const Loader: FC<ILoader> = (props) => {
  return (
    <div className="container">
      <Skeleton />
      <div className="content">
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
};
