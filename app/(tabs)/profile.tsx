import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { getLocalStorage, removeLocalStorage } from "@/utils/AsyncStorage";
import GoldIcon from "@/assets/icon/user-status-icon.svg";
import UserIcon from "@/assets/icon/profile.svg";
import MoneyIcon from "@/assets/icon/payment-icon.svg";
import Settingcon from "@/assets/icon/set-icon.svg";
import FileIcon from "@/assets/icon/file-icon.svg";
import QuestionIcon from "@/assets/icon/question.svg";
import NotifIcon from "@/assets/icon/warning-icon.svg";
import LogoutIcon from "@/assets/icon/logout-icon.svg";
import { AntDesign } from "@expo/vector-icons";

import { router } from "expo-router";
import axios from "axios";
import LoadingSecondary from "../components/loading-secondary";

interface User {
  nim: string;
  full_name: string;
  class: string;
  guardian_lecturer: string;
  registration_path: string;
  status: string;
}

export default function Profile() {
  const [data, setData] = useState<User | null>();
  const [openDetail, setOpenDetail] = useState(false);
  const [, setError] = useState("");

  const handleGetProfile = async () => {
    try {
      const access_token = String(await getLocalStorage("access_token"));

      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/user/profile`,
        {
          headers: {
            access_token,
          },
        }
      );

      setData(data);
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  console.log(data, "<<data");

  useEffect(() => {
    handleGetProfile();
  }, []);

  if (!data) return <LoadingSecondary />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ ...styles.heading, marginTop: 23 }}>
          <Pressable
            style={styles.wrapper}
            onPress={() => setOpenDetail(!openDetail)}
          >
            <View style={styles.wrapUser}>
              <Pressable onPress={handleGetProfile}>
                <Image
                  alt="User Profile"
                  style={styles.userImg}
                  resizeMode="cover"
                  source={require("@/assets/images/profile.jpeg")}
                />
              </Pressable>
              <View>
                <Text style={styles.name}>Aldo Marcelino</Text>
                <Text style={styles.nim}>{data.nim}</Text>
              </View>
            </View>

            <AntDesign
              name={openDetail ? "up" : "down"}
              size={20}
              color="black"
            />
          </Pressable>
          <View style={styles.line} />
          {!openDetail ? (
            <View style={styles.statWrap}>
              <GoldIcon width={20} height={20} />
              <Text style={styles.status}>Active</Text>
            </View>
          ) : (
            <>
              {/* Detail */}
              <Text style={styles.property}>Nama Lengkap Mahasiswa</Text>
              <Text style={styles.value}>{data.full_name}</Text>

              <Text style={styles.property}>Nomor Induk Mahasiswa</Text>
              <Text style={styles.value}>{data.nim}</Text>

              <Text style={styles.property}>Jalur Pendaftaran</Text>
              <Text style={styles.value}>{data.registration_path}</Text>

              <Text style={styles.property}>Status</Text>
              <Text style={styles.value}>{data.status && "Aktif"}</Text>

              <Text style={styles.property}>Kelas(Pagi/Malam)</Text>
              <Text style={styles.value}>{data.class}</Text>

              <Text style={styles.property}>Dosen Wali</Text>
              <Text style={styles.value}>{data.guardian_lecturer}</Text>
            </>
          )}
        </View>

        <Text style={styles.subTitle}>Informasi Mahasiswa</Text>

        <View style={styles.heading}>
          <View style={styles.flexed}>
            <UserIcon width={20} height={20} />
            <Text style={styles.title}>Informasi Personal</Text>
          </View>
          <View style={styles.lineSecondary} />
          <View style={styles.flexed}>
            <UserIcon width={20} height={20} />
            <Text style={styles.title}>Informasi Wali</Text>
          </View>
          <View style={styles.lineSecondary} />
          <View style={styles.flexed}>
            <MoneyIcon width={20} height={20} />
            <Text style={styles.title}>Informasi Pembayaran</Text>
          </View>
          <View style={styles.lineSecondary} />
          <View style={styles.flexed}>
            <Settingcon width={20} height={20} />
            <Text style={styles.title}>Pengaturan</Text>
          </View>
        </View>

        <Text style={styles.subTitle}>Bantuan</Text>

        <View style={styles.heading}>
          <View style={styles.flexed}>
            <QuestionIcon width={20} height={20} />
            <Text style={styles.title}>FAQ</Text>
          </View>
          <View style={styles.lineSecondary} />
          <View style={styles.flexed}>
            <NotifIcon width={20} height={20} />
            <Text style={styles.title}>Tentang Aplikasi</Text>
          </View>
          <View style={styles.lineSecondary} />
          <View style={styles.flexed}>
            <FileIcon width={20} height={20} />
            <Text style={styles.title}>Privacy Policy</Text>
          </View>
          <View style={styles.lineSecondary} />
          <View style={styles.flexed}>
            <FileIcon width={20} height={20} />
            <Text style={styles.title}>Cookie Policy</Text>
          </View>
          <View style={styles.lineSecondary} />
          <View style={styles.flexed}>
            <FileIcon width={20} height={20} />
            <Text style={styles.title}>Term of Use</Text>
          </View>
          <View style={styles.lineSecondary} />
          <Pressable
            style={styles.flexed}
            onPress={() => {
              removeLocalStorage("access_token");
              router.replace("/");
            }}
          >
            <LogoutIcon width={20} height={20} />
            <Text style={styles.title}>Logout</Text>
          </Pressable>
        </View>

        <Text
          style={{
            fontFamily: "Opensans",
            fontSize: 10,
            color: "#79859D",
            lineHeight: 15,
            marginBottom: 12,
            textAlign: "center",
            marginTop: 24,
          }}
        >
          App Version: 1.0.1
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  heading: {
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
    shadowRadius: 0.2,
    shadowOpacity: 0.2,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapUser: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
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
    color: "#1F335B",
  },
  nim: {
    color: "#79859D",
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
  statWrap: {
    backgroundColor: "#FDF5D7",
    borderRadius: 12,
    padding: 2,
    display: "flex",
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    width: 75,
    alignSelf: "flex-end",
  },
  status: {
    color: "#1F335B",
    fontSize: 12,
    fontFamily: "Kodchasan",
  },
  line: {
    height: 1,
    backgroundColor: "#D0D8D8",
    width: "100%",
    marginTop: 18,
    marginBottom: 18,
    borderRadius: 1,
  },
  subTitle: {
    fontFamily: "KodchasanBold",
    fontSize: 20,
    color: "#1F335B",
    marginTop: 16,
    marginBottom: 8,
    marginLeft: "5%",
  },
  flexed: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  title: {
    fontFamily: "Opensans",
    fontSize: 14,
    color: "#1F335B",
    lineHeight: 21,
  },
  lineSecondary: {
    height: 1,
    backgroundColor: "#D0D8D8",
    width: "100%",
    borderRadius: 1,
    marginBottom: 16,
    marginTop: 16,
  },
  property: {
    fontFamily: "Opensans",
    fontSize: 12,
    color: "#1F335B",
    lineHeight: 12,
    marginTop: 12,
  },
  value: {
    fontFamily: "OpensansBold",
    fontSize: 14,
    color: "#1F335B",
    lineHeight: 19,
  },
});

const people = {
  UserDetail: {
    address: "Kel. Kupang Kec. Ambarawa",
    alternative_email: "aldomarcelino@gmail.com",
    alternative_number: "082167168474",
    birth_date: "1999-11-14T17:00:00.000Z",
    birth_place: "Cepu",
    citizen: "WNI",
    createdAt: "2024-07-04T04:37:07.850Z",
    email: "111201710596@mhs.dinus.ac.id",
    gender: "Male",
    id: "55e03a65-c018-416d-b4f6-cda961b7db3d",
    origin_address: "JL. Lintas Sumatera Kec siabu",
    origin_postal_code: 22967,
    parent_address: "Simangambat Kec. Siabu Kab. Madina",
    parent_birth_date: "1975-08-15T17:00:00.000Z",
    parent_birth_place: "Simangambat",
    parent_number: "082166875522",
    phone_number: "082267580929",
    postal_code: 50612,
    updatedAt: "2024-07-04T04:37:07.850Z",
  },
  class: "Pagi",
  createdAt: "2024-07-04T04:37:07.906Z",
  full_name: "Aldo Marcelino NF Lubis",
  guardian_lecturer: "Eko Hari Rachmawanto M.kom",
  id: "8e207eb6-9b16-46c6-97c2-80e7ef9a2469",
  nim: "A11.2017.10596",
  password: "$2a$09$i85HkOGTNE/5Xept.fwz1.aDuSaq8KU7OesVEs2rZiix0a9TZH6fG",
  registration_path: "IIA",
  status: "ACTIVE",
  updatedAt: "2024-07-04T04:37:07.906Z",
  user_detail_id: "55e03a65-c018-416d-b4f6-cda961b7db3d",
};
