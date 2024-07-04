import { StyleSheet, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const Loading = () => {
  return (
    <View style={styles.loadBg}>
      <View style={styles.background} />
      <View style={styles.wrap}>
        <LottieView
          source={require("@/assets/animation/animation-loading.json")}
          style={styles.loadingIcon}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadBg: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 999,
  },
  background: {
    position: "absolute",
    backgroundColor: "#000000",
    width: "100%",
    height: "100%",
    zIndex: 1000,
    opacity: 0.4,
  },
  wrap: {
    borderRadius: 64,
    backgroundColor: "#fff",
    zIndex: 1001,
  },
  loadingIcon: {
    width: 64,
    height: 64,
  },
});
