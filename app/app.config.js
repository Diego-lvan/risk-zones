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
        mapBox: {
          apiKey: process.env.EXPO_PUBLIC_MAPSBOX_KEY,
        },
      },
    },
    ios: {
      ...config.ios,
      config: {
        googleMapsApiKey: process.env.EXPO_PUBLIC_MAPS_KEY,
        mapBoxApiKey: process.env.EXPO_PUBLIC_MAPSBOX_KEY,
      },
    },
  };
};
