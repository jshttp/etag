/*!
 * etag
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */

import { Buffer } from "node:buffer";
import { createHash, hash } from "node:crypto";
import { Stats } from "node:fs";

// Above this size, one-shot hashing no longer improves performance.
const ONESHOT_MAX_LENGTH = 100 * 1024;

/** Options for generating an entity tag. */
export interface Options {
  /** Override the default: weak for file stats, strong for strings and buffers. */
  weak?: boolean;
}

/** The fields required to recognize a file stats object. */
export interface StatsLike {
  ctime: Date;
  mtime: Date;
  ino: number;
  size: number;
}

/** Create an ETag for a string, buffer, or file stats object. */
export function etag(
  entity: string | Buffer | StatsLike,
  options?: Options,
): string {
  if (entity == null) {
    throw new TypeError("argument entity is required");
  }

  const isStats = isstats(entity);
  const weak =
    options && typeof options.weak === "boolean" ? options.weak : isStats;

  let tag: string;
  if (isStats) {
    tag = stattag(entity);
  } else {
    if (typeof entity !== "string" && !Buffer.isBuffer(entity)) {
      throw new TypeError(
        "argument entity must be string, Buffer, or fs.Stats",
      );
    }
    tag = entitytag(entity);
  }

  return weak ? "W/" + tag : tag;
}

/** Generate a tag from the entity's byte length and SHA-1 hash. */
function entitytag(entity: string | Buffer): string {
  if (entity.length === 0) {
    return '"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"';
  }

  const digest =
    entity.length <= ONESHOT_MAX_LENGTH
      ? hash("sha1", entity, "base64")
      : createHash("sha1").update(entity).digest("base64");
  const len =
    typeof entity === "string"
      ? Buffer.byteLength(entity, "utf8")
      : entity.length;

  return '"' + len.toString(16) + "-" + digest.substring(0, 27) + '"';
}

/** Recognize genuine and structurally compatible file stats. */
function isstats(obj: unknown): obj is StatsLike {
  if (obj instanceof Stats) return true;

  return (
    obj !== null &&
    typeof obj === "object" &&
    "ctime" in obj &&
    Object.prototype.toString.call(obj.ctime) === "[object Date]" &&
    "mtime" in obj &&
    Object.prototype.toString.call(obj.mtime) === "[object Date]" &&
    "ino" in obj &&
    typeof obj.ino === "number" &&
    "size" in obj &&
    typeof obj.size === "number"
  );
}

/** Generate a tag from the file size and modification time. */
function stattag(stat: StatsLike): string {
  const mtime = stat.mtime.getTime().toString(16);
  const size = stat.size.toString(16);
  return '"' + size + "-" + mtime + '"';
}
