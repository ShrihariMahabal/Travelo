import React from "react";
import { TouchableHighlight, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {router} from "expo-router";

const calculateEndTime = (startTime, totalTimeInMinutes) => {
  const [hours, minutes] = startTime.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  date.setMinutes(date.getMinutes() + totalTimeInMinutes);
  const endHours = String(date.getHours()).padStart(2, "0");
  const endMinutes = String(date.getMinutes()).padStart(2, "0");
  return `${endHours}:${endMinutes}`;
};

const RouteCard = ({ route, onPress, startTime = "11:30" }) => {
  const endTime = calculateEndTime(startTime, route.totalTime);
  const greenColor = "#065f46";

  return (
    <TouchableHighlight
      className="bg-white p-4 my-2 rounded-lg border shadow-sm border-gray-200"
      onPress= {() => router.push({
          pathname: "/mapscreen", 
          params: {
          id: route.id,
          name: route.name,
          description: route.description,
          totalTime: route.totalTime,
          carbonSavings: route.carbonSavings,
          totalCost: route.totalCost,
          steps: route.steps
         }})}

       underlayColor="#f0f0f0"
    >
      <>
        {/* Steps Section */}
        <View className="flex-row items-center justify-between my-3">
          {route.steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Travel Step */}
              <View className="items-center mx-3">
                {React.cloneElement(step.icon, { color: greenColor, size: 24 })}
                <Text
                  className="text-xs text-gray-600 mt-1 text-center font-medium"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {step.description}
                </Text>
              </View>

              {/* Arrow Icon (Only between steps) */}
              {index < route.steps.length - 1 && (
                <MaterialIcons name="arrow-right-alt" size={24} color="#A0A0A0" />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Divider Line */}
        <View className="border-b border-gray-200 my-3" />

        {/* Route Summary */}
        <View>
          {/* Start and End Times */}
          <View className="flex-row items-center justify-between mt-3">
            <Text className="text-lg font-bold text-gray-800">{startTime}</Text>
            <Text className="text-lg font-bold text-gray-800">{endTime}</Text>
          </View>

          {/* Locations */}
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-sm text-gray-500 font-medium">Teen Hath Naka</Text>
            <Text className="text-sm text-gray-500 font-medium">Andheri West</Text>
          </View>

          {/* Divider Line */}
          <View className="border-b border-gray-200 my-3" />

          {/* Fare Section */}
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-medium text-gray-600">Fare</Text>
            <Text className="text-emerald-700 font-bold text-lg">
              ₹{route.totalCost}
            </Text>
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
};

export default RouteCard;
