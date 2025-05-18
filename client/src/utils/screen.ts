// 文件内容: 与屏幕相关的函数合集

export function isLandscape() {
  return window.matchMedia("(orientation: landscape)").matches;
}
