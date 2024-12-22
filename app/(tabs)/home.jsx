import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const Home = () => {
  // Hardcoded data for past locations
  const pastLocations = [
    {
      id: "1",
      name: "Past Location 1",
      address: "Address For Past Location 1",
    },
    {
      id: "2",
      name: "Past Location 2",
      address: "Address For Past Location 2",
    },
    {
      id: "3",
      name: "Past Location 3",
      address: "Address For Past Location 3",
    },
  ];

  // Ride options
  const rideOptions = [
    { id: "1", name: "Cab", icon: "car" },
    { id: "2", name: "Bus", icon: "bus" },
    { id: "3", name: "Train", icon: "train" },
    { id: "4", name: "Metro", icon: "subway" },
  ];

  // Carousel data
  const carouselData = [
    {
      id: "1",
      title: "Carbon Emission Saved",
      description: "You have saved 25kg of CO2 emissions so far!",
      icon: "leaf",
      buttonText: "See More",
    },
    {
      id: "2",
      title: "Rides Completed",
      description: "You’ve completed 45 rides this month!",
      icon: "car",
      buttonText: "View Rides",
    },
    {
      id: "3",
      title: "Eco-Friendly Tips",
      description: "Discover tips to reduce your carbon footprint.",
      icon: "lightbulb",
      buttonText: "Learn More",
    },
  ];

  const [inputValue, setInputValue] = useState("");
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 4000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // Scroll to the current index when it changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  return (
    <SafeAreaView className="min-h-full bg-background px-4 pt-8">
      <FlatList
        className=""
        data={[1, 1, 1, 1, 1, 1]}
        renderItem={({ item, index }) => {
          return (
            <View className="w-full">
              {index === 0 && (
                /*Greeting Section*/ <View className="mx-4 mt-6">
                  <Text className="text-4xl font-pbold">Hi Nimit,</Text>
                </View>
              )}
              {index === 1 && (
                /*Search Section*/
                <TouchableHighlight
                  className="flex-row items-center bg-gray-100 rounded-full px-4 py-4 mt-4"
                  underlayColor="#e5e7eb" // Subtle highlight effect on press
                  onPress={() => router.push("/travel")} // Navigate to /travel
                >
                  <View className="flex-row items-center w-full">
                    <FontAwesome5
                      name="search"
                      size={18}
                      color="#6b7280"
                      className="mr-3 ml-1"
                    />
                    <Text className="text-lg text-gray-800 font-pmedium my-[1px]">
                      Where to?
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
              {index === 2 && (
                /*Past Locations Section*/ <FlatList
                  className="mt-4"
                  data={pastLocations.slice(0, 3)} // Display only the first 3 past locations
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableHighlight
                      underlayColor="#d1d5db" // Subtle background effect on press
                      onPress={() => {}} // Add navigation logic
                      className="rounded-lg overflow-hidden"
                    >
                      <View className="flex-row items-center bg-background p-3 rounded-lg shadow-md shadow-gray-400">
                        <MaterialIcons
                          name="location-on"
                          size={28}
                          color="#6b7280"
                        />
                        <View className="ml-3">
                          <Text className="font-psemibold text-lg text-gray-800">
                            {item.name}
                          </Text>
                          <Text className="font-pregular text-sm text-gray-500">
                            {item.address}
                          </Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                  )}
                  ItemSeparatorComponent={() => (
                    <View className="h-[1px] bg-gray-200 mx-3" /> // Horizontal separator
                  )}
                />
              )}
              {index === 3 && (
                /*Ride Options Section*/ <View className="mt-6">
                  <Text className="text-xl font-psemibold mb-3">
                    Ride Options
                  </Text>
                  <View className="flex-row justify-between">
                    {rideOptions.map((option) => (
                      <TouchableHighlight
                        key={option.id}
                        className="flex-1 items-center justify-center p-4 rounded-lg bg-gray-100 mx-2 shadow-sm"
                        underlayColor="#d1d5db" // Highlight color on press
                        onPress={() => {}}
                      >
                        <>
                          <FontAwesome5
                            name={option.icon}
                            size={24}
                            color="#065f46"
                          />
                          <Text className="mt-2 font-pmedium text-emerald-800">
                            {option.name}
                          </Text>
                        </>
                      </TouchableHighlight>
                    ))}
                  </View>
                </View>
              )}
              {index === 4 && (
                /*Carousel Section*/
                <View className="mt-8 mb-8">
                  <Text className="text-xl font-psemibold mb-3 text-gray-800">
                    Insights
                  </Text>
                  <FlatList
                    ref={carouselRef}
                    data={carouselData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    snapToAlignment="center"
                    snapToInterval={width * 0.9 + 16} // Card width + spacing
                    decelerationRate="fast"
                    renderItem={({ item }) => (
                      <View
                        className="bg-gray-100 rounded-xl p-5 mx-2 items-start shadow-md shadow-gray-400"
                        style={{ width: width * 0.9 }}
                      >
                        <View className="flex-row items-center mb-4">
                          <FontAwesome5
                            name={item.icon}
                            size={36}
                            color="#065f46"
                          />
                          <Text className="ml-3 text-lg font-psemibold text-gray-800">
                            {item.title}
                          </Text>
                        </View>

                        <Text className="text-base text-gray-600 mb-5 font-pregular">
                          {item.description}
                        </Text>

                        <TouchableOpacity className="self-end bg-emerald-700 rounded-full py-2 px-6">
                          <Text className="text-white font-psemibold text-sm">
                            {item.buttonText}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    contentContainerStyle={{
                      paddingHorizontal: 8, // Adds slight padding on the sides
                    }}
                  />
                </View>
              )}
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Home;