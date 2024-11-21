import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useLoadNews } from "../../hooks/useLoadNews";
import { FullLoaderScreen } from "@/common/screens/full_loader_screen";
import { FullRetryScreen } from "@/common/screens/full_retry_screen";
import { APP_THEME } from "@/common/theme/theme";
import { NewPost } from "../components/new_post";
import { ReactionsButtons } from "../components/reactions_buttons";
import { useLikeDislike } from "../../hooks/useLikeDislike";
import { ReactionEntity } from "../../domain/entities/reaction_entity";
import { isLoading } from "expo-font";

interface SeeNewDetailsProps {
  newId: number;
}

/**
 * Pantalla que muestra los detalles de una noticia
 * @param newId Identificador de la noticia
 * @returns Pantalla con los detalles de la noticia
 */
export const SeeNewDetailsScreen = ({ newId }: SeeNewDetailsProps) => {
  const { query } = useLoadNews(newId);
  const {
    reactions,
    isLoading: isReactionsLoading,
    handleReaction,
  } = useLikeDislike(newId);

  console.log("newId recibido:", newId);

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
      <ReactionsButtons
        likes={reactions?.likes || 0}
        dislikes={reactions?.dislikes || 0}
        userReaction={reactions?.reactionType}
        onReaction={handleReaction}
        isLoading={isReactionsLoading}
      />
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
