import { I_Route } from "@/def_types/route";

import { lazy } from "react";
import { CommonLoadingSkeleton } from "@/components/skeleton";
import { role } from "@/utils";

const gameRoutes: I_Route[] = [
  {
    path: "/room/:roomId",
    component: lazy(() => import("@/pages/game/RoomPage")),
    fallback: <CommonLoadingSkeleton />,
    auth: true,
    role: [role.GAMER],
    exact: true,
  },
];

export default gameRoutes;
