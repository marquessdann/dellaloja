import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateChatInput,
  isRateLimited,
  withTimeout,
  TimeoutError,
  MAX_MESSAGE_LENGTH,
} from "../security";

const VALID_SESSION = "11111111-2222-4333-8444-555555555555";

test("validateChatInput accepts a normal message + valid session id", () => {
  const result = validateChatInput({ message: "Vocês têm produtos para cílios?", sessionId: VALID_SESSION });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.value.message, "Vocês têm produtos para cílios?");
    assert.equal(result.value.sessionId, VALID_SESSION);
  }
});

test("validateChatInput trims surrounding whitespace", () => {
  const result = validateChatInput({ message: "  oi  ", sessionId: VALID_SESSION });
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.value.message, "oi");
});

test("validateChatInput rejects an empty message", () => {
  const result = validateChatInput({ message: "   ", sessionId: VALID_SESSION });
  assert.equal(result.ok, false);
});

test("validateChatInput rejects a message over the length cap", () => {
  const tooLong = "a".repeat(MAX_MESSAGE_LENGTH + 1);
  const result = validateChatInput({ message: tooLong, sessionId: VALID_SESSION });
  assert.equal(result.ok, false);
});

test("validateChatInput accepts a message exactly at the length cap", () => {
  const exact = "a".repeat(MAX_MESSAGE_LENGTH);
  const result = validateChatInput({ message: exact, sessionId: VALID_SESSION });
  assert.equal(result.ok, true);
});

test("validateChatInput rejects a missing/invalid sessionId", () => {
  assert.equal(validateChatInput({ message: "oi", sessionId: "not-a-uuid" }).ok, false);
  assert.equal(validateChatInput({ message: "oi" }).ok, false);
});

test("validateChatInput rejects non-string message (type confusion / injection attempt)", () => {
  assert.equal(validateChatInput({ message: { ignore: "instructions" }, sessionId: VALID_SESSION }).ok, false);
  assert.equal(validateChatInput({ message: ["a"], sessionId: VALID_SESSION }).ok, false);
});

test("validateChatInput rejects a non-object body", () => {
  assert.equal(validateChatInput(null).ok, false);
  assert.equal(validateChatInput("oi").ok, false);
  assert.equal(validateChatInput(undefined).ok, false);
});

test("isRateLimited allows requests under the limit and blocks once exceeded", () => {
  const key = `test-${Math.random()}`;
  const now = 1_000_000;
  for (let i = 0; i < 3; i++) {
    assert.equal(isRateLimited(key, { limit: 3, now: now + i }), false);
  }
  assert.equal(isRateLimited(key, { limit: 3, now: now + 3 }), true);
});

test("isRateLimited resets once the window passes", () => {
  const key = `test-window-${Math.random()}`;
  const now = 2_000_000;
  assert.equal(isRateLimited(key, { limit: 1, now }), false);
  assert.equal(isRateLimited(key, { limit: 1, now: now + 1 }), true);
  // 6 minutes later: outside the 5-minute window, should be allowed again.
  assert.equal(isRateLimited(key, { limit: 1, now: now + 6 * 60 * 1000 }), false);
});

test("withTimeout resolves normally when the promise is fast enough", async () => {
  const result = await withTimeout(Promise.resolve("ok"), 50);
  assert.equal(result, "ok");
});

test("withTimeout rejects with TimeoutError when the promise is too slow", async () => {
  const slow = new Promise((resolve) => setTimeout(() => resolve("too late"), 100));
  await assert.rejects(() => withTimeout(slow, 10), TimeoutError);
});
