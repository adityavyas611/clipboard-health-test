const crypto = require("crypto");

const getCandidate = (event) => {
  if (event.hasOwnProperty("partitionKey")) {
    return event.partitionKey;
  }
  const data = JSON.stringify(event);
  return generateHash(data);
};

const getCandidateString = (event) => {
  const candidate = getCandidate(event);
  if (typeof candidate === "string") {
    return candidate;
  }
  return JSON.stringify(candidate);
};

const generateHash = (eventData) => {
  return crypto.createHash("sha3-512").update(eventData).digest("hex");
};

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    candidate = getCandidateString(event);

    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = generateHash(candidate);
    }
  }
  return candidate;
};
