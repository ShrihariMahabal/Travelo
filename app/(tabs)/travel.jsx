import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import axios from "axios";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Travel = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState("");

  const API_KEY = "am3K573hJ9mGtTnilRWVNUv1SMhdMeXhr6LvMaGK"; // Replace with your actual API key
  const BASE_URL = "https://api.olamaps.io/places/v1/autocomplete";

  const fetchSuggestions = async (input) => {
    try {
      if (!input) {
        setSuggestions([]);
        return;
      }

      const requestId = uuid.v4();
      const correlationId = uuid.v4();

      const response = await axios.get(BASE_URL, {
        headers: {
          "X-Request-Id": requestId,
          "X-Correlation-Id": correlationId,
          Origin: "http://localhost:8081", // Replace with your domain
        },
        params: {
          input,
          api_key: API_KEY,
        },
      });

      setSuggestions(response.data.predictions || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Debounced version of the fetchSuggestions function
  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300),
    []
  );

  const handleInputChange = (text, inputType) => {
    if (inputType === "from") {
      setFromLocation(text);
    } else {
      setToLocation(text);
    }
    setActiveInput(inputType);
    debouncedFetchSuggestions(text);
  };

  const handleClearInput = (inputType) => {
    if (inputType === "from") {
      setFromLocation("");
    } else {
      setToLocation("");
    }
    setSuggestions([]);
  };

  const handleSelectSuggestion = (description) => {
    if (activeInput === "from") {
      setFromLocation(description);
    } else {
      setToLocation(description);
    }
    setSuggestions([]);
  };

  return (
    <SafeAreaView
      className="min-h-full bg-background px-4 py-4"
      edges={["left", "right"]}
    >
      <View className="bg-white shadow-lg rounded-lg mb-4 p-6">
        {/* From Section */}
        <View className="mb-4 relative">
          <Text
            className="absolute -top-3 left-4 bg-white px-1 text-gray-600 font-psemibold text-sm"
            style={{ zIndex: 1 }}
          >
            From
          </Text>
          <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-1.5">
            <MaterialIcons
              name="location-on"
              size={20}
              color="#065f46"
              className="mr-3"
            />
            <TextInput
              placeholder="Starting location"
              value={fromLocation}
              onChangeText={(text) => handleInputChange(text, "from")}
              className="flex-1 text-gray-800 text-sm font-pmedium"
              style={{ height: 40 }}
            />
            {fromLocation !== "" && (
              <TouchableOpacity onPress={() => handleClearInput("from")}>
                <MaterialIcons
                  name="close"
                  size={20}
                  color="#888"
                  className="ml-3"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* To Section */}
        <View className="relative">
          <Text
            className="absolute -top-3 left-4 bg-white px-1 text-gray-600 font-psemibold text-sm"
            style={{ zIndex: 1 }}
          >
            To
          </Text>
          <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-1.5">
            <MaterialIcons
              name="location-on"
              size={20}
              color="#065f46"
              className="mr-3"
            />
            <TextInput
              placeholder="Destination"
              value={toLocation}
              onChangeText={(text) => handleInputChange(text, "to")}
              className="flex-1 text-gray-800 text-sm font-pmedium"
              style={{ height: 40 }}
            />
            {toLocation !== "" && (
              <TouchableOpacity onPress={() => handleClearInput("to")}>
                <MaterialIcons
                  name="close"
                  size={20}
                  color="#888"
                  className="ml-3"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Suggestions List */}
      {suggestions.length > 0 ? (
        <View className="flex-1 mt-4">
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelectSuggestion(item.description)}
                className="flex-row items-center bg-white shadow-sm rounded-lg px-4 mx-1 mb-2 h-16" // Uniform height and margin for each item
              >
                <MaterialIcons name="place" size={24} color="#065f46" />
                <View className="ml-4 flex-1 justify-center space-y-1">
                  <Text
                    className="font-medium text-gray-900 text-base truncate"
                    numberOfLines={1} // Truncate text after one line
                  >
                    {item.description}
                  </Text>
                  <Text
                    className="text-gray-500 text-sm truncate"
                    numberOfLines={1} // Truncate text after one line
                  >
                    {item.structured_formatting?.secondary_text}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 64 }} // Padding to prevent hiding behind navbar
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View className="mt-4">
          <Text className="text-gray-500 text-center font-psemibold">
            No suggestions available. Try searching for another location.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Travel;
