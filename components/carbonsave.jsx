import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const CarbonSave = () => {
    return (
        <View className="flex-row items-center px-2 py-1 rounded-lg bg-green-100 self-start">
        <FontAwesome5 name="leaf" size={16} color="#16a34a" className="mr-2" />
        <View>
            <Text className="text-xs font-medium text-green-600">Carbon Save</Text>
            <Text className="text-md font-bold text-green-600">186.14 gram</Text>
        </View>
        </View>
    );
};

export default CarbonSave;