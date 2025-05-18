import fs from "fs";
import path from "path";

export class MediaApi {
  get = async (ctx) => {
    const filePath = path.join(process.cwd(), ctx.path);

    if (!fs.existsSync(filePath)) {
      ctx.status = 404;
      return;
    }

    const file = fs.readFileSync(filePath);

    // 定义支持的文件类型和对应的 MIME 类型映射
    const mimeTypes = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".mp4": "video/mp4",
      ".webm": "video/webm",
    };
    // 获取文件扩展名并转为小写
    const ext = path.extname(filePath).toLowerCase();
    // 设置响应的 Content-Type, 如果扩展名未知则默认为 application/octet-stream
    ctx.type = mimeTypes[ext] || "application/octet-stream";
    // 设置响应体为文件内容
    ctx.body = file;
    ctx.status = 200;
  };
}
