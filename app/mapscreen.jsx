import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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

const coordinates = [
  { latitude: 19.18350205911928, longitude: 72.96271361585991 },
  { latitude: 19.183616701731644, longitude: 72.96488333551352 },
  { latitude: 19.187937689628768, longitude: 72.96362776342453 },
  { latitude: 19.17879195882516, longitude: 72.96749249537275 },
  { latitude: 19.174700971134946, longitude: 72.96856555624885 },
  { latitude: 19.170533769354257, longitude: 72.96771334920565 },
  { latitude: 19.151625098562686, longitude: 72.95498906438499 },
  { latitude: 19.138227827366038, longitude: 72.94668334069233 },
  { latitude: 19.1270558978725, longitude: 72.94001960038408 },
  { latitude: 19.124014907032073, longitude: 72.93864630943662 },
  { latitude: 19.124886663453275, longitude: 72.9328741956984 },
  { latitude: 19.125190763465074, longitude: 72.92750977751415 },
  { latitude: 19.125717868805207, longitude: 72.92225264800588 },
  { latitude: 19.128596645218074, longitude: 72.92066478030742 },
  { latitude: 19.12851555359596, longitude: 72.91967772726846 },
  { latitude: 19.12520823262548, longitude: 72.91684531688762 },
  { latitude: 19.123708000683312, longitude: 72.91186713712004 },
  { latitude: 19.123829641606484, longitude: 72.90937804709459 },
  { latitude: 19.12157926982955, longitude: 72.90819787518663 },
  { latitude: 19.119572155573454, longitude: 72.90478610516094 },
  { latitude: 19.120139826720823, longitude: 72.89978646770956 },
  { latitude: 19.122592954587983, longitude: 72.89843463435008 },
  { latitude: 19.124154017001636, longitude: 72.89669656285837 },
  { latitude: 19.124741945789065, longitude: 72.89390706551485 },
  { latitude: 19.126201621988226, longitude: 72.89040946498928 },
  { latitude: 19.12928311825559, longitude: 72.88573169242791 },
  { latitude: 19.129668301246763, longitude: 72.87916564474243 },
  { latitude: 19.130600845843276, longitude: 72.8758397055544 },
  { latitude: 19.13183747292878, longitude: 72.87476682196233 },
  { latitude: 19.133540354054634, longitude: 72.87453078758072 },
  { latitude: 19.13725014147299, longitude: 72.87287854685415 },
  { latitude: 19.138871880292623, longitude: 72.8710117293979 },
  { latitude: 19.135506754500796, longitude: 72.87019633785522 },
  { latitude: 19.132709188089663, longitude: 72.86985301509276 },
  { latitude: 19.129283118308017, longitude: 72.8680934859875 },
  { latitude: 19.130215665051903, longitude: 72.86620521085806 },
  { latitude: 19.128512749517913, longitude: 72.86485337735047 },
  { latitude: 19.12567451816915, longitude: 72.8631796790083 },
  { latitude: 19.126100255992547, longitude: 72.8604330969664 },
  { latitude: 19.126546265855684, longitude: 72.85854482191368 },
  { latitude: 19.12561369838733, longitude: 72.85646342771597 },
  { latitude: 19.125613698355167, longitude: 72.8563561388716 },
  { latitude: 19.1239512824535, longitude: 72.85436057546362 },
  { latitude: 19.123363350874158, longitude: 72.85275125011862 },
  { latitude: 19.123789094639978, longitude: 72.85131358615801 },
  { latitude: 19.123829641608086, longitude: 72.84985446452636 },
  { latitude: 19.124356751296713, longitude: 72.84880303862239 },
  { latitude: 19.124397298125526, longitude: 72.84678601754335 },
  { latitude: 19.12577588439943, longitude: 72.84689330588583 },
  { latitude: 19.126181348775358, longitude: 72.84603499897655 },
  { latitude: 19.126323261065483, longitude: 72.84468316570018 },
  { latitude: 19.125106866042476, longitude: 72.84159326092679 },
  { latitude: 19.1261002559985, longitude: 72.84052037717595 },
  { latitude: 19.126911182126836, longitude: 72.83768796459685 },
  { latitude: 19.127093639954815, longitude: 72.83541345126059 },
  { latitude: 19.127336916746916, longitude: 72.83404016026842 },
  { latitude: 19.124397298169534, longitude: 72.83337497246575 },
  { latitude: 19.12307952112099, longitude: 72.83348226082526 },
  { latitude: 19.122998426806703, longitude: 72.83657216545699 },
  { latitude: 19.123505265618093, longitude: 72.8360571813517 }
];


const mapscreen = () => {
  return (
    <SafeAreaView className="flex h-full bg-background">
      <View style={StyleSheet.absoluteFill}>
        <MapView
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
          showsUserLocation
          showsMyLocationButton
          customMapStyle={MINIMAL_MAP_STYLE}
        >
          <Polyline
            coordinates={coordinates}
            strokeColor="#FF0000" // red
            strokeWidth={3}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default mapscreen;

const styles = StyleSheet.create({});
