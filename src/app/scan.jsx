import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Clipboard from "expo-clipboard";
import { MaterialIcons } from "@expo/vector-icons";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState("");

  const copyResult = async () => {
    await Clipboard.setStringAsync(result);

  };

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "white" }}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>📷 Camera Permission Needed</Text>

        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {!scanned ? (
        <>
          <CameraView
            style={{ flex: 1 }}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={({ data }) => {
              setScanned(true);
              setResult(data);
            }}
          />

          <View style={styles.overlay}>
            <View style={styles.box} />
            <Text style={styles.scanText}>Align QR inside the box</Text>
          </View>
        </>
      ) : (
        <View style={styles.resultScreen}>
          <Text style={styles.success}>✅ Scan Successful</Text>

          <Text style={styles.label}>Scanned Result</Text>

          <View style={styles.resultCard}>
            <Text style={styles.resultText}>{result}</Text>

            <TouchableOpacity
              onPress={copyResult}
              style={styles.copyIcon}
            >
              <MaterialIcons
                name="content-copy"
                size={22}
                color="#38bdf8"
              />
            </TouchableOpacity>
          </View>

          {(result.startsWith("http://") ||
            result.startsWith("https://")) && (
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#22c55e" }]}
              onPress={() => Linking.openURL(result)}
            >
              <View style={styles.row}>
                <MaterialIcons
                  name="open-in-browser"
                  size={20}
                  color="#fff"
                />
                <Text style={styles.whiteBtnText}> Open Link</Text>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#2563eb" }]}
            onPress={copyResult}
          >
            <View style={styles.row}>
              <MaterialIcons
                name="content-copy"
                size={20}
                color="#fff"
              />
              <Text style={styles.whiteBtnText}> Copy Result</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setResult("");
              setScanned(false);
            }}
          >
            <View style={styles.row}>
              <MaterialIcons
                name="qr-code-scanner"
                size={20}
                color="#0f172a"
              />
              <Text style={styles.btnText}> Scan Again</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = {
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },

  text: {
    color: "white",
    fontSize: 18,
    marginBottom: 15,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: "#38bdf8",
    borderRadius: 20,
    backgroundColor: "rgba(56,189,248,0.05)",
  },

  scanText: {
    color: "white",
    marginTop: 20,
    fontSize: 16,
  },

  resultScreen: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  success: {
    color: "#22c55e",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  label: {
    color: "#94a3b8",
    fontSize: 16,
    marginBottom: 10,
  },

  resultCard: {
    width: "100%",
    backgroundColor: "#111827",
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
    position: "relative",
  },

  resultText: {
    color: "#38bdf8",
    textAlign: "center",
    fontSize: 16,
    paddingRight: 35,
  },

  copyIcon: {
    position: "absolute",
    right: 12,
    top: 12,
  },

  btn: {
    backgroundColor: "#38bdf8",
    paddingVertical: 13,
    borderRadius: 12,
    marginTop: 12,
    width: "100%",
    alignItems: "center",
  },

  btnText: {
    color: "#0f172a",
    fontWeight: "bold",
    fontSize: 16,
  },

  whiteBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
};