import React from "react";
import { TouchableOpacity, TouchableHighlight, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
      onPress={onPress} underlayColor="#f0f0f0"
    >
      {/* Route Name
      <Text className="text-lg font-semibold text-gray-800 mb-2">
        {route.name}
      </Text>

      {/* Divider Line */}
      {/* <View className="border-b border-gray-200 my-2" /> */}

      {/* Steps Section */}
      <>
      <View className="flex-row items-center justify-between my-2">
        {route.steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Travel Step */}
            <View className="items-center mx-2">
              {React.cloneElement(step.icon, { color: greenColor, size: 24 })}
              <Text
                className="text-xs text-gray-600 mt-1 text-center"
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
      <View className="border-b border-gray-200 my-2" />

      {/* Route Summary */}
      <View>
        {/* Total Time Section */}
        <View className="flex-row items-center justify-between mt-2">
            <Text className="text-lg font-bold text-gray-700">{startTime}</Text>
            <Text className="text-lg font-bold text-gray-700">{endTime}</Text>
        </View>
        <View className="flex-row items-center justify-between mb-2">
            <Text className="text-xs text-gray-500">Teen Hath Naka</Text>     
            <Text className="text-xs text-gray-500">Andheri West</Text>  
        </View>

        {/* Divider Line */}
        <View className="border-b border-gray-200 my-2" />

        {/* Cost Section */}
        <View className="flex-row items-center justify-between my-2 ">
          <Text className="text-md text-gray-700">Fare</Text>
          <Text className="text-emerald-800 font-bold">₹{route.totalCost}</Text>
        </View>
      </View>
      </>
    </TouchableHighlight>
  );
};

export default RouteCard;
