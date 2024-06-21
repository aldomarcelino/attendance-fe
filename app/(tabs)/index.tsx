import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
  const [form, setForm] = useState({
    nim: "",
    password: "",
  });
  const [borderNim, setBorderNim] = useState("#F5F4F1");
  const [borderPass, setBorderPass] = useState("#F5F4F1");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView>
        <Image
          alt="App Logo"
          resizeMode="contain"
          style={styles.headerImg}
          source={require("@/assets/logo/udinus-logo.png")}
        />
        <Text style={styles.title}>AttendEasy</Text>
        <Text style={styles.subtitle}>
          Clock Your Attendance with just a tap!
        </Text>
        <View style={styles.container}>
          <Text style={styles.message}>Selamat datang Dinusian</Text>
          <View style={{ maxWidth: 258, alignSelf: "center" }}>
            <Text style={styles.desc}>
              Silakan masukan NIM agar bisa masuk ke akun AttendEasy Anda dan
              mulai rasakan mudahnya presensi
            </Text>
          </View>

          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            keyboardType="email-address"
            onChangeText={(nim) => setForm({ ...form, nim })}
            placeholder="NIM"
            placeholderTextColor="#1F335B99"
            style={{ ...styles.inputControl, borderColor: borderNim }}
            value={form.nim}
            onFocus={() => setBorderNim("#3E95CC")}
            onBlur={() => setBorderNim("#F5F4F1")}
          />
          <TextInput
            autoCorrect={false}
            clearButtonMode="while-editing"
            onChangeText={(password) => setForm({ ...form, password })}
            placeholder="Kata Sandi Anda"
            placeholderTextColor="#1F335B99"
            style={{ ...styles.inputControl, borderColor: borderPass }}
            secureTextEntry={true}
            value={form.password}
            onFocus={() => setBorderPass("#3E95CC")}
            onBlur={() => setBorderPass("#F5F4F1")}
          />

          <Text style={styles.forgotText}>lupa kata sandi</Text>

          <TouchableOpacity
            onPress={() => {
              console.log(form, "<<<");
            }}
          >
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Masuk Akun AttendEasy</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
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
});
