// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

/**
 * Requirements
 * 1 - Same instance should be shared across the application => SingleTon Class
 * 2 - Should expose methods to get Single Feature flag value
 * 3 - Should expose methods to set the default value for a feature flag
 * 4 - If a default value is set once, the same should not be reset if some other file is requesting that same flag.
 * 5 - Implement a functionality when if settings have changes on the BE side, then all the components listing to this SDK should be updated with new values.
 * 6 - Implement the caching mechanism in which if the data is stale (> 5seconds) ,
 *    6a - Fetch data again from BE.
 *    6b - Implement it in a way, that if a default value was set, that will remain set.
 */

const fetchFeatureFlagsDataFromApi = () => {
  console.log("api called");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        isPaymentsEnabled: true,
        isBottomBarEnabled: false,
        isSearchEnabled: true,
      });
    }, 100);
  });
};

async function waitFor(time) {
  return new Promise((res) => {
    setTimeout(() => {
      console.log("wait over");
      res();
    }, time);
  });
}

class FeatureFlag {
  #lastFetchedAt;

  constructor(cacheTime = 3000) {
    if (FeatureFlag.instance) {
      return FeatureFlag.instance;
    }
    FeatureFlag.instance = this;
    this.cacheTime = cacheTime;
    this.settings = null;
  }

  hasCacheExpired() {
    if (!this.#lastFetchedAt) {
      return false;
    }

    if (this.#lastFetchedAt + this.cacheTime < Date.now()) {
      return true;
    }
    return false;
  }

  updateFetureFlagState(apiResponse) {
    this.#lastFetchedAt = Date.now();
    this.settings = {
      apiResponse,
      defaultFlagsData: {
        ...(!this.settings ? apiResponse : this.settings.defaultFlagsData),
      },
    };
  }

  async #checkAndInitiateSettings() {
    const isCacheInvalid = this.hasCacheExpired();
    if (!this.settings || isCacheInvalid) {
      const apiResponse = await fetchFeatureFlagsDataFromApi();
      this.updateFetureFlagState(apiResponse);
    }
    return;
  }

  async hasFeature(key) {
    await this.#checkAndInitiateSettings();
    return this.settings.defaultFlagsData[key];
  }

  async setDefaultFeature(key, value) {
    await this.#checkAndInitiateSettings();
    this.settings.defaultFlagsData[key] = value;
  }
}

//*****************     Testing    *************************/

// Tried to create two instance
const flags = new FeatureFlag();
const flags2 = new FeatureFlag();

// check if both are equal or not => singleton check
console.log("are instances same?", flags === flags2);

console.log(await flags.hasFeature("isPaymentsEnabled"));

await flags.setDefaultFeature("isPaymentsEnabled", false);

console.log(await flags2.hasFeature("isPaymentsEnabled"));

await waitFor(4 * 1000);

console.log(await flags.hasFeature("isPaymentsEnabled"));
