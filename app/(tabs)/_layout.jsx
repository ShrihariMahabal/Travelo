import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: { height: 60, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#e0e0e0' },
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold', marginBottom: 4 },
        tabBarInactiveTintColor: "#8e8e93",
        tabBarActiveTintColor: "#000000",
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={24} />,
          tabBarLabel: "Home",
        }}
      />

      {/* Travel Tab */}
      <Tabs.Screen
        name="travel"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="airplane" color={color} size={24} />,
          tabBarLabel: "Travel",
        }}
      />

      {/* Account Tab */}
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={24} />,
          tabBarLabel: "Account",
        }}
      />
    </Tabs>
  );
}