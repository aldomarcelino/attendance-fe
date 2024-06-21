import {
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from "react-native";
import ArrowDown from "@/assets/icon/arrow-down-icon.svg";
import GoldIcon from "@/assets/icon/user-status-icon.svg";
import UserIcon from "@/assets/icon/profile.svg";
import MoneyIcon from "@/assets/icon/payment-icon.svg";
import Settingcon from "@/assets/icon/set-icon.svg";
import FileIcon from "@/assets/icon/file-icon.svg";
import QuestionIcon from "@/assets/icon/question.svg";
import NotifIcon from "@/assets/icon/warning-icon.svg";
import LogoutIcon from "@/assets/icon/logout-icon.svg";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.heading}>
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
            <ArrowDown height={20} width={20} />
          </View>
          <View style={styles.line} />
          <View style={styles.statWrap}>
            <GoldIcon width={20} height={20} />
            <Text style={styles.status}>Active</Text>
          </View>
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
            <Text style={styles.title}>Informasi Personal</Text>
          </View>
          <View style={styles.lineSecondary} />
          <View style={styles.flexed}>
            <FileIcon width={20} height={20} />
            <Text style={styles.title}>Informasi Personal</Text>
          </View>
          <View style={styles.lineSecondary} />
          <View style={styles.flexed}>
            <FileIcon width={20} height={20} />
            <Text style={styles.title}>Informasi Personal</Text>
          </View>
          <View style={styles.lineSecondary} />
          <View style={styles.flexed}>
            <LogoutIcon width={20} height={20} />
            <Text style={styles.title}>Informasi Personal</Text>
          </View>
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
});
