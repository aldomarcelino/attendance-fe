import { StyleSheet, Image, Platform, Text, Linking } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { useEffect } from "react";

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
    <>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
      {/* <Text>Maukkkfjasldjfasd jfasldjfsd</Text> */}
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
});
