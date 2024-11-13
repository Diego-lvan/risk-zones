// Import the RateLightedStreetScreen component from the specified path
import { RateLightedStreetScreen } from "@/src/lighted_streets/ui/screens/rate_lighted_street_screen";

// Import the useLocalSearchParams hook from expo-router to access route parameters
import { useLocalSearchParams } from "expo-router";

// Define the SeeNewDetails component as the default export
export default function SeeNewDetails() {
  // Extract the 'id' parameter from the local search parameters
  const { id } = useLocalSearchParams<{ id: string }>();

  // Render the RateLightedStreetScreen component, passing the 'id' as the 'streetId' prop
  return <RateLightedStreetScreen streedId={id} />;
}
