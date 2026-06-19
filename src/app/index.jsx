import { View, Text, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🔳</Text>

      <Text style={styles.title}>QR Master</Text>

      <Text style={styles.subtitle}>
        Scan & Generate QR Codes
      </Text>

      <ActivityIndicator
        size="large"
        color="#38bdf8"
        style={{ marginTop: 30 }}
      />

      <Text style={styles.footer}>
        Powered by React Native
      </Text>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  logo: {
    fontSize: 90,
    marginBottom: 10,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#38bdf8",
  },

  subtitle: {
    color: "#94a3b8",
    marginTop: 10,
    fontSize: 16,
  },

  footer: {
    position: "absolute",
    bottom: 40,
    color: "#64748b",
    fontSize: 13,
  },
};