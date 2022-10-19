const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal hash when given input as null", () => {
    let data = null;
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe("0");
});
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal hash when given input as undefined", () => {
    let data;
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe("0");
});
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given empty object input", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(trivialKey).toBe("0");
});
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal hash when given input as object", () => {
    const trivialKey = deterministicPartitionKey({"a": "a"});
    expect(trivialKey).toBe("62416926c6a81166f1a510b043d4df8442d1518ea24e6788b8de6d81c495a914e6bff87fa30e7700268a17fff9773f17ef9e0cf3bed000c9617eb09c9415881a");
});
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal hash when given input as string", () => {
    const trivialKey = deterministicPartitionKey("a");
    expect(trivialKey).toBe("c324156fcca3e7cb5ac7b8cd4fec155b24274972ef0bb77a34cedbf8de7d3317cf1126cc8c3924e3fb19b058a37d2bf2cd2e6563873e87de55010d3a13f76f51");
});
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal hash when given input as number", () => {
    const trivialKey = deterministicPartitionKey(1);
    expect(trivialKey).toBe("0");
});
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal hash value less than 256", () => {
    const trivialKey = deterministicPartitionKey("b");
    expect(trivialKey.length).toBeLessThanOrEqual(256);
});
});


