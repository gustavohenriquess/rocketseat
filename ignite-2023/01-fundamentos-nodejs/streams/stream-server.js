import http from "node:http";

import { Writable, Transform } from "node:stream";

class InverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString());
    const result = number * -1;
    console.log(result);
    callback(null, Buffer.from(String(result)));
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    const number = Number(chunk.toString());
    const result = number * 10;

    console.log(result);

    callback();
  }
}

// req => Readable Stream
// res => Writeable Stream
const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();
  console.log(fullStreamContent);

  return res.end(fullStreamContent);

  // return req.pipe(new InverseNumber()).pipe(new MultiplyByTenStream());
});

server.listen(3334);
