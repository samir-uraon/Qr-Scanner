import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 28, color: "white", fontWeight: "bold" }}>
        🔥 QR Master App
      </Text>

      <Text style={{ color: "#94a3b8", marginTop: 10, textAlign: "center" }}>
        Scan & Generate QR codes instantly
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/scan")}
        style={btnStyle}
      >
      <Text style={btnText}>🔍 Scan QR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/generate")}
        style={btnStyle}
      >
        <Text style={btnText}>🔳 Generate QR</Text>
      </TouchableOpacity>
    </View>
  );
}

const btnStyle = {
  marginTop: 20,
  backgroundColor: "#38bdf8",
  padding: 15,
  width: "80%",
  borderRadius: 12,
  alignItems: "center",
};

const btnText = {
  color: "#0f172a",
  fontWeight: "bold",
};