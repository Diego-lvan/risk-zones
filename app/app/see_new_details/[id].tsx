import { SeeNewDetailsScreen } from "@/src/news/ui/screens/see_new_details_screen";
import { useLocalSearchParams } from "expo-router";

export default function SeeNewDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <SeeNewDetailsScreen newId={parseInt(id)} />;
}
