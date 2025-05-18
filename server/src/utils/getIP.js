import os from "os";

/**
 * 获取本机IP地址, 返回 IPv4 地址列表
 * @returns {string[]} 本机IPv4地址列表
 */
export function getLocalIP() {
  const interfaces = os.networkInterfaces();
  const ipv4 = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // 过滤出 IPv4，非回环地址，非内部地址
      if (iface.family === "IPv4" && !iface.internal) {
        ipv4.push(iface.address);
      }
    }
  }

  return ipv4;
}
