import React, { useState } from "react";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { router } from "expo-router";
import { getLocalStorage } from "@/utils/AsyncStorage";
import MySplashScreen from "./splash-screen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [isLogin, setIsLogin] = useState(false);
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
    getLocalStorage("token")
      .then((v) => {
        if (v) setIsLogin(true);
      })
      .catch((error) => {
        console.error("Error retrieving item:", error);
      });

    setTimeout(() => {
      setShowSplash(false);
      if (loaded && !isLogin) {
        router.push("login");
      }
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
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
