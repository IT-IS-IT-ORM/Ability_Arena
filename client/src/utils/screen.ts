// 文件内容: 与屏幕相关的函数合集

export function isMobile() {
  const checkDevice =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const checkMedia = window.matchMedia("(max-width: 767px)").matches;

  return checkDevice && checkMedia;
}

export function isLandscape() {
  return window.matchMedia("(orientation: landscape)").matches;
}

export function isIdealScreen() {
  // 宽度必须大于 880 像素
  const isIdealWidth = window.innerWidth >= 880;
  // 高度必须大于 470 像素
  const isIdealHeight = window.innerHeight >= 470;

  return isIdealWidth && isIdealHeight;
}
