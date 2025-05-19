/**
 * 查询或创建一个文档
 * @param {mongoose.Model} Model - Mongoose 模型
 * @param {Object} filter - 查找条件
 * @param {Object} data - 如果没有找到，则用于创建的数据
 * @returns {Promise<Document>} - 返回找到或创建的文档
 */
export async function findOrCreate(Model, filter, data = {}) {
  let doc = await Model.findOne(filter);

  if (doc) {
    return doc;
  }

  doc = await Model.create({ ...filter, ...data });
  return doc;
}
