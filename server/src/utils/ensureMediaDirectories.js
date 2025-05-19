import fs from "fs";
import path from "path";

/**
 * 确保指定的 media 目录结构存在，不存在则自动创建
 */
export function ensureMediaDirectories() {
  const basePath = path.join(process.cwd(), "media");

  const subDirs = [];

  // 确保 /media 存在
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }

  // 逐个确保子目录存在
  subDirs.forEach((relativePath) => {
    const fullPath = path.join(basePath, relativePath);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });

  console.log("✅ 所有目录检查/创建完毕");
}
