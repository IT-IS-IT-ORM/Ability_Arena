import { EntitySchema } from "typeorm";

export const ArticleEntity = new EntitySchema({
  name: "article",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    title: {
      type: "varchar",
      length: 24,
    },
    tag: {
      type: "smallint",
      default: 0,
      enum: [0, 1, 2, 3],
      comment: "0: 普通, 1: 广告, 2: 官方, 3: 推荐",
    },
    cover: {
      type: "varchar",
      length: 254,
      nullable: true,
    },
    content: {
      type: "text",
    },
    authorId: {
      type: "uuid",
      name: "author_id",
    },
    views: {
      type: "int",
      default: 0,
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
    lastEditTime: {
      type: "timestamptz",
      name: "last_edit_time",
      updateDate: true,
    },
    releaseTime: {
      type: "timestamptz",
      name: "release_time",
      createDate: true,
    },
  },
});

export const ArticleTopicEntity = new EntitySchema({
  name: "article_topic",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    title: {
      type: "varchar",
      length: 16,
    },
    articleId: {
      type: "uuid",
      name: "article_id",
    },
  },
});

export const ArticleLikeEntity = new EntitySchema({
  name: "article_like",
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
    articleId: {
      type: "uuid",
      name: "article_id",
    },
    createAt: {
      type: "timestamptz",
      name: "create_at",
      createDate: true,
    },
  },
});

export const ArticleReportEntity = new EntitySchema({
  name: "article_report",
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
    articleId: {
      type: "uuid",
      name: "article_id",
    },
    reasonType: {
      type: "smallint",
      default: 0,
      enum: [0, 1, 2, 3, 4],
      comment:
        "0: 违反哈萨克斯坦法律法规, 1: 不文明, 2: 污秽色情, 3: 侵犯知识产权, 4: 其他",
    },
    reasonText: {
      type: "varchar",
      length: 500,
      name: "reason_text",
    },
    createAt: {
      type: "timestamptz",
      name: "create_at",
      createDate: true,
    },
  },
});

export const ArticleCommentEntity = new EntitySchema({
  name: "article_comment",
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
    articleId: {
      type: "uuid",
      name: "article_id",
    },
    content: {
      type: "varchar",
      length: 500,
    },
    isModified: {
      type: "boolean",
      default: false,
      name: "is_modified",
    },
    parentNodeId: {
      type: "uuid",
      name: "parent_node_id",
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

export const ArticleCommentLikeEntity = new EntitySchema({
  name: "article_comment_like",
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
    commentId: {
      type: "uuid",
      name: "comment_id",
    },
    createAt: {
      type: "timestamptz",
      name: "create_at",
      createDate: true,
    },
  },
});
