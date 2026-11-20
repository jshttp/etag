import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import * as fs from "node:fs";
import { fileURLToPath } from "node:url";
import seedrandom from "seedrandom";
import { describe, it } from "vitest";
import { etag } from "./index.js";

const filename = fileURLToPath(import.meta.url);

const buf5kb = getbuffer(5 * 1024);
const str5kb = getbuffer(5 * 1024).toString();

describe("etag(entity)", function () {
  it("should require an entity", function () {
    // @ts-expect-error Missing entity is rejected at runtime.
    assert.throws(() => etag(), /argument entity is required/);
  });

  it("generates identical tags for strings and buffers around the hashing cutoff", () => {
    for (const [length, expected] of [
      [100 * 1024, '"4b000-q7sGvvvMDj+/XgEeCZ7QvdtBKVM"'],
      [100 * 1024 + 1, '"4b003-ePCNdQIk7ZliVhcOGjG81mvaTtY"'],
    ] as const) {
      const entity = "论".repeat(length);
      assert.equal(etag(entity), expected);
      assert.equal(etag(Buffer.from(entity)), expected);
    }
  });

  describe('when "entity" is a string', function () {
    it("should generate a strong ETag", function () {
      assert.strictEqual(etag("beep boop"), '"9-fINXV39R1PCo05OqGqr7KIY9lCE"');
    });

    it("should work containing Unicode", function () {
      assert.strictEqual(etag("论"), '"3-QkSKq8sXBjHL2tFAZknA2n6LYzM"');
      assert.strictEqual(
        etag("论", { weak: true }),
        'W/"3-QkSKq8sXBjHL2tFAZknA2n6LYzM"',
      );
    });

    it("should work for empty string", function () {
      assert.strictEqual(etag(""), '"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"');
    });
  });

  describe('when "entity" is a Buffer', function () {
    it("should generate a strong ETag", function () {
      assert.strictEqual(
        etag(Buffer.from([1, 2, 3])),
        '"3-cDeAcZjCKn0rCAc3HXY3eahP388"',
      );
    });

    it("should work for empty Buffer", function () {
      assert.strictEqual(
        etag(Buffer.alloc(0)),
        '"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"',
      );
    });
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
      const expected = `"${stat.size.toString(16)}-${stat.mtime.getTime().toString(16)}"`;

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

      assert.strictEqual(etag(stat), 'W/"20000000000001-14831b399d8"');
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
      assert.strictEqual(etag(fakeStat), 'W/"bd3-14831b399d8"');
    });
  });

  describe('with "weak" option', function () {
    describe('when "false"', function () {
      it("should generate a strong ETag for a string", function () {
        assert.strictEqual(
          etag("", { weak: false }),
          '"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"',
        );
        assert.strictEqual(
          etag("beep boop", { weak: false }),
          '"9-fINXV39R1PCo05OqGqr7KIY9lCE"',
        );
        assert.strictEqual(
          etag(str5kb, { weak: false }),
          '"1400-CH0oWYLQGHe/yDhUrMkMg3fIdVU"',
        );
      });

      it("should generate a strong ETag for a Buffer", function () {
        assert.strictEqual(
          etag(Buffer.alloc(0), { weak: false }),
          '"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"',
        );
        assert.strictEqual(
          etag(Buffer.from([1, 2, 3]), { weak: false }),
          '"3-cDeAcZjCKn0rCAc3HXY3eahP388"',
        );
        assert.strictEqual(
          etag(buf5kb, { weak: false }),
          '"1400-CH0oWYLQGHe/yDhUrMkMg3fIdVU"',
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
          'W/"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"',
        );
        assert.strictEqual(
          etag("beep boop", { weak: true }),
          'W/"9-fINXV39R1PCo05OqGqr7KIY9lCE"',
        );
        assert.strictEqual(
          etag(str5kb, { weak: true }),
          'W/"1400-CH0oWYLQGHe/yDhUrMkMg3fIdVU"',
        );
      });

      it("should generate a weak ETag for a Buffer", function () {
        assert.strictEqual(
          etag(Buffer.alloc(0), { weak: true }),
          'W/"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"',
        );
        assert.strictEqual(
          etag(Buffer.from([1, 2, 3]), { weak: true }),
          'W/"3-cDeAcZjCKn0rCAc3HXY3eahP388"',
        );
        assert.strictEqual(
          etag(buf5kb, { weak: true }),
          'W/"1400-CH0oWYLQGHe/yDhUrMkMg3fIdVU"',
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

function getbuffer(size: number) {
  const buffer = Buffer.alloc(size);
  const rng = seedrandom("etag test");

  for (let i = 0; i < buffer.length; i++) {
    buffer[i] = (rng() * 94 + 32) | 0;
  }

  return buffer;
}

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
    assert.equal(etag(stat), 'W/"bd3-14831b399d8"');
  });
});
