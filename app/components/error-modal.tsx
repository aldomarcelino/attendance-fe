import React from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ErrorImage from "@/assets/images/error.svg";

interface ErrorModalsProps {
  visible: boolean;
  onClose: () => void;
  status: string;
}

const ErrorModals: React.FC<ErrorModalsProps> = ({
  visible,
  onClose,
  status,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.wrapWarning}>
            {status == "image" ? (
              <ErrorImage />
            ) : (
              <Image
                alt="User Profile"
                style={{ width: 200, height: 200 }}
                resizeMode="cover"
                source={require("@/assets/images/wifi-error.png")}
              />
            )}
          </View>
          <Text style={styles.modalTitle}>Gagal Diverifikasi</Text>
          <View style={{ width: 275, alignSelf: "center", marginTop: 7 }}>
            <Text style={styles.desc}>
              {`Maaf kehadiran anda gagal diverifikasi, ${
                status == "image"
                  ? "ambil ulang foto untuk coba lagi"
                  : "ganti jaringan anda ke wifi lantai kelas ini"
              }`}
            </Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
              style={styles.btn}
            >
              <Text style={styles.btnText}>
                {status == "image" ? "Ambil Ulang" : "Kembali"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModals;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btn: {
    marginTop: 15,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 20,
  },
  btnText: {
    color: "#FFF",
    fontFamily: "KodchasanBold",
    fontSize: 18,
    backgroundColor: "transparent",
    textAlign: "center",
  },
  modalTitle: {
    marginTop: 8,
    fontFamily: "KodchasanBold",
    fontSize: 18,
    lineHeight: 24,
    color: "#1F335B",
    textAlign: "center",
  },
  modalText: {
    fontFamily: "Opensans",
    fontSize: 12,
    lineHeight: 18,
    color: "#1F335B99",
    textAlign: "center",
    marginTop: 10,
  },
  wrapWarning: {
    maxWidth: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  desc: {
    color: "#1F335B99",
    fontFamily: "Opensans",
    fontSize: 14,
    textAlign: "center",
  },
});
