import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { use } from "react";


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

const Travel = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    });
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  }
  else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {console.log(text)}
      <View style={StyleSheet.absoluteFill}>
        {/* MapView remains in the background */}
        <MapView
          style={StyleSheet.absoluteFill}
          // provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
          showsUserLocation = {true}
          showsMyLocationButton = {true}
          customMapStyle={MINIMAL_MAP_STYLE}
        />
        {/* Foreground View */}
        <View
          className="absolute bottom-2 left-4 right-4 bg-background shadow-lg rounded-xl p-6"
          style={{ zIndex: 1 }} // Ensure it appears above MapView
        >
          {/* From Section */}
          <View className="mb-6 relative">
            <Text
              className="absolute -top-3 left-4 bg-background px-1 text-gray-600 font-psemibold"
              style={{ zIndex: 1 }}
            >
              From
            </Text>
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
              <MaterialIcons
                name="location-on"
                size={24}
                color="#065f46"
                className="mr-3"
              />
              <TextInput
                placeholder="Enter starting location"
                value={fromLocation}
                onChangeText={setFromLocation}
                className="flex-1 text-gray-800 text-base font-pmedium"
              />
            </View>
          </View>

          {/* To Section */}
          <View className="mb-5 relative">
            <Text
              className="absolute -top-3 left-4 bg-background px-1 text-gray-600 font-psemibold"
              style={{ zIndex: 1 }}
            >
              To
            </Text>
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
              <MaterialIcons
                name="location-on"
                size={24}
                color="#065f46"
                className="mr-3"
              />
              <TextInput
                placeholder="Enter destination"
                value={toLocation}
                onChangeText={setToLocation}
                className="flex-1 text-gray-800 text-base font-pmedium"
              />
            </View>
          </View>

          {/* Search Button */}
          <TouchableHighlight
            className="bg-emerald-800 rounded-lg py-3 flex-row items-center justify-center"
            onPress={() => {
              console.log("Searching from", fromLocation, "to", toLocation);
              navigation.navigate('routescreen');
            }}
          >
            <>
            <MaterialIcons name="search" size={20} color="#fff" />
            <Text className="text-white font-bold text-base ml-2">Search</Text>
            </>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Travel;
