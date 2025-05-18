export function randomString(
  length = 6,
  { digits = true, az = false, AZ = false } = {}
) {
  const DIGITS = "0123456789";
  const AZ_LOWER = "abcdefghijklmnopqrstuvwxyz";
  const AZ_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const code = Array.from({ length }, () => {
    const pool = [];
    digits && pool.push(DIGITS);
    az && pool.push(AZ_LOWER);
    AZ && pool.push(AZ_UPPER);

    const randomPool = pool[Math.floor(Math.random() * pool.length)];
    return randomPool[Math.floor(Math.random() * randomPool.length)];
  }).join("");

  return code;
}
