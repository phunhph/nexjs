import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function TabTwoScreen() {
  const headerImage = (
    <Image
      source={{
        uri: "https://via.placeholder.com/640x480.png/008822?text=recusandae",
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );

  // Define the background colors for light and dark modes
  const headerBackgroundColor = {
    light: "#FFFFFF", // Color for light theme
    dark: "#000000", // Color for dark theme
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ParallaxScrollView
          headerImage={headerImage}
          headerBackgroundColor={headerBackgroundColor}
        ></ParallaxScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
