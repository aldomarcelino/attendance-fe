import React, { useState } from "react";
import {
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Stack, router } from "expo-router";
import ArrowIcon from "@/assets/icon/arrow-left-icon.svg";
import EmptyIcon from "@/assets/images/failed.svg";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const ScheduleScreen = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        {/* Header */}
        <View style={styles.wrapTitle}>
          <Pressable style={styles.arrowIcon} onPress={() => router.back()}>
            <ArrowIcon height={24} width={24} />
          </Pressable>
          <Text style={styles.title}>Jadwal</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.wrapView}>
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Minggu</Text>
            </LinearGradient>
            <View
              style={{
                ...styles.wrapping,
                borderBottomColor: isActive ? "#408EC7" : "white",
              }}
            >
              <Text style={styles.notifTitle}>ETIKA PROFESI</Text>
              <View style={styles.wraping}>
                <Text style={styles.notifDesc}>A1.47628</Text>
                <View style={styles.indicator} />
                <Text style={styles.notifDesc}>3 SKS</Text>
              </View>
              <View style={styles.containt}>
                <View style={{ ...styles.wrapGrey, width: 120 }}>
                  <AntDesign name="clockcircle" size={12} color="#1F335B" />
                  <Text style={styles.clock}>07:30 - 09:00</Text>
                </View>
                <View style={{ ...styles.wrapGrey, width: 70 }}>
                  <Entypo name="location-pin" size={14} color="#1F335B" />
                  <Text style={styles.clock}>H.4.1</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  wrapTitle: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  title: { fontFamily: "KodchasanBold", fontSize: 18, color: "#1F335B" },
  arrowIcon: {
    position: "absolute",
    left: "5%",
  },
  container: {
    width: "90%",
    alignSelf: "center",
  },
  wrapView: {
    width: "100%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0.1,
      height: 0.1,
    },
    shadowRadius: 0.5,
    shadowOpacity: 0.2,
    marginTop: 24,
  },
  wrapping: {
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 16,
    borderTopLeftRadius: 0,
    borderBottomWidth: 3,
  },
  notifTitle: {
    color: "#1F335B",
    fontFamily: "OpensansBold",
    fontSize: 16,
    lineHeight: 18,
  },
  notifDesc: {
    color: "#79859D",
    fontFamily: "Opensans",
    fontSize: 10,
    lineHeight: 18,
  },
  wraping: {
    gap: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  indicator: {
    width: 8,
    height: 8,
    backgroundColor: "#F5AA38",
    borderRadius: 8,
  },
  line: {
    height: 1,
    backgroundColor: "#D0D8D8",
    width: "100%",
    marginVertical: 16,
    borderRadius: 1,
  },
  empty: {
    fontFamily: "KodchasanBold",
    fontSize: 18,
    color: "#1F335B",
    marginVertical: 24,
    textAlign: "center",
  },
  emptyIcon: {
    alignSelf: "center",
    marginTop: 41,
    marginBottom: 57,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#3E70B7",
    flexDirection: "row",
    width: 110,
  },
  btnText: {
    color: "#FFF",
    fontFamily: "KodchasanBold",
    fontSize: 14,
    backgroundColor: "transparent",
  },
  wrapGrey: {
    gap: 7,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    justifyContent: "center",
    backgroundColor: "#ECECEA",
    borderRadius: 4,
    paddingVertical: 7,
  },
  clock: {
    color: "#1F335B",
    fontFamily: "MulishBold",
    fontSize: 12,
  },
  containt: {
    gap: 11,
    display: "flex",
    flexDirection: "row",
    marginTop: 12,
  },
});
