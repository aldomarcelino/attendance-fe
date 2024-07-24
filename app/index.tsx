import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Stack, router } from "expo-router";
import axios from "axios";
import { getLocalStorage, setLocalStorage } from "@/utils/AsyncStorage";
import Loading from "./components/loading";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [form, setForm] = useState({
    nim: "",
    password: "",
  });
  const [borderNim, setBorderNim] = useState("#F5F4F1");
  const [borderPass, setBorderPass] = useState("#F5F4F1");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({ nim: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const clearError = () => {
    setErrors({ nim: "", password: "" });
    setError("");
  };

  const handleLogin = async () => {
    if (!form.nim) {
      setErrors({ ...errors, nim: "NIM tidak boleh kosong" });
      setBorderNim("#E7031E");
      return;
    }
    if (!form.password) {
      setErrors({ ...errors, password: "Password tidak boleh kosong" });
      setBorderPass("#E7031E");
      return;
    }
    clearError();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/user/signin`,
        form
      );
      if (response.status == 200) {
        setLocalStorage("access_token", response.data.access_token);
        setLoading(false);
        router.replace("(tabs)");
      }
    } catch (e: any) {
      setLoading(false);
      setError(e.response && e.response.data.message);
    }
  };

  useEffect(() => {
    const getSorage = async () => {
      try {
        const token = await getLocalStorage("access_token");
        if (token) router.replace("(tabs)");
      } catch (error) {
        console.error("Error retrieving item:", error);
      }
    };

    getSorage();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {loading && <Loading />}
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <KeyboardAwareScrollView>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={require("@/assets/logo/udinus-logo.png")}
          />
          <Text style={styles.title}>SIPREMO</Text>
          <Text style={styles.subtitle}>
            Clock Your Attendance with just a tap!
          </Text>
          <View style={styles.container}>
            <Text style={styles.message}>Selamat datang Dinusian</Text>
            <View style={{ maxWidth: 258, alignSelf: "center" }}>
              <Text style={styles.desc}>
                Silakan masukan NIM agar bisa masuk ke akun SIPREMO Anda dan
                mulai rasakan mudahnya presensi
              </Text>
            </View>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(nim) => {
                setForm({ ...form, nim });
                setBorderNim("#3E95CC");
                clearError();
              }}
              placeholder="NIM"
              placeholderTextColor="#1F335B99"
              style={{ ...styles.inputControl, borderColor: borderNim }}
              value={form.nim}
              onFocus={() => setBorderNim("#3E95CC")}
              onBlur={() => setBorderNim("#F5F4F1")}
            />
            {errors.nim && <Text style={styles.error}>{errors.nim}</Text>}
            <View style={{ position: "relative" }}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={(password) => {
                  setForm({ ...form, password });
                  clearError();
                  setBorderPass("#3E95CC");
                }}
                placeholder="Kata Sandi Anda"
                placeholderTextColor="#1F335B99"
                style={{ ...styles.inputControl, borderColor: borderPass }}
                secureTextEntry={!showPass}
                value={form.password}
                onFocus={() => setBorderPass("#3E95CC")}
                onBlur={() => setBorderPass("#F5F4F1")}
              />
              <Pressable
                style={{
                  position: "absolute",
                  top: 32,
                  right: 16,
                }}
                onPress={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <Ionicons name="eye-outline" size={24} color="#1F335B99" />
                ) : (
                  <Ionicons
                    name="eye-off-outline"
                    size={24}
                    color="#1F335B99"
                  />
                )}
              </Pressable>
            </View>

            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <Text style={styles.forgotText}>lupa kata sandi</Text>

            {error && (
              <View style={{ alignSelf: "center", marginBottom: 8 }}>
                <Text style={styles.generalError}>{error}</Text>
              </View>
            )}
            <TouchableOpacity onPress={handleLogin}>
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
                style={styles.btn}
              >
                <Text style={styles.btnText}>Masuk Akun SIPREMO</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: "#FFF",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0.1,
      height: 0.1,
    },
    shadowRadius: 0.2,
    shadowOpacity: 0.3,
    marginTop: 51,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 36,
  },
  title: {
    fontSize: 31,
    color: "#005B9C",
    textAlign: "center",
    fontWeight: "700",
    marginTop: 3,
  },
  subtitle: {
    fontSize: 13,
    color: "#929292",
    textAlign: "center",
    fontFamily: "Kodchasan",
  },
  message: {
    fontSize: 18,
    color: "#1F335B",
    textAlign: "center",
    fontFamily: "KodchasanBold",
  },
  desc: {
    fontSize: 14,
    color: "#1F335B99",
    textAlign: "center",
    fontFamily: "Opensans",
    marginTop: 14,
    marginBottom: 16,
  },
  inputControl: {
    color: "#000000",
    height: 56,
    backgroundColor: "#F5F4F1",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    borderWidth: 1,
    borderStyle: "solid",
    marginTop: 16,
  },
  forgotText: {
    fontSize: 16,
    color: "#2567EA",
    textAlign: "center",
    fontFamily: "OpensansBold",
    marginTop: 56,
    marginBottom: 24,
  },
  btn: {
    padding: 14,
    borderRadius: 20,
  },
  btnText: {
    color: "#FFF",
    fontFamily: "KodchasanBold",
    fontSize: 18,
    backgroundColor: "transparent",
    textAlign: "center",
  },
  error: {
    fontFamily: "Opensans",
    fontSize: 10,
    color: "#E7031E",
    marginTop: 4,
  },
  generalError: {
    fontFamily: "Opensans",
    fontSize: 12,
    color: "#E7031E",
    marginTop: 4,
  },
});
