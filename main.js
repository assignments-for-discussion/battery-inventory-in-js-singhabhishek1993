const assert = require('assert');

function countBatteriesByHealth(presentCapacities) {
  const ratedCapacity = 120;
  let healthyCount = 0;
  let exchangeCount = 0;
  let failedCount = 0;

  for (const presentCapacity of presentCapacities) {
    const soh = (presentCapacity / ratedCapacity) * 100;

    if (soh > 80) {
      healthyCount++;
    } else if (soh >= 62) {
      exchangeCount++;
    } else {
      failedCount++;
    }
  }

  return {
    healthy: healthyCount,
    exchange: exchangeCount,
    failed: failedCount,
  };
}

function testBucketingByHealth() {
  console.log('Counting batteries by SoH...');
  const presentCapacities = [113, 116, 80, 95, 92, 70];
  const counts = countBatteriesByHealth(presentCapacities);
  
  assert.strictEqual(counts.healthy, 2, "Healthy count");
  assert.strictEqual(counts.exchange, 3, "Exchange count");
  assert.strictEqual(counts.failed, 1, "Failed count");

  console.log("Done counting :)");
}

testBucketingByHealth();
