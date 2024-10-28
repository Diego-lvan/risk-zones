import { StyleSheet, ScrollView } from "react-native";
import { useLoadNews } from "../../hooks/useLoadNews";
import { FullLoaderScreen } from "@/common/screens/full_loader_screen";
import { FullRetryScreen } from "@/common/screens/full_retry_screen";
import { APP_THEME } from "@/common/theme/theme";
import { NewPost } from "../components/new_post";

interface SeeNewDetailsProps {
  newId: number;
}

export const SeeNewDetailsScreen = ({ newId }: SeeNewDetailsProps) => {
  const { query } = useLoadNews(newId);
  if (query.isLoading) {
    return <FullLoaderScreen />;
  }

  if (query.isError || !query.data) {
    return <FullRetryScreen retryCallback={query.refetch} />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.innerContainer}
    >
      <NewPost newInfo={query.data} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_THEME.colors.background,
  },
  innerContainer: {
    flex: 1,
  },
});
