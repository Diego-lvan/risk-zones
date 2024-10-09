export default ({ config }) => {
  return {
    ...config,
    expo: {
      ...config.expo,
      name: "Safe Zones",
      slug: "safezones",
    },
    android: {
      ...config.android,
      package: "com.tsp.safezones",
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_MAPS_KEY,
        },
      },
    },
    ios: {
      ...config.ios,
      config: {
        googleMapsApiKey: process.env.EXPO_PUBLIC_MAPS_KEY,
      },
    },
    expo: {
      extra: {
        eas: {
          projectId: "0483ce6e-1742-48e6-94d7-964a99ebea74",
        },
      },
    },
  };
};
