import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  LayoutAnimation,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import LocationIcon from "@/assets/icon/project-target-icon.svg";
import BookIcon from "@/assets/icon/attend-icon.svg";
import { LinearGradient } from "expo-linear-gradient";
import CameraIcon from "@/assets/icon/camera-icon.svg";
import WidgetIcon from "@/assets/icon/widget-icon.svg";
import OptionIcon from "@/assets/icon/option-icon.svg";
import KHSIcon from "@/assets/icon/present-icon.svg";
import KRSIcon from "@/assets/icon/khs-icon.svg";
import MoneyIcon from "@/assets/icon/money-icon.svg";
import SettingIcon from "@/assets/icon/settings-icon.svg";
import BurgerIcon from "@/assets/icon/burger-icon.svg";
import AchivementIcon from "@/assets/icon/achievement.svg";
import { router } from "expo-router";
import { getLocalStorage } from "@/utils/AsyncStorage";
import axios from "axios";
import { Skeleton } from "moti/skeleton";
import {
  SimpleLineIcons,
  Entypo,
  FontAwesome,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import ErrorModals from "../components/error-modal";

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

export default function HomeScreen() {
  // const hours = new Date().getHours();
  // const minute = new Date().getMinutes();
  const hours = 7;
  const minute = 57;
  // Initialize State
  const [showMore, setSowMore] = useState(false);
  const [location, setLocation] = useState("Waiting...");
  const [isAvailable, setIsAvailable] = useState(false);
  const [, setErrorMsg] = useState("");
  const [data, setData] = useState<Matkul | undefined | string>(undefined);
  const [, setError] = useState("");
  const [open, setOpen] = useState(false);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const handleGetSheculde = async () => {
    try {
      const access_token = String(await getLocalStorage("access_token"));

      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/matkul/today-matkul`,
        {
          headers: {
            access_token,
          },
        }
      );
      if (data && data.matkul) {
        const { matkul } = data;
        setData(matkul);
        setIsAvailable(handleIndicator(matkul.hours_start, matkul.hours_end));
      } else setData("finish");
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  const handleIndicator = (start: string, end: string) => {
    const jdStart = start.split(":");
    const jdEnd = end.split(":");

    const startInMinute = +jdStart[0] * 60 + +jdStart[1];
    const endInMinute = +jdEnd[0] * 60 + +jdEnd[1];
    const nowInMinute = hours * 60 + minute;

    return nowInMinute >= startInMinute && nowInMinute <= endInMinute;
  };

  // Asking Location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;
      Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_API_KEY || "", {
        language: "id",
      });

      Geocoder.from(latitude, longitude)
        .then((json) => {
          const address = json.results[0];
          setLocation(address?.formatted_address.slice(0, 50) + "...");
        })
        .catch((error) => console.warn(error));
    })();
  }, []);

  useEffect(() => {
    handleGetSheculde();
    const myInterfal = setInterval(() => {
      handleGetSheculde();
    }, 300000);

    clearInterval(myInterfal);
  }, []);

  return (
    <>
      {/* <Stack.Screen options={{ headerShown: false }} /> */}

      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={{ height: data === "finish" ? 290 : 260 }}>
            <Image
              alt="App heading"
              style={styles.headerImg}
              source={require("@/assets/images/heading.png")}
            />

            <View style={styles.headContain}>
              <View style={styles.wrapper}>
                <View style={styles.wrapUser}>
                  <Pressable
                    onPress={() => {
                      setOpen(true);
                      handleGetSheculde();
                    }}
                  >
                    <Image
                      alt="User Profile"
                      style={styles.userImg}
                      resizeMode="cover"
                      source={require("@/assets/images/profile.jpeg")}
                    />
                  </Pressable>
                  <View>
                    <Text style={styles.name}>Aldo Marcelino</Text>
                    <Text style={styles.nim}>A11.2020.10596</Text>
                  </View>
                </View>
                <Pressable onPress={() => router.push("notifications")}>
                  <View style={{ position: "relative" }}>
                    <Image
                      alt="Nification Icon"
                      style={styles.notifIcon}
                      source={require("@/assets/icon/notification.png")}
                    />
                    <View style={styles.dot} />
                  </View>
                </Pressable>
              </View>

              <View style={styles.heading}>
                <View style={styles.containLocation}>
                  <LocationIcon width={20} height={20} />
                  <Text style={styles.address}>
                    {location?.substring(0, 45).concat("...")}
                  </Text>
                </View>
                <View style={styles.line} />

                {!data ? (
                  <>
                    <Skeleton
                      colorMode="light"
                      width={"60%"}
                      height={16}
                      radius="square"
                    />
                    <Spacer height={12} />
                    <Skeleton
                      colorMode="light"
                      width="100%"
                      height={74}
                      radius="square"
                    />
                  </>
                ) : (
                  <>
                    {typeof data === "object" ? (
                      <>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Text style={styles.message}>
                            Jangan lewatkan presensimu hari ini!
                          </Text>

                          {isAvailable ? (
                            <View style={styles.outter}>
                              <View style={styles.inner}>
                                <MotiView
                                  from={{ opacity: 0.5, scale: 1 }}
                                  animate={{ opacity: 0, scale: 4 }}
                                  transition={{
                                    type: "timing",
                                    duration: 2000,
                                    easing: Easing.out(Easing.ease),
                                    delay: 400,
                                    loop: true,
                                  }}
                                  style={styles.motion}
                                />
                              </View>
                            </View>
                          ) : (
                            <View
                              style={{
                                ...styles.outter,
                                borderColor: "#79859D",
                              }}
                            >
                              <View
                                style={{
                                  ...styles.inner,
                                  backgroundColor: "#79859D",
                                }}
                              />
                            </View>
                          )}
                        </View>

                        <View style={styles.flexCenter}>
                          <BookIcon width={41} height={41} />
                          <View style={{ marginLeft: 3 }}>
                            <Text style={styles.matkulName}>{data.name}</Text>
                            <Text style={styles.matkulTime}>
                              {`${days[data.days]}, ${data.hours_start}:${
                                data.hours_end
                              } (${data.room})`}
                            </Text>
                          </View>
                        </View>

                        {isAvailable ? (
                          <View style={styles.statusWrap}>
                            <Text style={styles.statusText}>Available</Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              ...styles.statusWrap,
                              backgroundColor: "#79859D",
                              borderColor: "#black",
                            }}
                          >
                            <Text
                              style={{ ...styles.statusText, color: "white" }}
                            >
                              Unavailable
                            </Text>
                          </View>
                        )}

                        <TouchableOpacity
                          onPress={() => isAvailable && router.push("camera")}
                        >
                          <LinearGradient
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            colors={
                              isAvailable
                                ? ["#3A9DD1", "#408EC7", "#3C70B7"]
                                : ["#939db0", "#6c778d", "#545d6d"]
                            }
                            style={styles.btn}
                          >
                            <CameraIcon width={17} height={17} />
                            <Text style={styles.btnText}>Clock in</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: 8,
                          }}
                        >
                          <Text style={styles.jurusan}>
                            Achivement di Teknik Informatika
                          </Text>
                          <AchivementIcon />
                        </View>

                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              borderRadius: 20,
                              alignItems: "center",
                              backgroundColor: "#fff",
                            }}
                          >
                            <LinearGradient
                              start={{ x: 1, y: 0 }}
                              end={{ x: 0, y: 0 }}
                              colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
                              style={{
                                paddingHorizontal: 9,
                                paddingVertical: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                shadowColor: "#000000",
                                shadowOffset: {
                                  width: 0.3,
                                  height: 0.3,
                                },
                                shadowRadius: 0.3,
                                shadowOpacity: 0.3,
                              }}
                            >
                              <MaterialIcons
                                name="backpack"
                                size={24}
                                color="white"
                              />
                              <Text style={styles.titleOnHead}>
                                Semester Genap
                              </Text>
                              <Text style={styles.descOnHead}>
                                T.A 2023/2024
                              </Text>
                            </LinearGradient>
                          </View>
                          <View
                            style={{
                              borderRadius: 20,
                              alignItems: "center",
                              backgroundColor: "#fff",
                            }}
                          >
                            <LinearGradient
                              start={{ x: 1, y: 0 }}
                              end={{ x: 0, y: 0 }}
                              colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
                              style={{
                                paddingHorizontal: 14,
                                paddingVertical: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                shadowColor: "#000000",
                                shadowOffset: {
                                  width: 0.3,
                                  height: 0.3,
                                },
                                shadowRadius: 0.3,
                                shadowOpacity: 0.3,
                              }}
                            >
                              <FontAwesome
                                name="book"
                                size={24}
                                color="white"
                              />
                              <Text style={styles.titleOnHead}>20 SKS</Text>
                              <Text style={styles.descOnHead}>
                                8 Mata Kuliah
                              </Text>
                            </LinearGradient>
                          </View>
                          <View
                            style={{
                              borderRadius: 20,
                              alignItems: "center",
                              backgroundColor: "#fff",
                            }}
                          >
                            <LinearGradient
                              start={{ x: 1, y: 0 }}
                              end={{ x: 0, y: 0 }}
                              colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
                              style={{
                                paddingHorizontal: 14,
                                paddingVertical: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                shadowColor: "#000000",
                                shadowOffset: {
                                  width: 0.3,
                                  height: 0.3,
                                },
                                shadowRadius: 0.3,
                                shadowOpacity: 0.3,
                              }}
                            >
                              <SimpleLineIcons
                                name="notebook"
                                size={24}
                                color="white"
                              />
                              <Text style={styles.titleOnHead}>128 SKS</Text>
                              <Text style={styles.descOnHead}>
                                Telah Diambil
                              </Text>
                            </LinearGradient>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 4,
                            alignItems: "center",
                            marginTop: 12,
                            justifyContent: "center",
                          }}
                        >
                          <Entypo
                            name="graduation-cap"
                            size={24}
                            color="#79859D"
                          />
                          <Text style={styles.keepUP}>
                            Keep it up, Kamu akan lulus di
                          </Text>
                          <Text style={styles.year}>July 2024</Text>
                        </View>
                      </>
                    )}
                  </>
                )}
              </View>
            </View>
          </View>

          {/* Menu */}
          <View style={styles.wrapMenu}>
            <View style={styles.flexed}>
              <Pressable
                onPress={() => router.push("attendance")}
                style={{ alignItems: "center", width: 48 }}
              >
                <View style={styles.containMenu}>
                  <WidgetIcon height={24} width={24} />
                </View>
                <Text style={styles.menuTitle}>Kehadiran</Text>
              </Pressable>
              <View style={{ alignItems: "center", width: 48 }}>
                <View style={styles.containMenu}>
                  <KHSIcon height={24} width={24} />
                </View>
                <Text style={styles.menuTitle}>KRS</Text>
              </View>
              <View style={{ alignItems: "center", width: 48 }}>
                <View style={styles.containMenu}>
                  <KRSIcon height={30} width={30} />
                </View>
                <Text style={styles.menuTitle}>KHS</Text>
              </View>
              <Pressable
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  setSowMore(!showMore);
                }}
              >
                <View style={{ alignItems: "center", width: 48 }}>
                  <View style={styles.containMenu}>
                    {showMore ? (
                      <BurgerIcon height={24} width={24} />
                    ) : (
                      <OptionIcon height={24} width={24} />
                    )}
                  </View>
                  <Text style={styles.menuTitle}>
                    {showMore ? "Less" : "More"}
                  </Text>
                </View>
              </Pressable>
            </View>

            {showMore && (
              <View style={{ ...styles.flexed, marginTop: 16 }}>
                <View style={{ alignItems: "center" }}>
                  <View style={styles.containMenu}>
                    <MoneyIcon height={24} width={24} />
                  </View>
                  <Text style={styles.menuTitle}>Pembayaran</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <View style={styles.containMenu}>
                    <SettingIcon height={26} width={26} />
                  </View>
                  <Text style={styles.menuTitle}>Pengaturan</Text>
                </View>
              </View>
            )}
          </View>

          <Text
            style={{
              fontFamily: "KodchasanBold",
              fontSize: 20,
              color: "#1F335B",
              marginTop: 24,
              marginBottom: 16,
              marginLeft: "5%",
            }}
          >
            Tutorial
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                marginLeft: "5%",
                display: "flex",
                gap: 13,
                flexDirection: "row",
              }}
            >
              {[
                "Daftar Akun SUPREMO",
                "Pengisian KRS",
                "Pengajuan Dosen Pembimbing",
                "Lorem Ipsum Dolore",
              ].map((e, idx) => (
                <View key={`index-${e}`}>
                  <View
                    style={{
                      height: 126,
                      width: 104,
                      borderRadius: 20,
                      alignItems: "center",
                      backgroundColor: "#fff",
                    }}
                  >
                    <LinearGradient
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 0 }}
                      colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
                      style={{
                        width: "100%",
                        height: 72,
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        shadowColor: "#000000",
                        shadowOffset: {
                          width: 0.3,
                          height: 0.3,
                        },
                        shadowRadius: 0.3,
                        shadowOpacity: 0.3,
                      }}
                    >
                      {idx == 0 ? (
                        <CameraIcon width={28} height={28} />
                      ) : idx == 1 ? (
                        <FontAwesome5
                          name="newspaper"
                          size={24}
                          color="white"
                        />
                      ) : (
                        <MaterialIcons
                          name="person-search"
                          size={24}
                          color="white"
                        />
                      )}
                    </LinearGradient>
                    <View>
                      <Text
                        style={{
                          color: "#79859D",
                          fontFamily: "Opensans",
                          fontSize: 12,
                          lineHeight: 18,
                          textAlign: "center",
                          marginTop: 8,
                        }}
                      >
                        {e}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          <Text
            style={{
              fontFamily: "KodchasanBold",
              fontSize: 20,
              color: "#1F335B",
              marginTop: 24,
              marginBottom: 16,
              marginLeft: "5%",
            }}
          >
            Pengumuman Akademik
          </Text>

          <View style={styles.infoContain}>
            <View style={{ height: 42, marginBottom: 8 }}>
              <Text
                style={{
                  fontFamily: "Opensans",
                  fontSize: 14,
                  lineHeight: 21,
                  color: "#1F335B",
                }}
              >
                Beasiswa Djarum: Jangan ketinggalan coba ikut dan dapatkan
                Beasiswa 4 semester
              </Text>
            </View>
            <Text
              style={{
                color: "#79859D",
                fontFamily: "Opensans",
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              17 Jun 2024
            </Text>
            <View style={styles.lineSecondary} />
            <View style={{ height: 42, marginBottom: 8 }}>
              <Text
                style={{
                  fontFamily: "Opensans",
                  fontSize: 14,
                  lineHeight: 21,
                  color: "#1F335B",
                }}
              >
                Event: Pengumuman Penerimaan Proposal Penelitian kepada
                Masyarakat Anggaran 2024
              </Text>
            </View>
            <Text
              style={{
                color: "#79859D",
                fontFamily: "Opensans",
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              19 Mei 2024
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>

      {/* error modal */}
      <ErrorModals
        visible={open}
        onClose={() => setOpen(false)}
        status={"other"}
      />
    </>
  );
}

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    position: "relative",
  },
  headerImg: {
    width: "100%",
    height: 260,
    alignSelf: "center",
  },
  headContain: {
    position: "absolute",
    bottom: -74,
    width: "90%",
    alignSelf: "center",
  },
  heading: {
    width: "100%",
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: "#FFF",
    padding: 16,
    minHeight: 181,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0.1,
      height: 0.1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.2,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  wrapUser: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  userImg: {
    width: 64,
    height: 64,
    borderRadius: 64,
  },
  notifIcon: {
    width: 24,
    height: 24,
  },
  name: {
    fontFamily: "KodchasanBold",
    fontSize: 22,
    color: "#fff",
  },
  nim: {
    color: "#fff",
  },
  jurusan: {
    color: "#000000",
    fontFamily: "Opensans",
    fontSize: 15,
  },
  dot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: "#FF5D62",
  },
  containLocation: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  address: {
    fontFamily: "Opensans",
    fontSize: 13,
  },
  line: {
    height: 1,
    backgroundColor: "#D0D8D8",
    width: "100%",
    marginTop: 12,
    marginBottom: 6,
    borderRadius: 1,
  },
  flexCenter: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  matkulName: { fontFamily: "OpensansBold", fontSize: 14, color: "#1F335B" },
  matkulTime: { fontFamily: "Opensans", fontSize: 12, color: "#1F335B80" },
  message: {
    fontFamily: "Opensans",
    fontSize: 9,
    color: "#000B3380",
    marginBottom: 4,
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 11,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#3E70B7",
    width: 127,
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  btnText: {
    color: "#FFF",
    fontFamily: "KodchasanBold",
    fontSize: 13,
    backgroundColor: "transparent",
  },
  statusWrap: {
    maxWidth: 110,
    borderRadius: 20,
    backgroundColor: "#DDFFED",
    paddingHorizontal: 11,
    paddingVertical: 3,
    marginVertical: 3,
    borderColor: "#62DCB2",
    borderWidth: 0.3,
    alignSelf: "flex-end",
  },
  statusText: {
    fontFamily: "Mulish",
    fontSize: 10,
    color: "#1F335B",
  },
  wrapMenu: {
    marginTop: 100,
    width: "90%",
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0.3,
      height: 0.3,
    },
    shadowRadius: 0.3,
    shadowOpacity: 0.3,
  },
  containMenu: {
    height: 48,
    width: 48,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E7EFF6",
  },
  menuTitle: {
    fontFamily: "Opensans",
    color: "#79859D",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
    textAlign: "center",
  },
  infoContain: {
    width: "90%",
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: "#FFF",
    padding: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0.1,
      height: 0.1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.2,
    marginBottom: 24,
  },
  lineSecondary: {
    height: 1,
    backgroundColor: "#D0D8D8",
    width: "100%",
    borderRadius: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  flexed: {
    display: "flex",
    flexDirection: "row",
    gap: 36,
    alignItems: "center",
  },
  titleOnHead: {
    fontFamily: "MulishBold",
    fontSize: 15,
    color: "#fff",
    marginTop: 4,
  },
  descOnHead: {
    fontFamily: "Mulish",
    fontSize: 9,
    color: "#fff",
  },
  keepUP: {
    fontFamily: "Opensans",
    fontSize: 10,
    color: "#79859D",
  },
  year: {
    fontFamily: "OpensansBold",
    fontSize: 12,
    color: "#62DCB2",
  },
  outter: {
    top: 0,
    right: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#3A9DD1",
    borderWidth: 1,
    height: 14,
    width: 14,
    borderRadius: 18,
  },
  inner: {
    backgroundColor: "#3A9DD1",
    height: 9,
    width: 9,
    borderRadius: 9,
  },
  motion: { backgroundColor: "#3A9DD1", height: 9, width: 9, borderRadius: 9 },
});
