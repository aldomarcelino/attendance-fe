import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { getLocalStorage } from "@/utils/AsyncStorage";
import LoadingSecondary from "../components/loading-secondary";
import WarningModals from "../components/warning-modal";

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

const ScheduleScreen = () => {
  // Initialize State
  // const today = new Date().getDay();
  // const hours = new Date().getHours();
  // const minute = new Date().getMinutes();

  const today = 5;
  const hours = 7;
  const minute = 30;
  const [, setError] = useState("");
  const [showWarnModal, setShowWarnModal] = useState(false);
  const [data, setData] = useState<DataState>({});
  const [curName, setCurName] = useState("");

  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const handleGetSheculde = async () => {
    try {
      const access_token = String(await getLocalStorage("access_token"));

      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/matkul/all-matkul`,
        {
          headers: {
            access_token,
          },
        }
      );

      setData(data && data.matkul);
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  const handleIndicator = (start: string, end: string, isToday: boolean) => {
    const jdStart = start.split(":");
    const jdEnd = end.split(":");

    const startInMinute = +jdStart[0] * 60 + +jdStart[1];
    const endInMinute = +jdEnd[0] * 60 + +jdEnd[1];
    const nowInMinute = hours * 60 + minute;

    return (
      nowInMinute >= startInMinute && nowInMinute <= endInMinute && isToday
    );
  };

  const handlePressMatkul = (name: string, isAvailable: boolean) => {
    if (isAvailable) {
      router.replace("camera");
    } else {
      setShowWarnModal(true);
      setCurName(name);
    }
  };

  useEffect(() => {
    handleGetSheculde();
    setInterval(() => {
      handleGetSheculde();
    }, 300000);
  }, []);

  if (!Object.keys(data).length) return <LoadingSecondary />;

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
          <Text style={styles.title}>Jadwal</Text>
        </View>

        <KeyboardAwareScrollView>
          <View style={styles.container}>
            {Object.keys(data).map((key: string, id) => (
              <React.Fragment key={`${id}-wrap`}>
                <View style={styles.wrapView} key={`${id}-matkul`}>
                  <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={
                      +key === today
                        ? ["#3A9DD1", "#408EC7", "#3C70B7"]
                        : ["#A9A9A9", "#787878", "#686868"]
                    }
                    style={styles.btn}
                  >
                    <Text style={styles.btnText}>{days[+key]}</Text>
                  </LinearGradient>

                  <View
                    style={{
                      ...styles.wrapping,
                      borderBottomColor: +key === today ? "#408EC7" : "#B8B8B8",
                    }}
                  >
                    {data[key].map((matkul: Matkul, id: number) => (
                      <Pressable
                        key={`${id}-matkul`}
                        onPress={() =>
                          handlePressMatkul(
                            matkul.name,
                            handleIndicator(
                              matkul.hours_start,
                              matkul.hours_end,
                              +key === today
                            )
                          )
                        }
                      >
                        {id !== 0 && <View style={styles.line} />}

                        <View style={{ position: "relative" }}>
                          {handleIndicator(
                            matkul.hours_start,
                            matkul.hours_end,
                            +key === today
                          ) && (
                            <View style={styles.outter}>
                              <View style={styles.inner} />
                            </View>
                          )}

                          <Text style={styles.notifTitle}>{matkul.name}</Text>
                          <View style={styles.wraping}>
                            <Text style={styles.notifDesc}>{matkul.group}</Text>
                            <View style={styles.indicator} />
                            <Text
                              style={styles.notifDesc}
                            >{`${matkul.sks} SKS`}</Text>
                          </View>
                          <View style={styles.containt}>
                            <View style={{ ...styles.wrapGrey, width: 120 }}>
                              <AntDesign
                                name="clockcircle"
                                size={12}
                                color="#1F335B"
                              />
                              <Text
                                style={styles.clock}
                              >{`${matkul.hours_start} - ${matkul.hours_end}`}</Text>
                            </View>
                            <View style={{ ...styles.wrapGrey, width: 70 }}>
                              <Entypo
                                name="location-pin"
                                size={14}
                                color="#1F335B"
                              />
                              <Text style={styles.clock}>{matkul.room}</Text>
                            </View>
                          </View>
                        </View>
                      </Pressable>
                    ))}
                  </View>
                </View>
              </React.Fragment>
            ))}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>

      {/* Warning modal */}
      <WarningModals
        visible={showWarnModal}
        onClose={() => setShowWarnModal(false)}
        matkul={curName}
      />
    </>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  wrapTitle: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingVertical: 11,
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
    marginBottom: 24,
  },
  wrapping: {
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 16,
    borderTopLeftRadius: 0,
    borderBottomWidth: 3,
    paddingBottom: 24,
  },
  notifTitle: {
    color: "#1F335B",
    fontFamily: "OpensansBold",
    fontSize: 15,
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
    marginVertical: 21,
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
  outter: {
    top: 0,
    right: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#3A9DD1",
    borderWidth: 1,
    height: 18,
    width: 18,
    borderRadius: 18,
  },
  inner: {
    backgroundColor: "#3A9DD1",
    height: 12,
    width: 12,
    borderRadius: 12,
  },
});
