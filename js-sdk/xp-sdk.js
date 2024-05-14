/**
 * Create an SDK for XP
 *  - takes an experiment ID and makes an API call to fetch the experiment data
 *  - takes an stream of deviceIds and
 *    - Assigns user based on the config came from the experiement Data
 *  - If a device id is already present then return the variant value directly
 */

// MOCK API calls

class XP {
  deviceIdToVariantMap = new Map();
  variantTypes = {};

  constructor() {
    if (XP.instance) {
      return XP.instance;
    }

    XP.instance = this;
  }

  createBuckets(experimentArray) {
    experimentArray.map(({ bucketId, percentage }) => {
      this.variantTypes[bucketId] = {
        usersData: [],
        variantPercentage: percentage,
      };
    });

    console.log("debugger", this.variantTypes);
  }

  async _fetchAndSaveExperimentData(experiementId) {
    const response = await fetchExperiemntData(experiementId);
    this.createBuckets(response);
  }

  async assignUser(experiementId, deviceId) {
    await this._fetchAndSaveExperimentData(experiementId);
  }
}

const xpInstance = new XP();

xpInstance.assignUser("randomUserId", "");

const MOCK_EXPERIMENT_DATA = [
  {
    id: "1",
    name: "control",
    bucketId: "Control",
    percentage: "50%",
  },
  {
    id: "2",
    name: "active",
    bucketId: "Active",
    percentage: "20%",
  },
  {
    id: "3",
    name: "in-active",
    bucketId: "InActive",
    percentage: "30%",
  },
];

function fetchExperiemntData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(MOCK_EXPERIMENT_DATA);
    }, 100);
  });
}
