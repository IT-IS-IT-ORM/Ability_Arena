// React
import { useEffect, useState } from "react";

// Hooks
import { useWebSocket } from "ahooks";

// Scoped style
import classes from "./style.module.scss";

export default function RoomPage() {
  return <div className={classes.roomPage}>room page, room id: {1}</div>;
}
