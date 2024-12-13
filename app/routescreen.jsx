import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from "react-native";
import RouteCard from "../components/ui/RouteCard";
import { useNavigation } from "expo-router";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const RoutesScreen = () => {
  const navigation = useNavigation();
  
  // State to store selected filter (Quickest, Cheapest, Greenest)
  const [selectedTab, setSelectedTab] = useState("quickest");

  const routes = [
    {
      id: 1,
      name: "Route 1",
      description: "Rickshaw, Train, Metro, Walk",
      totalTime: 59,
      carbonSavings: 2.3,
      totalCost: 100,
      steps: [
        {
          icon: <FontAwesome5 name="taxi" size={24} color="#FFA500" />, // Rickshaw
          description: "10 min",
        },
        {
          icon: <MaterialIcons name="train" size={24} color="#32CD32" />, // Train
          description: "20 min",
        },
        {
          icon: <MaterialIcons name="tram" size={24} color="#0000FF" />, // Metro
          description: "22 min",
        },
        {
          icon: <FontAwesome5 name="walking" size={24} color="#FFA500" />, // Walk
          description: "7 min",
        },
      ],
    },
    {
      id: 2,
      name: "Route 2",
      description: "Rickshaw, Train, Train, Rickshaw",
      totalTime: 78,
      carbonSavings: 1.8,
      totalCost: 150,
      steps: [
        {
          icon: <FontAwesome5 name="taxi" size={24} color="#FFA500" />,
          description: "10 min",
        },
        {
          icon: <MaterialIcons name="train" size={24} color="#32CD32" />,
          description: "35 min",
        },
        {
          icon: <MaterialIcons name="train" size={24} color="#32CD32" />,
          description: "24 min",
        },
        {
          icon: <FontAwesome5 name="taxi" size={24} color="#FFA500" />,
          description: "9 min",
        },
      ],
    },
    {
      id: 3,
      name: "Route 3",
      description: "Walk, Bus, Rickshaw",
      totalTime: 78,
      carbonSavings: 3.1,
      totalCost: 80,
      steps: [
        {
          icon: <FontAwesome5 name="walking" size={24} color="#FFA500" />,
          description: "10 min",
        },
        {
          icon: <FontAwesome5 name="bus" size={24} color="#32CD32" />,
          description: "58 min",
        },
        {
          icon: <FontAwesome5 name="taxi" size={24} color="#FFA500" />,
          description: "10 min",
        },
      ],
    },
    {
      id: 4,
      name: "Route 4",
      description: "Rickshaw, Metro, Walk",
      totalTime: 58,
      carbonSavings: 2.5,
      totalCost: 120,
      steps: [
        {
          icon: <FontAwesome5 name="taxi" size={24} color="#FFA500" />,
          description: "29 min",
        },
        {
          icon: <MaterialIcons name="tram" size={24} color="#0000FF" />,
          description: "22 min",
        },
        {
          icon: <FontAwesome5 name="walking" size={24} color="#FFA500" />,
          description: "7 min",
        },
      ],
    },
    {
      id: 5,
      name: "Route 5",
      description: "Direct Cab",
      totalTime: 59,
      carbonSavings: 0.5,
      totalCost: 500,
      steps: [
        {
          icon: <FontAwesome5 name="taxi" size={24} color="#FFA500" />,
          description: "59 min",
        },
      ],
    },
  ];

  // Sorting functions
  const sortByQuickest = () => {
    return routes.sort((a, b) => a.totalTime - b.totalTime);
  };

  const sortByCheapest = () => {
    return routes.sort((a, b) => a.totalCost - b.totalCost);
  };

  const sortByGreenest = () => {
    return routes.sort((a, b) => b.carbonSavings - a.carbonSavings);
  };

  // Get sorted routes based on selected tab
  const getSortedRoutes = () => {
    switch (selectedTab) {
      case "quickest":
        return sortByQuickest();
      case "cheapest":
        return sortByCheapest();
      case "greenest":
        return sortByGreenest();
      default:
        return routes;
    }
  };

  return (
    <ScrollView style={styles.container} className = "mb-3">
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab("quickest")}
          style={[styles.tabButton, selectedTab === "quickest" && styles.activeTab]}
        >
          <Text style={[styles.tabText, selectedTab === "quickest" && styles.activeTabText]}>Quickest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("cheapest")}
          style={[styles.tabButton, selectedTab === "cheapest" && styles.activeTab]}
        >
          <Text style={[styles.tabText, selectedTab === "cheapest" && styles.activeTabText]}>Cheapest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("greenest")}
          style={[styles.tabButton, selectedTab === "greenest" && styles.activeTab]}
        >
          <Text style={[styles.tabText, selectedTab === "greenest" && styles.activeTabText]}>Greenest</Text>
        </TouchableOpacity>
      </View>

      {/* Route Cards */}
      {getSortedRoutes().map((route) => (
        <RouteCard
          key={route.id}
          route={route}
          onPress={() => navigation.push("mapscreen", { routeId: route.id })}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "#32CD32", // Active tab border color
  },
  tabText: {
    fontSize: 16,
    color: "#555",
  },
  activeTabText: {
    color: "#32CD32", // Active tab text color
    fontWeight: "bold",
  },
});

export default RoutesScreen;
