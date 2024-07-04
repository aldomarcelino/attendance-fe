import React, { useEffect } from "react";
import { StyleSheet, Text, Linking, View, Pressable } from "react-native";

import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { LinearGradient } from "expo-linear-gradient";
import CameraIcon from "@/assets/icon/camera-icon.svg";

export default function TabTwoScreen() {
  const device = useCameraDevice("front");
  const { hasPermission } = useCameraPermission();

  useEffect(() => {
    const getPermision = async () => {
      const permision = await Camera.requestCameraPermission();
      console.log("camera permision status " + permision);
      if (permision == "denied") await Linking.openSettings();
      else {
        const newCameraPermission = await Camera.requestCameraPermission();
        const newMicrophonePermission =
          await Camera.requestMicrophonePermission();
        console.log("2 camera permision status " + permision);
      }
    };
    getPermision();
  }, []);

  if (!hasPermission) return <Text>ikfasdjfsda jfasdan</Text>;
  if (device == null) return <Text>bebek gorengggg</Text>;
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={false}
      />
      <Pressable
        style={{
          position: "absolute",
          bottom: 50,
          alignSelf: "center",
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
          style={styles.btn}
        >
          <CameraIcon width={32} height={32} />
        </LinearGradient>
      </Pressable>
    </View>
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
  btn: {
    height: 64,
    width: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
