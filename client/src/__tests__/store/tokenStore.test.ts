import { tokenStore } from "../../store/tokenStore";

describe("tokenStore", () => {
  beforeEach(() => {
    tokenStore.clearToken();
  });

  it("returns null when no token is set", () => {
    expect(tokenStore.getToken()).toBeNull();
  });

  it("stores and retrieves a token", () => {
    const token = "test-access-token";
    tokenStore.setToken(token);
    expect(tokenStore.getToken()).toBe(token);
  });

  it("clears the token", () => {
    tokenStore.setToken("test-token");
    tokenStore.clearToken();
    expect(tokenStore.getToken()).toBeNull();
  });

  it("overwrites existing token", () => {
    tokenStore.setToken("first-token");
    tokenStore.setToken("second-token");
    expect(tokenStore.getToken()).toBe("second-token");
  });

  it("can set token to null", () => {
    tokenStore.setToken("test-token");
    tokenStore.setToken(null);
    expect(tokenStore.getToken()).toBeNull();
  });
});
