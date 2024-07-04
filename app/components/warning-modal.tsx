import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

interface WarningModalsProps {
  visible: boolean;
  onClose: () => void;
  matkul: string;
}

const WarningModals: React.FC<WarningModalsProps> = ({
  visible,
  onClose,
  matkul,
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
            <AntDesign name="warning" size={24} color="#F5AA38" />
          </View>
          <Text style={styles.modalTitle}>Maaf Kelas Belum Available</Text>
          <Text style={styles.modalText}>
            {`Kelas '${matkul}' belum dimulai atau sudah lewat, tunggu sampai dengan waktu yang dijadwalkan untuk melakukan presensi.`}
          </Text>
          <Pressable onPress={onClose}>
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Kembali</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default WarningModals;
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
    paddingVertical: 9,
    paddingHorizontal: 27,
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5AA3833",
    width: 56,
    height: 56,
    borderRadius: 56,
  },
});
