import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import ArrowIcon from "@/assets/icon/arrow-left-icon.svg";
import SuccesImage from "@/assets/images/success-submit.svg";
import { LinearGradient } from "expo-linear-gradient";

const SuccessFaceScreen = () => {
  const hours = new Date().getHours();
  const minute = new Date().getMinutes();

  const handleDate = () => {
    const date = new Date();
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, "0");
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${monthName} ${year}`;
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.wrapTitle}>
        <Pressable style={styles.arrowIcon} onPress={() => router.replace("")}>
          <ArrowIcon height={24} width={24} />
        </Pressable>
      </View>
      <Image
        alt="App Logo"
        resizeMode="cover"
        style={styles.background}
        source={require("@/assets/images/bg-success.png")}
      />
      <View style={{ justifyContent: "center" }}>
        <Text style={styles.clock}>{`${hours}:${minute}`}</Text>
        <Text style={styles.date}>{handleDate()}</Text>
      </View>

      <View style={{ alignSelf: "center", marginTop: 45, marginBottom: 209 }}>
        <SuccesImage />
      </View>

      <Text style={styles.message}>Wajah Terverifikasi!</Text>
      <View style={{ width: 275, alignSelf: "center", marginTop: 7 }}>
        <Text style={styles.desc}>
          Selamat presentasi anda berhasil, sistem membaca bahwa anda menghadiri
          kelas hari ini, semangat terus
        </Text>
      </View>
      <Pressable
        style={{ width: 313, alignSelf: "center", marginTop: 31 }}
        onPress={() => router.replace("")}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
          style={styles.btn}
        >
          <Text style={styles.back}>Kembali</Text>
        </LinearGradient>
      </Pressable>
    </>
  );
};

export default SuccessFaceScreen;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  wrapTitle: {
    marginTop: 69,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  title: { fontFamily: "KodchasanBold", fontSize: 18, color: "#1F335B" },
  arrowIcon: {
    position: "absolute",
    left: "5%",
  },
  clock: {
    color: "1F335B",
    fontFamily: "OpensansBold",
    fontSize: 43,
    textAlign: "center",
    marginTop: 15,
  },
  date: {
    color: "1F335B",
    fontFamily: "Opensans",
    fontSize: 13,
    textAlign: "center",
  },
  message: {
    fontFamily: "KodchasanBold",
    fontSize: 27,
    textAlign: "center",
    color: "#fff",
  },
  desc: {
    color: "#fff",
    fontFamily: "Opensans",
    fontSize: 14,
    textAlign: "center",
  },
  btn: {
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  back: {
    fontFamily: "KodchasanBold",
    fontSize: 18,
    color: "#fff",
  },
});
