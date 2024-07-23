import {
  Image,
  StyleSheet,
  Platform,
  Button,
  TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const handleMenuPress = (item: string) => {
    alert(`Selected item: ${item}`);
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Home page</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuPress("Home")}
        >
          <ThemedText>Home</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuPress("Abuot")}
        >
          <ThemedText>Abuot</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuPress("Login")}
        >
          <ThemedText>Login</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    marginTop: 16,
    gap: 8,
  },
  menuItem: {
    padding: 16,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
