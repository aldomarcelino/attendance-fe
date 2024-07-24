import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import {
  Frame,
  PhotoFile,
  Camera as VisionCamera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { Stack, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import CameraIcon from "@/assets/icon/camera-icon.svg";
import ArrowIcon from "@/assets/icon/arrow-left-icon-white.svg";
import ErrorImage from "@/assets/images/error.svg";
import { useIsFocused } from "@react-navigation/native";
import { useAppState } from "@react-native-community/hooks";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FaceDetectionOptions,
  Face,
  Camera,
} from "react-native-vision-camera-face-detector";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ErrorModals from "./components/error-modal";
import Loading from "./components/loading";

export default function TabTwoScreen() {
  const device = useCameraDevice("front");
  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === "active";
  const camera = useRef<VisionCamera>(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const [photo, setPhoto] = useState<PhotoFile>();
  const [isPass, setIsPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [status, setStatus] = useState("");
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    performanceMode: "fast",
    classificationMode: "all",
  }).current;
  const aFaceW = useSharedValue(0);
  const aFaceH = useSharedValue(0);
  const aFaceX = useSharedValue(0);
  const aFaceY = useSharedValue(0);
  const aRot = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: isPass ? "white" : "#E7031E",
    width: withTiming(aFaceW.value, {
      duration: 100,
    }),
    height: withTiming(aFaceH.value, {
      duration: 100,
    }),
    left: withTiming(aFaceX.value, {
      duration: 100,
    }),
    top: withTiming(aFaceY.value, {
      duration: 100,
    }),
    transform: [
      {
        rotate: `${aRot.value}deg`,
      },
    ],
  }));

  const handleTakePict = async () => {
    try {
      const picture = await camera.current?.takePhoto();
      // Add a small delay before setting the photo to ensure it's ready
      setTimeout(() => setPhoto(picture), 100);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCameraMountError = (error: any) => {
    console.error("camera mount error", error);
  };

  const handleFacesDetected = (faces: Face[], frame: Frame): void => {
    console.log("faces", faces.length, "frame", frame.toString());
    // if no faces are detected we do nothing
    setIsPass(faces.length ? true : false);
    if (Object.keys(faces).length <= 0) return;

    const { bounds } = faces[0];
    const { width, height, x, y } = bounds;
    aFaceW.value = width;
    aFaceH.value = height;
    aFaceX.value = x;
    aFaceY.value = y;
  };

  const handleUiRotation = (rotation: number) => {
    aRot.value = rotation;
  };

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      setCount(count + 1);
      setLoading(false);
      if (count == 0) {
        setOpenErrorModal(true);
        setStatus("network");
      } else if (count == 1) {
        setOpenErrorModal(true);
        setStatus("image");
      } else router.push("success-face");
    }, 2000);
  };

  useEffect(() => {
    const getPermision = async () => {
      if (hasPermission) return;
      const permision = await requestPermission();
      if (!permision) await Linking.openSettings();
    };
    getPermision();
  }, []);

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
      {loading && <Loading />}

      <Stack.Screen
        options={{
          headerTitle: "Ambil Foto Selfi",
          headerLeft: () => (
            <Pressable
              style={styles.arrowIcon}
              onPress={() => router.push("/")}
            >
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
          isActive={isActive && !photo}
          device={device}
          onError={handleCameraMountError}
          faceDetectionCallback={handleFacesDetected}
          outputOrientation={"device"}
          onUIRotationChanged={handleUiRotation}
          faceDetectionOptions={{
            ...faceDetectionOptions,
            autoScale: true,
          }}
          photo={true}
        />

        <Animated.View style={animatedStyle} />

        {photo ? (
          <>
            <Image
              source={{ uri: `file://${photo.path}` }}
              style={styles.photos}
            />

            <View style={styles.btnWrap} />
            <View style={styles.secondWrap}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 11,
                  marginTop: 39,
                }}
              >
                <TouchableOpacity
                  style={{
                    ...styles.button,
                    backgroundColor: "white",
                  }}
                  onPress={() => {
                    setPhoto(undefined);
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
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit}>
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
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.btnWrap} />
            <TouchableOpacity
              style={styles.secondWrap}
              onPress={handleTakePict}
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
                style={styles.btn}
              >
                <CameraIcon width={32} height={32} />
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Error Modal  */}
      <ErrorModals
        status={status}
        visible={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
      />
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
    bottom: 47,
    zIndex: 3,
  },
  btnWrap: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "black",
    width: "100%",
    height: 150,
    alignItems: "center",
    opacity: 0.8,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
  },
  secondWrap: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 150,
    alignItems: "center",
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
});
