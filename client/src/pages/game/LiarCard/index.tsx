// React
import { memo, useEffect, useState } from "react";

// Hooks
import { useWebSocket } from "ahooks";

// Scoped style
import classes from "./style.module.scss";

export default memo(function LiarCard() {
  const { sendMessage, latestMessage } = useWebSocket(
    "ws://localhost:8000/ws/game/liar-card/",
    {
      reconnectLimit: 0,
    }
  );

  const [state, setState] = useState("");

  console.log("latestMessage: ", latestMessage);

  return (
    <div className={classes.liarCard}>
      <p style={{ color: "#fff" }}>
        latest message: {JSON.parse(latestMessage?.data ?? "{}")?.message}
      </p>

      <input
        value={state}
        onChange={({ target: { value } }) => {
          setState(value);
          sendMessage?.(JSON.stringify({ message: value }));
        }}
      />
    </div>
  );
});
