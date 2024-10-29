import { View, Text, StyleSheet } from "react-native";
import { NewInfoEntity } from "../../domain/entities/see_new_entity";
import { APP_THEME } from "@/common/theme/theme";
import { DATE_FORMAT_OPTIONS } from "@/common/constants/date";

interface NewPostProps {
  newInfo: NewInfoEntity;
}

export const NewPost = ({
  newInfo: { title, createdAt, description },
}: NewPostProps) => {
  return (
    <View style={styles.newMainContainer}>
      <Text style={styles.newTitle} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.newCreatedAt} numberOfLines={1}>
        Publicado: {createdAt.toLocaleDateString("es-ES", DATE_FORMAT_OPTIONS)}
      </Text>
      <Text style={styles.newContent}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  newMainContainer: {
    padding: 20,
    backgroundColor: APP_THEME.colors.background,
    borderRadius: 12,
    borderWidth: 1,
    margin: 20,
    borderColor: APP_THEME.colors.tertiary,
    gap: 18,
    elevation: 10,
  },
  newTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  newCreatedAt: {
    fontSize: 15,
    color: APP_THEME.colors.tertiary,
    fontWeight: "bold",
  },
  newContent: {
    fontSize: 15,
    lineHeight: 25,
    letterSpacing: 0.5,
  },
});
