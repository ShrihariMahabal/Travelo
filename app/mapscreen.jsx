import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";

const INITIAL_REGION = {
  latitude: 19.184340410502568,
  longitude: 72.96341606513137,
  latitudeDelta: 0.008,
  longitudeDelta: 0.008,
};

const MINIMAL_MAP_STYLE = [
  {
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#bdbdbd" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#e8f5e9" }], // Light green for POIs
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#2e7d32" }], // Darker green for POI labels
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#c8e6c9" }], // Softer green for parks
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#388e3c" }], // Vibrant green for park labels
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#dadada" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [{ color: "#e5e5e5" }],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#b3e5fc" }], // Light blue for water
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#0288d1" }], // Blue for water labels
  },
];

const MODE_COLORS = {
  walking: "#FFA500", // Orange
  bus: "#32CD32", // Lime Green
  cab: "#FF0000", // Red
  train: "#0000FF", // Blue
  metro: "#8A2BE2", // Purple
};

const mapscreen = () => {
  
  const { id, name, description, totalTime, carbonSavings, totalCost, steps, startTime } = useLocalSearchParams();
  steps = JSON.parse(steps); 
  
  return (
    <SafeAreaView className="flex h-full bg-background">
  
      <View style={StyleSheet.absoluteFill}>
      <MapView
      // provider={PROVIDER_GOOGLE}
      style={StyleSheet.absoluteFillObject}
      initialRegion={INITIAL_REGION}
    >
      {/* {steps.map((step, stepIndex) => (
        <Polyline
          key={stepIndex}
          coordinates={step.coordinates}
          strokeColor={MODE_COLORS[step.mode]} // Use color based on mode
          strokeWidth={4}
        />
      ))} */}

      {/* Add markers for start and end points */}
      {/* <Marker
        coordinate={steps[0].coordinates[0]}
        title="Start"
        description={name}
      />
      <Marker
        coordinate={
          steps[steps.length - 1].coordinates.slice(-1)[0]
        }
        title="End"
        description={name}
      /> */}
    </MapView>

      </View>
    </SafeAreaView>
  );
};

export default mapscreen;

const styles = StyleSheet.create({});
