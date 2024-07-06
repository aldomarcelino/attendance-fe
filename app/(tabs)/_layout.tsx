import { Tabs } from "expo-router";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.contain}>
              {focused ? (
                <MaterialCommunityIcons
                  name="home-variant"
                  size={24}
                  color="#3E95CC"
                />
              ) : (
                <MaterialCommunityIcons
                  name="home-variant-outline"
                  size={24}
                  color="#79859D"
                />
              )}
              <Text
                style={{
                  color: focused ? "#1F335B" : "#79859D",
                  fontFamily: "Kodchasan",
                  fontSize: focused ? 14 : 13,
                }}
              >
                beranda
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.contain}>
              {focused ? (
                <Ionicons name="calendar" size={24} color="#3E95CC" />
              ) : (
                <Ionicons name="calendar-outline" size={24} color="#79859D" />
              )}
              <Text
                style={{
                  color: focused ? "#1F335B" : "#79859D",
                  fontFamily: "Kodchasan",
                  fontSize: focused ? 14 : 13,
                }}
              >
                jadwal
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.contain}>
              {focused ? (
                <Ionicons
                  name="person-circle-sharp"
                  size={26}
                  color="#3E95CC"
                />
              ) : (
                <Ionicons
                  name="person-circle-outline"
                  size={26}
                  color="#79859D"
                />
              )}
              <Text
                style={{
                  color: focused ? "#1F335B" : "#79859D",
                  fontFamily: "Kodchasan",
                  fontSize: focused ? 14 : 13,
                }}
              >
                profile
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  contain: { justifyContent: "center", alignItems: "center", marginTop: 20 },
});
