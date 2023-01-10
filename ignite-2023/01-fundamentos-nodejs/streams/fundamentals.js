/*
 *
 * Plataformas de Stream de exemplo: Netflix e Spotfy
 * Importação de clientes via CSV (Excel)
 * 1GB - 1.000.000
 * POST /upload import.csv
 *
 * se processar 10mb/s demora 100s para ler o arquivo e fazer as inserções
 *
 * Se a cada 10mb/s tem 10.000 linhas porque não processar enquanto o arquivo está sendo lido?
 *
 * Tipos de Streams
 * - Readable
 * - Writable
 * - Transform
 * - Duplex
 *
 * No node toda porta de entrada e saída é uma stream
 *
 */

// process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString());
    const result = number * -1;

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

new OneToHundredStream()
  .pipe(new InverseNumber())
  .pipe(new MultiplyByTenStream());
