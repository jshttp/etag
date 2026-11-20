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
  /** Override the default: weak for file stats, strong for strings and ArrayBuffer views. */
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

/** Create an ETag for a string, ArrayBuffer view, or file stats object. */
export function etag(
  entity: string | NodeJS.ArrayBufferView | FileStats,
  options?: Options,
): string {
  if (entity == null) {
    throw new TypeError("argument entity is required");
  }

  const isBody = typeof entity === "string" || ArrayBuffer.isView(entity);
  const weak = typeof options?.weak === "boolean" ? options.weak : !isBody;
  const tag = isBody ? entitytag(entity) : stattag(entity);

  return weak ? `W/${tag}` : tag;
}

/** Generate a tag from the entity's byte length and hash. */
function entitytag(entity: string | NodeJS.ArrayBufferView): string {
  const length = Buffer.byteLength(entity);
  if (length === 0) {
    return '"0~47DEQpj8HBSa-_TImW-5JCeuQeRkm5NMpJWZG3hSuFU"';
  }

  const digest =
    length <= ONESHOT_MAX_LENGTH
      ? hash("sha256", entity, "base64url")
      : createHash("sha256").update(entity).digest("base64url");
  const size = length.toString(32);

  return `"${size}~${digest}"`;
}

/** Generate a tag from the file size and modification time. */
function stattag(stat: FileStats): string {
  const ms = stat.mtime.getTime();
  const mtime = Number.isSafeInteger(ms)
    ? BigInt(ms).toString(32)
    : ms.toString(32);
  const size = stat.size.toString(32);
  return `"${size}~${mtime}"`;
}
