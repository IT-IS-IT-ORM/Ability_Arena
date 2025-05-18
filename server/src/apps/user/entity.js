import { EntitySchema } from "typeorm";

export const UserEntity = new EntitySchema({
  name: "user",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    username: {
      type: "varchar",
      length: 24,
    },
    email: {
      type: "varchar",
      length: 254,
      unique: true,
    },
    ip: {
      type: "varchar",
      length: 254,
      nullable: true,
      comment: "经纬度",
    },
    ipAddress: {
      type: "varchar",
      length: 254,
      nullable: true,
      comment: "IP 属地",
    },
    password: {
      type: "varchar",
      length: 254,
    },
    gender: {
      type: "smallint",
      default: 0,
      enum: [0, 1, 2],
      comment: "0: 保密, 1: 男, 2: 女",
    },
    avatar: {
      type: "varchar",
      length: 254,
      nullable: true,
    },
    backgroundImage: {
      type: "varchar",
      length: 254,
      nullable: true,
    },
    tags: {
      type: "varchar",
      length: 500,
      default: "",
      comment: "按逗号分隔的标签 (最多 10 个)",
    },
    locked: {
      type: "boolean",
      default: false,
      name: "is_locked",
    },
    isDelete: {
      type: "boolean",
      default: false,
      name: "is_delete",
    },
    createAt: {
      type: "timestamptz",
      name: "create_at",
      createDate: true,
    },
    updateAt: {
      type: "timestamptz",
      name: "update_at",
      updateDate: true,
    },
  },
});

export const UserAboutMeEntity = new EntitySchema({
  name: "user_about_me",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    userId: {
      type: "uuid",
      name: "user_id",
    },
    content: {
      type: "text",
    },
    createAt: {
      type: "timestamptz",
      name: "create_at",
      createDate: true,
    },
    updateAt: {
      type: "timestamptz",
      name: "update_at",
      updateDate: true,
    },
  },
});

export const UserAboutMeLikeEntity = new EntitySchema({
  name: "user_about_me_like",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    userId: {
      type: "uuid",
      name: "user_id",
    },
    aboutMeId: {
      type: "uuid",
      name: "about_me_id",
    },
    createAt: {
      type: "timestamptz",
      name: "create_at",
      createDate: true,
    },
  },
});

export const UserConfessionWallEntity = new EntitySchema({
  name: "user_confession_wall",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    userId: {
      type: "uuid",
      name: "user_id",
    },
    targetUserId: {
      type: "uuid",
      name: "target_user_id",
    },
    isRead: {
      type: "boolean",
      default: false,
      name: "is_read",
    },
    content: {
      type: "text",
    },
    createAt: {
      type: "timestamptz",
      name: "create_at",
      createDate: true,
    },
  },
});

export const UserScheduleEntity = new EntitySchema({
  name: "user_schedule",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    userId: {
      type: "uuid",
      name: "user_id",
    },
    title: {
      type: "varchar",
      length: 20,
    },
    description: {
      type: "text",
    },
    isAllDay: {
      type: "boolean",
      default: false,
      name: "is_all_day",
    },
    startTime: {
      type: "timestamptz",
      name: "start_time",
    },
    endTime: {
      type: "timestamptz",
      name: "end_time",
    },
    location: {
      type: "varchar",
      length: 120,
    },
    repeatMode: {
      type: "smallint",
      default: 0,
      name: "repeat_mode",
    },
    isAnonymous: {
      type: "boolean",
      default: false,
      name: "is_anonymous",
    },
    isPrivate: {
      type: "boolean",
      default: false,
      name: "is_private",
    },
    status: {
      type: "smallint",
      default: 0,
      enum: [0, 1, 2],
      comment: "0: 已发送, 1: 已接受, 2: 被拒绝",
    },
    rejectReason: {
      type: "text",
      nullable: true,
      name: "reject_reason",
    },
    isDelete: {
      type: "boolean",
      default: false,
      name: "is_delete",
    },
    createAt: {
      type: "timestamptz",
      name: "create_at",
      createDate: true,
    },
  },
});

export const CommonHolidayEntity = new EntitySchema({
  name: "common_holiday",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    name: {
      type: "varchar",
      length: 12,
    },
    date: {
      type: "date",
    },
  },
});
