import Stream from "stream";

export const koaBodyConfig = {
  json: true,
  multipart: true,
  urlencoded: true,
  formidable: {
    multiples: true,
    fileWriteStreamHandler(file) {
      const chunks = [];
      const stream = new Stream.Writable({
        write(chunk, encoding, callback) {
          chunks.push(chunk);
          callback();
        },
        final(callback) {
          file._buffer = Buffer.concat(chunks);
          callback();
        },
      });
      return stream;
    },
    keepExtensions: true,
  },
};
