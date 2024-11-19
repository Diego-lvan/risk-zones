import { StyleSheet, ScrollView } from "react-native";
import { useLoadNews } from "../../hooks/useLoadNews";
import { FullLoaderScreen } from "@/common/screens/full_loader_screen";
import { FullRetryScreen } from "@/common/screens/full_retry_screen";
import { APP_THEME } from "@/common/theme/theme";
import { NewPost } from "../components/new_post";
import { ReactionsButtons } from "../components/reactions_buttons";
import { useLikeDislike } from "../../hooks/useLikeDislike";
import { ReactionEntity } from "../../domain/entities/reaction_entity";

interface SeeNewDetailsProps {
  newId: number;
  reactions: ReactionEntity;
}

/**
 * Pantalla que muestra los detalles de una noticia
 * @param newId Identificador de la noticia
 * @returns Pantalla con los detalles de la noticia
 */
export const SeeNewDetailsScreen = ({
  newId,
  reactions,
}: SeeNewDetailsProps) => {
  const { query } = useLoadNews(newId);
  const { queryReaction } = useLikeDislike(reactions);

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
      {queryReaction.data && (
        <ReactionsButtons reactionInfo={queryReaction.data} />
      )}
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
