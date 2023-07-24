import { I_Route } from "@/def_types/route";

import { lazy } from "react";
import { CommonLoadingSkeleton } from "@/components/skeleton";
import { role } from "@/utils";

const gameRoutes: I_Route[] = [
  {
    path: "/room/*",
    component: lazy(() => import("@/pages/game/RoomPage")),
    fallback: <CommonLoadingSkeleton />,
    auth: false,
    role: role.all(),
    exact: true,
  },
];

export default gameRoutes;
