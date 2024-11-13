import { RateLightedStreetScreen } from "@/src/lighted_streets/ui/screens/rate_lighted_street_screen";
import { useLocalSearchParams } from "expo-router";

export default function SeeNewDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <RateLightedStreetScreen streedId={id} />;
}
