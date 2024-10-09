export default ({ config }) => {
  return {
    ...config,
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
  };
};
