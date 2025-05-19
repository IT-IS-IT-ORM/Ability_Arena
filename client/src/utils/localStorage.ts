// 文件内容: 数据本地持久化

export interface localStorageProperties {
  // 读
  get<T, E>(
    key: string,
    // 默认值
    defaultValue: E,
    // 反序列化方法
    deserializer?: (value: string) => T
  ): T | E;
  // 写
  set<T>(
    key: string,
    // 储存值
    value: T,
    // 序列化方法
    serializer?: (value: T) => string
  ): void;
}

export const localStorage: localStorageProperties = {
  get(key, defaultValue, deserializer?) {
    let data = window.localStorage.getItem(key);

    // key 存在
    if (data) {
      let deserializedData;
      // 执行反序列化
      try {
        deserializedData = deserializer?.(data) ?? JSON.parse(data);
      } catch {
        return defaultValue;
      }

      return deserializedData;
    }

    return defaultValue;
  },

  set(key, value, serializer?) {
    // 执行序列化
    let serializedValue = serializer?.(value) ?? JSON.stringify(value);
    window.localStorage.setItem(key, serializedValue);
  },
};
