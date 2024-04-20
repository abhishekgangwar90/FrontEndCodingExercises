/**
 * Requirements
 * 1 - Same instance should be shared across the application => SingleTon Class
 * 2 - Should expose methods to get Single Feature flag value
 * 3 - Should expose methods to set the default value for a feature flag
 * 4 - If a default value is set once, the same should not be reset if some other file is requesting that same flag.
 * 5 - Implement a functionality when if settings have changes on the BE side, then all the components listing to this SDK should be updated with new values.
 * 6 - If a new api call has happened to fetch the settings from BE,
 *    6a - Implement it in a way, if default value is set for a featureFlag, that should not change.
 *    6b - Implement it in a way, that the whole settings data should be refreshed.
 */

const fetchFeatureFlagsDataFromApi = () => {
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

class FeatureFlag {
  constructor() {
    if (FeatureFlag.instance) {
      return FeatureFlag.instance;
    }
    FeatureFlag.instance = this;
    this.settings = null;
  }

  async #checkAndInitiateSettings() {
    if (!this.settings) {
      const apiResponse = await fetchFeatureFlagsDataFromApi();
      this.settings = {
        apiResponse,
        flagsData: { ...apiResponse },
      };
    }
    return;
  }

  async hasFeature(key) {
    await this.#checkAndInitiateSettings();
    return this.settings.flagsData[key];
  }

  async setDefaultFeature(key, value) {
    await this.#checkAndInitiateSettings();
    this.settings.flagsData[key] = value;
  }
}

//*****************     Testing    *************************/

// tried to create two instance
const flags = new FeatureFlag();
const flags2 = new FeatureFlag();

// check if both are equal or not => singleton check
console.log("are instances same?", flags === flags2);

// checking the feature flag
console.log(
  "Before setting the default value isPaymentsEnabled",
  await flags.hasFeature("isPaymentsEnabled")
);

// setting the default value
console.log(
  "setting the default value isPaymentsEnabled",
  await flags.setDefaultFeature("isPaymentsEnabled", false)
);

console.log(
  "After setting the default value isPaymentsEnabled",
  await flags.hasFeature("isPaymentsEnabled")
);

console.log(
  "After setting the default value checking for another flag isPaymentsEnabled",
  await flags2.hasFeature("isPaymentsEnabled")
);
