import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import { File, Paths } from "expo-file-system";

export default function Generate() {
  const [text, setText] = useState("Hello QR");
  const [value, setValue] = useState("Hello QR");

  const qrRef = useRef(null);

  const generateQR = () => {
    if (!text.trim()) {
      Alert.alert("Warning", "Please enter some text.");
      return;
    }

    setValue(text);
  };






  const shareQR = async () => {
    try {
      const uri = await qrRef.current.capture();

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Sharing is not available.");
        return;
      }

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to share QR.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#0f172a" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 26,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          QR Generator
        </Text>

        <ViewShot
          ref={qrRef}
          options={{
            format: "png",
            quality: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 15,
              elevation: 5,
            }}
          >
            <QRCode value={value} size={220} />
          </View>
        </ViewShot>

        <TextInput
          placeholder="Enter text..."
          placeholderTextColor="#94a3b8"
          value={text}
          onChangeText={setText}
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: "#334155",
            color: "#fff",
            padding: 14,
            borderRadius: 10,
            marginTop: 25,
            fontSize: 16,
          }}
        />

        <TouchableOpacity
          onPress={generateQR}
          style={{
            width: "100%",
            backgroundColor: "#38bdf8",
            padding: 15,
            borderRadius: 10,
            marginTop: 15,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#000",
            }}
          >
            Generate QR
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 20,
          }}
        >
         
        

          {/* Share */}
          <TouchableOpacity
            onPress={shareQR}
            style={{
              width: "100%",
              backgroundColor: "#16a34a",
              padding: 14,
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="share"
              size={22}
              color="white"
            />
            <Text
              style={{
                color: "white",
                marginLeft: 8,
                fontWeight: "bold",
              }}
            >
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}