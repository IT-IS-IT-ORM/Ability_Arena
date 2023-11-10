// 静态资源
import {
  Avatar_1,
  Avatar_2,
  Avatar_3,
  Avatar_4,
  Avatar_5,
  Avatar_6,
  Avatar_7,
  Avatar_8,
  Avatar_9,
  Avatar_10,
  Avatar_11,
  Avatar_12,
  Avatar_13,
  Avatar_14,
  Avatar_15,
  Avatar_16,
  Avatar_17,
} from "@/assets/image/user";

export const avatarList = [
  Avatar_1,
  Avatar_2,
  Avatar_3,
  Avatar_4,
  Avatar_5,
  Avatar_6,
  Avatar_7,
  Avatar_8,
  Avatar_9,
  Avatar_10,
  Avatar_11,
  Avatar_12,
  Avatar_13,
  Avatar_14,
  Avatar_15,
  Avatar_16,
  Avatar_17,
];

export default function (avatarIndex: number) {
  return avatarList[avatarIndex];
}
