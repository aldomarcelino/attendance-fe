import React, { useEffect } from "react";
import { StyleSheet, Text, Linking, View, Pressable } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { Stack, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import CameraIcon from "@/assets/icon/camera-icon.svg";
import ArrowIcon from "@/assets/icon/arrow-left-icon-white.svg";

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
  // if (device == null) return <Text>bebek gorengggg</Text>;
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1, position: "relative" }}>
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
          style={styles.head}
        >
          <View style={styles.wrapTitle}>
            <Pressable style={styles.arrowIcon} onPress={() => router.back()}>
              <ArrowIcon height={24} width={24} />
            </Pressable>
            <Text style={styles.title}>Kehadiran</Text>
          </View>
        </LinearGradient>
        {/* <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={false}
        /> */}
        <Pressable
          style={{
            position: "absolute",
            bottom: 50,
            alignSelf: "center",
          }}
          onPress={() => router.replace("success-face")}
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
    </>
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
  head: {
    width: "100%",
    height: 109,
  },
  wrapTitle: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 69,
  },
  title: { fontFamily: "KodchasanBold", fontSize: 18, color: "#fff" },
  arrowIcon: {
    position: "absolute",
    left: "5%",
  },
});
