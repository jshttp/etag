import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import * as fs from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it } from "vitest";
import { etag } from "./index.js";

const filename = fileURLToPath(import.meta.url);

const str5kb = "beep boop\n".repeat(512);
const buf5kb = Buffer.from(str5kb);

describe("etag(entity)", function () {
  it("should require an entity", function () {
    // @ts-expect-error Missing entity is rejected at runtime.
    assert.throws(() => etag(), /argument entity is required/);
  });

  it.each([
    [100 * 1024, '"3400~DaQsX3VThEpAXzlxC1q14A1asMDRZk-IkxobmY6XW1k"'],
    [100 * 1024 + 1, '"3401~vF2SNLRIR6Dy8QjWQez8H0mMj-q75R22XQvgrlwkoDI"'],
  ] as const)(
    "generates identical tags for a Unicode string and Buffer of %i bytes",
    (length, expected) => {
      const entity =
        "论".repeat(Math.floor(length / 3)) + "x".repeat(length % 3);
      assert.equal(etag(entity), expected);
      assert.equal(etag(Buffer.from(entity)), expected);
    },
  );

  describe('when "entity" is a string', function () {
    it("should generate a strong ETag", function () {
      assert.strictEqual(
        etag("beep boop"),
        '"9~kOpojiddWAVnMlAySStZe8dyIcYkk-djMLhd3aGR73w"',
      );
    });

    it("should work containing Unicode", function () {
      assert.strictEqual(
        etag("论"),
        '"3~x8ziQE-YlDcTOdm8SeUCOgGhK60yyXFdum_Oy6-gH-g"',
      );
      assert.strictEqual(
        etag("论", { weak: true }),
        'W/"3~x8ziQE-YlDcTOdm8SeUCOgGhK60yyXFdum_Oy6-gH-g"',
      );
    });

    it("should work for empty string", function () {
      assert.strictEqual(
        etag(""),
        '"0~47DEQpj8HBSa-_TImW-5JCeuQeRkm5NMpJWZG3hSuFU"',
      );
    });
  });

  describe('when "entity" is a Buffer', function () {
    it("should generate a strong ETag", function () {
      assert.strictEqual(
        etag(Buffer.from([1, 2, 3])),
        '"3~A5BYxvLAy0ksUzsKTRTvd8wPeKvMztUofYShogEc-4E"',
      );
    });

    it("should work for empty Buffer", function () {
      assert.strictEqual(
        etag(Buffer.alloc(0)),
        '"0~47DEQpj8HBSa-_TImW-5JCeuQeRkm5NMpJWZG3hSuFU"',
      );
    });
  });

  describe('when "entity" is an ArrayBuffer view', function () {
    it("generates the same tag as a Buffer with the same bytes", function () {
      const bytes = Uint8Array.of(1, 2, 3);
      const expected = etag(Buffer.from(bytes));

      assert.strictEqual(etag(bytes), expected);
      assert.strictEqual(etag(bytes, { weak: true }), "W/" + expected);
    });

    it.each([0, 3, (100 * 1024) / Uint16Array.BYTES_PER_ELEMENT + 1])(
      "hashes only the view bytes for %i Uint16Array elements",
      function (length) {
        const backing = new Uint16Array(length + 2).fill(0xabcd);
        const view = backing.subarray(1, length + 1).fill(0x1234);
        const bytes = Buffer.from(
          view.buffer,
          view.byteOffset,
          view.byteLength,
        );

        const dataView = new DataView(
          view.buffer,
          view.byteOffset,
          view.byteLength,
        );
        const expected = etag(bytes);

        assert.strictEqual(etag(view), expected);
        assert.strictEqual(etag(dataView), expected);
      },
    );
  });

  describe('when "entity" is a fs.Stats', function () {
    it("should generate a weak ETag", function () {
      assert.ok(isweak(etag(fs.statSync(filename))));
    });

    it("should generate consistently", function () {
      assert.strictEqual(
        etag(fs.statSync(filename)),
        etag(fs.statSync(filename)),
      );
    });
  });

  describe('when "entity" is a fs.BigIntStats', function () {
    it("should generate a weak ETag by default and allow a strong ETag", function () {
      const stat = fs.statSync(filename, { bigint: true });
      const expected = `"${stat.size.toString(32)}~${stat.mtime.getTime().toString(32)}"`;

      assert.strictEqual(etag(stat), "W/" + expected);
      assert.strictEqual(etag(stat, { weak: false }), expected);
    });

    it("should preserve the full size of a BigInt stats-like object", function () {
      const stat = {
        ctime: new Date("2014-09-01T14:52:07Z"),
        mtime: new Date("2014-09-01T14:52:07Z"),
        ino: 0n,
        size: 0x20000000000001n,
      };

      assert.strictEqual(etag(stat), 'W/"80000000001~190or76eo"');
    });
  });

  describe('when "entity" looks like a stats object', function () {
    it("should generate a weak ETag", function () {
      const fakeStat = {
        ctime: new Date("2014-09-01T14:52:07Z"),
        mtime: new Date("2014-09-01T14:52:07Z"),
        ino: 0,
        size: 3027,
      };
      assert.strictEqual(etag(fakeStat), 'W/"2uj~190or76eo"');
    });

    it("encodes small and large timestamps in base 32", function () {
      for (const [ms, expected] of [
        [-2147483649, "-2000001"],
        [-2147483648, "-2000000"],
        [0, "0"],
        [2147483647, "1vvvvvv"],
        [2147483648, "2000000"],
        [8640000000000000, "7li131do000"],
        [NaN, "NaN"],
      ] as const) {
        const stat = {
          ctime: new Date(0),
          mtime: new Date(ms),
          ino: 0,
          size: 1,
        };
        assert.strictEqual(etag(stat), `W/"1~${expected}"`);
      }
    });
  });

  describe('with "weak" option', function () {
    describe('when "false"', function () {
      it("should generate a strong ETag for a string", function () {
        assert.strictEqual(
          etag("", { weak: false }),
          '"0~47DEQpj8HBSa-_TImW-5JCeuQeRkm5NMpJWZG3hSuFU"',
        );
        assert.strictEqual(
          etag("beep boop", { weak: false }),
          '"9~kOpojiddWAVnMlAySStZe8dyIcYkk-djMLhd3aGR73w"',
        );
        assert.strictEqual(
          etag(str5kb, { weak: false }),
          '"500~5LnbD3U9_YHDcyuPVi5-ICAvez7H2P0q8c7w8MgyK1c"',
        );
      });

      it("should generate a strong ETag for a Buffer", function () {
        assert.strictEqual(
          etag(Buffer.alloc(0), { weak: false }),
          '"0~47DEQpj8HBSa-_TImW-5JCeuQeRkm5NMpJWZG3hSuFU"',
        );
        assert.strictEqual(
          etag(Buffer.from([1, 2, 3]), { weak: false }),
          '"3~A5BYxvLAy0ksUzsKTRTvd8wPeKvMztUofYShogEc-4E"',
        );
        assert.strictEqual(
          etag(buf5kb, { weak: false }),
          '"500~5LnbD3U9_YHDcyuPVi5-ICAvez7H2P0q8c7w8MgyK1c"',
        );
      });

      it("should generate a strong ETag for fs.Stats", function () {
        assert.ok(!isweak(etag(fs.statSync(filename), { weak: false })));
      });
    });

    describe('when "true"', function () {
      it("should generate a weak ETag for a string", function () {
        assert.strictEqual(
          etag("", { weak: true }),
          'W/"0~47DEQpj8HBSa-_TImW-5JCeuQeRkm5NMpJWZG3hSuFU"',
        );
        assert.strictEqual(
          etag("beep boop", { weak: true }),
          'W/"9~kOpojiddWAVnMlAySStZe8dyIcYkk-djMLhd3aGR73w"',
        );
        assert.strictEqual(
          etag(str5kb, { weak: true }),
          'W/"500~5LnbD3U9_YHDcyuPVi5-ICAvez7H2P0q8c7w8MgyK1c"',
        );
      });

      it("should generate a weak ETag for a Buffer", function () {
        assert.strictEqual(
          etag(Buffer.alloc(0), { weak: true }),
          'W/"0~47DEQpj8HBSa-_TImW-5JCeuQeRkm5NMpJWZG3hSuFU"',
        );
        assert.strictEqual(
          etag(Buffer.from([1, 2, 3]), { weak: true }),
          'W/"3~A5BYxvLAy0ksUzsKTRTvd8wPeKvMztUofYShogEc-4E"',
        );
        assert.strictEqual(
          etag(buf5kb, { weak: true }),
          'W/"500~5LnbD3U9_YHDcyuPVi5-ICAvez7H2P0q8c7w8MgyK1c"',
        );
      });

      it("should generate a weak ETag for fs.Stats", function () {
        assert.ok(isweak(etag(fs.statSync(filename), { weak: true })));
      });

      it("should generate different ETags for different strings", function () {
        assert.notStrictEqual(
          etag("plumless", { weak: true }),
          etag("buckeroo", { weak: true }),
        );
      });
    });
  });
});

function isweak(etag: string) {
  const weak = /^(W\/|)"([^"]+)"/.exec(etag);

  if (weak === null) {
    throw new Error("invalid ETag: " + etag);
  }

  return weak[1] === "W/";
}

describe("runtime validation", () => {
  for (const entity of [undefined, null]) {
    it(`rejects ${entity}`, () => {
      // @ts-expect-error Invalid JavaScript input.
      assert.throws(() => etag(entity), /argument entity is required/);
    });
  }

  it("uses the default strength for non-boolean weak options", () => {
    // @ts-expect-error Non-boolean options from JavaScript callers.
    assert.equal(etag("beep boop", { weak: "true" }), etag("beep boop"));
    const stat = fs.statSync(filename);
    // @ts-expect-error Non-boolean options from JavaScript callers.
    assert.equal(etag(stat, { weak: 0 }), etag(stat));
  });

  it("supports dates from another realm", async () => {
    const { runInNewContext } = await import("node:vm");
    const stat = runInNewContext(
      '({ ctime: new Date("2014-09-01T14:52:07Z"), mtime: new Date("2014-09-01T14:52:07Z"), ino: 0, size: 3027 })',
    );
    assert.equal(etag(stat), 'W/"2uj~190or76eo"');
  });
});
