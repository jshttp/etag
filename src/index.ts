/*!
 * etag
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */

import { Buffer } from "node:buffer";
import { createHash, hash } from "node:crypto";

// Above this size, one-shot hashing no longer improves performance.
const ONESHOT_MAX_LENGTH = 100 * 1024;

/** Options for generating an entity tag. */
export interface Options {
  /** Override the default: weak for file stats, strong for strings and buffers. */
  weak?: boolean;
}

/** Structural type for file stats. */
export interface StatsLike<T extends number | bigint> {
  ctime: Date;
  mtime: Date;
  ino: T;
  size: T;
}

export type FileStats = StatsLike<number> | StatsLike<bigint>;

/** Create an ETag for a string, buffer, or file stats object. */
export function etag(
  entity: string | Buffer | FileStats,
  options?: Options,
): string {
  if (entity == null) {
    throw new TypeError("argument entity is required");
  }

  const isBody = typeof entity === "string" || Buffer.isBuffer(entity);
  const weak = typeof options?.weak === "boolean" ? options.weak : !isBody;
  const tag = isBody ? entitytag(entity) : stattag(entity);

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

/** Generate a tag from the file size and modification time. */
function stattag(stat: FileStats): string {
  const mtime = stat.mtime.getTime().toString(16);
  const size = stat.size.toString(16);
  return '"' + size + "-" + mtime + '"';
}
