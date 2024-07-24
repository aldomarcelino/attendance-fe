import React from "react";
import { PropsWithChildren } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { View } from "moti";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export function Collapsible({
  children,
  title,
  hadir,
  persentage,
  desc,
  index,
  curIdx,
  setCurIdx,
}: PropsWithChildren & {
  title: string;
  hadir: number;
  persentage: string;
  desc: string;
  index: number;
  curIdx: number | null | undefined;
  setCurIdx: (value: any) => void;
}) {
  return (
    <ThemedView>
      <TouchableOpacity
        onPress={() => {
          if (curIdx == index) setCurIdx(null);
          else setCurIdx(index);
        }}
        activeOpacity={0.8}
      >
        <View style={styles.flexBetween}>
          <Text style={styles.matkul}>{title}</Text>
          <MaterialIcons
            name={curIdx == index ? "arrow-drop-up" : "arrow-drop-down"}
            size={24}
            color="black"
          />
        </View>
        <Text style={styles.desc}>{desc}</Text>
        <View style={styles.contain}>
          <View style={styles.wrap}>
            <Text style={styles.miniTitle}>Hadir</Text>

            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
              style={styles.wrapVal}
            >
              <Text style={styles.btnText}>{hadir}</Text>
            </LinearGradient>
          </View>
          <View style={{ ...styles.wrap, width: 170 }}>
            <Text style={styles.miniTitle}>Persentase</Text>

            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              colors={["#3A9DD1", "#408EC7", "#3C70B7"]}
              style={styles.wrapVal}
            >
              <Text style={styles.btnText}>{persentage}</Text>
            </LinearGradient>
          </View>
        </View>
      </TouchableOpacity>
      {curIdx == index && (
        <ThemedView style={styles.content}>{children}</ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 6,
  },
  contain: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  matkul: {
    color: "#1F335B",
    fontFamily: "OpensansBold",
    fontSize: 15,
    lineHeight: 18,
  },
  desc: {
    color: "#79859D",
    fontFamily: "Opensans",
    fontSize: 10,
    lineHeight: 18,
  },
  flexBetween: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  wrap: {
    marginTop: 13,
    flexDirection: "row",
    gap: 11,
    alignItems: "center",
    borderRadius: 9,
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderColor: "#79859D",
    borderWidth: 1,
    justifyContent: "center",
    width: 100,
  },
  miniTitle: {
    color: "#1F335B",
    fontFamily: "OpensansBold",
    fontSize: 12,
    lineHeight: 16,
  },
  wrapVal: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    alignItems: "center",
    borderRadius: 7,
    flexDirection: "row",
  },
  btnText: {
    color: "#FFF",
    fontFamily: "KodchasanBold",
    fontSize: 13,
    backgroundColor: "transparent",
  },
});
