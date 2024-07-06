import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  Linking,
  View,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera";
import { Stack, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import CameraIcon from "@/assets/icon/camera-icon.svg";
import ArrowIcon from "@/assets/icon/arrow-left-icon-white.svg";
import ErrorImage from "@/assets/images/error.svg";
import { useIsFocused } from "@react-navigation/native";
import { useAppState } from "@react-native-community/hooks";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { runOnJS } from "react-native-reanimated";

export default function TabTwoScreen() {
  const device = useCameraDevice("front");
  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === "active";
  const camera = useRef<Camera>(null);
  const { hasPermission } = useCameraPermission();
  const [photo, setPhoto] = useState<PhotoFile>();
  // const [faces, setFaces] = useState<Face[]>([]);

  const handleTakePict = async () => {
    try {
      const picture = await camera.current?.takePhoto();
      console.log(picture, "<<<pict");
      // Add a small delay before setting the photo to ensure it's ready
      setTimeout(() => setPhoto(picture), 100);
    } catch (error) {
      console.log(error);
    }
  };

  // const frameProcessor = useFrameProcessor((frame) => {
  //   "worklet";
  //   const detectedFaces = scanFaces(frame);
  //   runOnJS(setFaces)(detectedFaces);
  // }, []);

  useEffect(() => {
    const getPermision = async () => {
      const permision = await Camera.requestCameraPermission();
      if (permision == "denied") await Linking.openSettings();
    };
    getPermision();
  }, [hasPermission]);

  if (!hasPermission)
    return (
      <View style={{ ...styles.wrapMessage, width: 325 }}>
        <View style={{ width: 225, alignSelf: "center" }}>
          <Text style={styles.message}>
            Coba Medapatkan Acces ke Prangkat Kamera
          </Text>
        </View>

        <ActivityIndicator style={{ marginVertical: 17 }} />

        <Text style={{ textAlign: "center", color: "#1F335B99" }}>
          Untuk melakukan presensi mahasiswa wajib memberikan foto wajah, jika
          gagal untuk memberikan athorize kamera pada aplikasi, buka setting
          secara manual
        </Text>
      </View>
    );
  if (!device)
    return (
      <View style={styles.wrapMessage}>
        <ErrorImage />
        <Text style={styles.message}>Perangkat Kamera Tidak Ditemukan</Text>
      </View>
    );
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Ambil Foto Selfi",
          headerLeft: () => (
            <Pressable style={styles.arrowIcon} onPress={() => router.back()}>
              <ArrowIcon height={20} width={20} />
            </Pressable>
          ),
          headerTitleStyle: {
            fontFamily: "KodchasanBold",
            fontSize: 18,
            color: "#fff",
          },
          headerTitleAlign: "center",
          headerBackground: () => (
            <View style={{ backgroundColor: "black", height: "100%" }} />
          ),
        }}
      />
      <View style={{ flex: 1, position: "relative" }}>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive && !photo}
          photo={true}
          // frameProcessor={frameProcessor}
        />

        {/* {faces.length > 0 && (
          <View style={styles.facesContainer}>
            {faces.map((face, index) => (
              <View key={index} style={styles.faceBox}>
                <Text>Face detected: {index + 1}</Text>
              </View>
            ))}
          </View>
        )} */}

        {photo ? (
          <>
            <Image
              source={{ uri: `file://${photo.path}` }}
              style={styles.photos}
            />

            <View style={styles.btnWrap}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 11,
                  marginTop: 39,
                }}
              >
                <Pressable
                  style={{
                    ...styles.button,
                    backgroundColor: "white",
                  }}
                >
                  <Ionicons
                    name="chevron-back-outline"
                    size={20}
                    color="black"
                  />
                  <Text style={{ ...styles.btnText, color: "#000000" }}>
                    Ambil Ulang
                  </Text>
                </Pressable>
                <Pressable>
                  <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
                    style={styles.button}
                  >
                    <Text style={styles.btnText}>Konfirmasi</Text>
                    <MaterialCommunityIcons
                      name="camera-iris"
                      size={24}
                      color="white"
                    />
                  </LinearGradient>
                </Pressable>
              </View>
            </View>
          </>
        ) : (
          <>
            <Pressable style={styles.btnWrap} onPress={handleTakePict}>
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
                style={styles.btn}
              >
                <CameraIcon width={32} height={32} />
              </LinearGradient>
            </Pressable>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 64,
    width: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 37,
  },
  btnWrap: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "black",
    width: "100%",
    height: 150,
    alignItems: "center",
    opacity: 0.9,
  },
  head: {
    width: "100%",
    height: 109,
    position: "absolute",
    top: 0,
    zIndex: 2,
  },
  title: { fontFamily: "KodchasanBold", fontSize: 18, color: "#fff" },
  arrowIcon: {
    position: "absolute",
    left: "5%",
  },
  message: {
    textAlign: "center",
    fontFamily: "KodchasanBold",
    fontSize: 18,
    color: "#1F335B",
  },
  wrapMessage: {
    width: "100%",
    alignSelf: "center",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  photos: {
    height: "100%",
    width: "100%",
  },
  button: {
    paddingHorizontal: 27,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    gap: 2,
  },
  btnText: {
    fontFamily: "KodchasanBold",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  facesContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  faceBox: {
    borderWidth: 2,
    borderColor: "red",
    padding: 10,
    margin: 5,
  },
});
