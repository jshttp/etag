import { Buffer } from "node:buffer";
import { statSync } from "node:fs";
import { describe, test } from "vitest";
import { etag } from "./index.js";

const _etag = etag;

for (const size of [100, 1000, 5000, 10000, 100000]) {
  const buffer = Buffer.alloc(size, "x");
  const string = buffer.toString();
  describe(`${size}B body`, () => {
    for (const [name, entity] of Object.entries({ buffer, string })) {
      for (const weak of [false, true]) {
        const label = `${name} - ${weak ? "weak" : "strong"}`;
        test(label, async ({ bench }) => {
          await bench(label, () => {
            _etag(entity, { weak });
          }).run();
        });
      }
    }
  });
}

const real = statSync(new URL(import.meta.url));
const fake = { ctime: new Date(), mtime: new Date(), ino: 0, size: 3027 };

describe("stats", () => {
  for (const [name, stat] of Object.entries({ real, fake })) {
    for (const weak of [false, true]) {
      const label = `${name} - ${weak ? "weak" : "strong"}`;
      test(label, async ({ bench }) => {
        await bench(label, () => {
          _etag(stat, { weak });
        }).run();
      });
    }
  }
});
