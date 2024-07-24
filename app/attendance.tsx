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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Collapsible } from "@/components/Collapsible";
import { userAttendance } from "@/constants";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import LoadingSecondary from "./components/loading-secondary";

interface Matkul {
  name: string;
  id: string;
  user_id: string;
  mk_code: string;
  group: string;
  days: number;
  hours_start: string;
  hours_end: string;
  status: string;
  room: string;
  createdAt: Date;
  updatedAt: Date;
  sks: number;
}

interface DataState {
  [key: string]: Matkul[];
}

const AttendanceScreen = () => {
  // Initialize State

  const [curIdx, setCurIdx] = useState<null | number>();

  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const handleHadir = (arr: any) => {
    if (arr) return arr.filter((item: any) => item.status === true).length;
    return 0;
  };

  const handlePersentage = (arr: any) => {
    if (arr)
      return `${(
        (arr.filter((item: any) => item.status === true).length / 14) *
        100
      ).toFixed(2)} %`;
    return "0%";
  };

  if (!userAttendance) return <LoadingSecondary />;

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
            <ArrowIcon height={21} width={21} />
          </Pressable>
          <Text style={styles.title}>Kehadiran</Text>
        </View>

        <KeyboardAwareScrollView>
          <View style={styles.container}>
            {userAttendance.map((val, idx) => (
              <View style={styles.wrapping} key={`kehadiran-${idx}`}>
                <Collapsible
                  index={idx}
                  curIdx={curIdx}
                  setCurIdx={setCurIdx}
                  title={val.name}
                  hadir={handleHadir(val.attendance)}
                  persentage={handlePersentage(val.attendance)}
                  desc={`${days[val.days]}, ${val.hours_start} - ${
                    val.hours_end
                  } (${val.room})`}
                >
                  <View style={styles.wrap}>
                    <Text style={styles.label}>Pertemuan</Text>
                    <Text style={styles.label}>Kehadiran</Text>
                  </View>
                  <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
                    style={styles.line}
                  />

                  {val.attendance &&
                    val.attendance.map((item, idx) => (
                      <View style={styles.wrap} key={`attand-${idx}`}>
                        <View>
                          <Text style={styles.miniTitle}>{item.date}</Text>
                          <Text style={styles.desc}>{`Pertemuan ke-${
                            idx + 1
                          }`}</Text>
                        </View>
                        {item.status ? (
                          <AntDesign
                            name="checkcircle"
                            size={20}
                            color="#63DCB2"
                          />
                        ) : (
                          <AntDesign
                            name="closecircle"
                            size={20}
                            color="#FF5D62"
                          />
                        )}
                      </View>
                    ))}
                </Collapsible>
              </View>
            ))}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({
  wrapTitle: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingVertical: 11,
  },
  title: { fontFamily: "KodchasanBold", fontSize: 18, color: "#1F335B" },
  container: {
    width: "90%",
    alignSelf: "center",
  },
  arrowIcon: {
    position: "absolute",
    left: "5%",
  },
  wrapping: {
    paddingVertical: 20,
    paddingHorizontal: 27,
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingBottom: 24,
    width: "100%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0.1,
      height: 0.1,
    },
    shadowRadius: 0.5,
    shadowOpacity: 0.2,
    marginBottom: 24,
  },
  wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  miniTitle: {
    color: "#1F335B",
    fontFamily: "OpensansBold",
    fontSize: 12,
    lineHeight: 16,
  },
  desc: {
    color: "#79859D",
    fontFamily: "Opensans",
    fontSize: 10,
    lineHeight: 18,
    marginBottom: 13,
  },
  label: {
    color: "#1F335B",
    fontFamily: "OpensansBold",
    fontSize: 13,
    lineHeight: 16,
    marginTop: 12,
  },
  line: {
    width: "100%",
    height: 2,
    borderRadius: 2,
    marginTop: 5,
    marginBottom: 7,
  },
});
