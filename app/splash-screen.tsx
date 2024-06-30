import { Image, StyleSheet, Text, View, LayoutAnimation } from "react-native";
import React, { useEffect, useState } from "react";

const SplashScreen = () => {
  const [isActive, setisActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setisActive(true);
    }, 1000);
  }, []);

  return (
    <View
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      {isActive ? (
        <>
          <Image
            alt="App Logo"
            resizeMode="cover"
            style={styles.background}
            source={require("@/assets/images/splash-screen.png")}
          />
          <View style={styles.wrap}>
            <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.logo}
              source={require("@/assets/logo/transparent-logo-2.png")}
            />
            <Text style={styles.title}>SIPREMO</Text>
            <Text style={styles.subtitle}>For a better learning process!</Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.wrap}>
            <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.logoFirst}
              source={require("@/assets/logo/udinus-logo.png")}
            />
            <Text style={styles.titleFirst}>SIPREMO</Text>
            <Text style={styles.subtitleFirst}>
              For a better learning process!
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  wrap: {
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 90,
  },
  logoFirst: {
    width: 90,
    height: 90,
  },
  title: {
    fontFamily: "KodchasanBold",
    fontSize: 43,
    color: "#fff",
    letterSpacing: 9,
  },
  titleFirst: {
    fontFamily: "KodchasanBold",
    fontSize: 43,
    color: "#005B9C",
    letterSpacing: 9,
  },
  subtitle: {
    fontSize: 13,
    color: "#fff",
    textAlign: "center",
    fontFamily: "Opensans",
  },
  subtitleFirst: {
    fontSize: 13,
    textAlign: "center",
    fontFamily: "Opensans",
  },
});
