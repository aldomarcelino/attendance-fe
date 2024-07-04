import { StyleSheet, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const LoadingSecondary = () => {
  return (
    <View style={styles.loadBg}>
      <View style={styles.background} />

      <LottieView
        source={require("@/assets/animation/loading-secondary.json")}
        style={styles.loadingIcon}
        autoPlay
        loop
      />
    </View>
  );
};

export default LoadingSecondary;

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
    width: "100%",
    height: "100%",
    zIndex: 1000,
  },
  wrap: {
    borderRadius: 64,
    backgroundColor: "#fff",
    zIndex: 1001,
  },
  loadingIcon: {
    width: 100,
    height: 100,
  },
});
