import {
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import ArrowIcon from "@/assets/icon/arrow-left-icon.svg";
import EmptyIcon from "@/assets/images/failed.svg";

const NotificationScreen = () => {
  const notifications = [1];
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View style={styles.wrapTitle}>
          <Pressable style={styles.arrowIcon} onPress={() => router.back()}>
            <ArrowIcon height={24} width={24} />
          </Pressable>
          <Text style={styles.title}>Notifikasi</Text>
        </View>

        {!notifications.length && (
          <EmptyIcon width={269} height={269} style={styles.emptyIcon} />
        )}

        <View style={styles.container}>
          {notifications.length ? (
            <>
              <View style={styles.wrapView}>
                <View style={styles.wrapSubs}>
                  <Text style={styles.subs}>Profil</Text>
                  <Text style={styles.subs}>3 Okt 2022, 02.00</Text>
                </View>
                <View style={styles.wraping}>
                  <View style={styles.indicator} />
                  <Text style={styles.notifTitle}>
                    Selamat, Rekening SRE Anda telah Diverifikasi.
                  </Text>
                </View>
                <Text style={styles.notifDesc}>
                  Anda sudah bisa memulai untuk berinvestasi di proyek yang
                  telah tersedia di aplikasi Ekuid
                </Text>
              </View>
              <View style={styles.line} />
              <View style={styles.wrapView}>
                <View style={styles.wrapSubs}>
                  <Text style={styles.subs}>Profil</Text>
                  <Text style={styles.subs}>3 Okt 2022, 02.00</Text>
                </View>
                <View style={styles.wraping}>
                  <View style={styles.indicator} />
                  <Text style={styles.notifTitle}>
                    Selamat, Rekening SRE Anda telah Diverifikasi.
                  </Text>
                </View>
                <Text style={styles.notifDesc}>
                  Anda sudah bisa memulai untuk berinvestasi di proyek yang
                  telah tersedia di aplikasi Ekuid
                </Text>
              </View>
            </>
          ) : (
            <Text style={styles.empty}>Belum Ada Notifikasi</Text>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default NotificationScreen;

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
    marginTop: 24,
  },
  wrapView: {},
  wrapSubs: {
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
  subs: {
    color: "#79859D",
    fontFamily: "Opensans",
    fontSize: 10,
    lineHeight: 15,
  },
  notifTitle: {
    color: "#1F335B",
    fontFamily: "OpensansBold",
    fontSize: 12,
    lineHeight: 18,
  },
  notifDesc: {
    color: "#79859D",
    fontFamily: "Opensans",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  wraping: {
    marginTop: 8,
    gap: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  indicator: {
    width: 6,
    height: 6,
    backgroundColor: "#E7031E",
    borderRadius: 6,
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
});
