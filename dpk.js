const crypto = require("crypto");
const stringify = require('stream-json-stringify');


exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event && Object.keys(event).length) {
    
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else{
      const data = JSON.stringify(event);
      candidate = generateHash(data);
    }

    if (candidate && typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }

    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = generateHash(candidate);
    }
  }
  return candidate;
};

const generateHash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
};