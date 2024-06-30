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
import { router } from "expo-router";

export default function HomeScreen() {
  const [showMore, setSowMore] = useState(false);
  const [location, setLocation] = useState("Waiting...");
  const [errorMsg, setErrorMsg] = useState("");
  const [latlong, setLatlong] = useState("waiting....");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;
      Geocoder.init("AIzaSyAjcX7iJNAuKDqFev69gZIh8i-gzaIwGP0", {
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

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View>
          <Image
            alt="App heading"
            style={styles.headerImg}
            source={require("@/assets/images/heading.png")}
          />

          <View style={styles.headContain}>
            <View style={styles.wrapper}>
              <View style={styles.wrapUser}>
                <Image
                  alt="User Profile"
                  style={styles.userImg}
                  resizeMode="cover"
                  source={{
                    uri: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                />
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
                  {location?.substring(0, 51).concat("...")}
                </Text>
              </View>
              <View style={styles.line} />
              <Text style={styles.message}>
                Jangan lewatkan presensimu hari ini!
              </Text>
              <View style={styles.flexCenter}>
                <BookIcon width={36} height={36} />
                <View>
                  <Text style={styles.matkulName}>
                    Interaksi Manusia Komputer
                  </Text>
                  <Text style={styles.matkulTime}>
                    Kamis, 07.00-09.30 (H.4.5)
                  </Text>
                </View>
              </View>
              <View style={styles.statusWrap}>
                <Text style={styles.statusText}>Available</Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              >
                <LinearGradient
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 0 }}
                  colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
                  style={styles.btn}
                >
                  <CameraIcon width={14} height={14} />
                  <Text style={styles.btnText}>Clock in</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.wrapMenu}>
          <View style={styles.flexed}>
            <View style={{ alignItems: "center", width: 48 }}>
              <View style={styles.containMenu}>
                <WidgetIcon height={24} width={24} />
              </View>
              <Text style={styles.menuTitle}>Kehadiran</Text>
            </View>
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
            {[1, 2, 3, 4].map((e) => (
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
                    <CameraIcon width={28} height={28} />
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
                      Daftar Akun EKUID
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
              Salad Poin: Menelusuri Potensi Investasi Menjanjikan di Brand
              Salad Lokal
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
            12 Mei 2024
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
              Salad Poin: Menelusuri Potensi Investasi Menjanjikan di Brand
              Salad Lokal
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
            12 Mei 2024
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

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
    height: 181,
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
    padding: 8,
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
    fontSize: 12,
    backgroundColor: "transparent",
  },
  statusWrap: {
    borderRadius: 20,
    backgroundColor: "#DDFFED",
    paddingHorizontal: 8,
    paddingVertical: 2,
    maxWidth: 110,
    alignSelf: "flex-end",
    marginVertical: 3,
  },
  statusText: {
    fontFamily: "Mulish",
    fontSize: 10,
    color: "#69758B",
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
});
