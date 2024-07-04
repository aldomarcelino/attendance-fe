import React, { useState } from "react";
// import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import MySplashScreen from "./splash-screen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Kodchasan: require("../assets/fonts/kodchasan.ttf"),
    KodchasanBold: require("../assets/fonts/kodchasan-bold.ttf"),
    Opensans: require("../assets/fonts/opensans.ttf"),
    OpensansBold: require("../assets/fonts/opensans-bold.ttf"),
    Mulish: require("../assets/fonts/mulish.ttf"),
    MulishBold: require("../assets/fonts/mulish-bold.ttf"),
  });
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (showSplash) {
    return <MySplashScreen />;
  }

  return (
    <Provider store={store}>
      {/* <ThemeProvider value={DefaultTheme}> */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      {/* </ThemeProvider> */}
    </Provider>
  );
}
