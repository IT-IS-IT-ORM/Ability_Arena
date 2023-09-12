// Types
import type { I_Room } from "@/def_types/game";

// Icon
import { BiArrowBack } from "react-icons/bi";
// Custom Component
import { Button } from "@/components/common";

// Scoped style
import classes from "./style.module.scss";

// Props
interface ChatBlockProps {
  room: I_Room;
}

export default function ChatBlock({ room }: ChatBlockProps) {
  return (
    <section className={classes.chatBlock}>
      <div className="head">
        <Button>
          <BiArrowBack />
        </Button>
        <span className="room-name">{room.name}</span>
      </div>

      <div className="chat">
        
      </div>

      <div className="enter"></div>
    </section>
  );
}
