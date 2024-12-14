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
          mode: "rickshaw",
          coordinates:  [
            { latitude: 19.18431349368039, longitude: 72.96261582697532 },
            { latitude: 19.18340834627806, longitude: 72.96280367351345 },
            { latitude: 19.183627243807422, longitude: 72.96494752145206 },
            { latitude: 19.186100765668197, longitude: 72.96406680554215 },
            { latitude: 19.188202135579022, longitude: 72.96359168248549 },
            { latitude: 19.18854866275018, longitude: 72.96373539966302 },
            { latitude: 19.18844179104889, longitude: 72.96379633117067 },
            { latitude: 19.18782522218677, longitude: 72.96537184586849 },
            { latitude: 19.18755393115393, longitude: 72.96672104365776 },
            { latitude: 19.18738129117692, longitude: 72.9681659909479 },
            { latitude: 19.187077115531803, longitude: 72.96938462115284 },
            { latitude: 19.18707711553109, longitude: 72.97043786580717 },
            { latitude: 19.187783014836782, longitude: 72.97368225759068 },
            { latitude: 19.18784652739307, longitude: 72.97410678683654 },
            { latitude: 19.187777516801145, longitude: 72.97586046423793 },
            { latitude: 19.18774301149433, longitude: 72.97713918734311 },
            { latitude: 19.18682861822887, longitude: 72.9769565126138 }
          ]
          ,
        },
        {
          icon: <MaterialIcons name="train" size={24} color="#32CD32" />, // Train
          description: "20 min",
          mode: "train",
          coordinates: [
            { latitude: 19.18616764024853, longitude: 72.97641071238809 },
            { latitude: 19.185300028649145, longitude: 72.97331032215483 },
            { latitude: 19.184360110908578, longitude: 72.97074580174342 },
            { latitude: 19.183287634115416, longitude: 72.96875542766769 },
            { latitude: 19.18209464610807, longitude: 72.96707126502878 },
            { latitude: 19.180238869811912, longitude: 72.96513192620922 },
            { latitude: 19.17764797828969, longitude: 72.96243981764763 },
            { latitude: 19.176575457773733, longitude: 72.96138083649414 },
            { latitude: 19.173177088289535, longitude: 72.95792319949635 },
            { latitude: 19.170574034438253, longitude: 72.95529488496413 },
            { latitude: 19.167790167500737, longitude: 72.95310036997715 },
            { latitude: 19.16476521981184, longitude: 72.95125034283127 },
            { latitude: 19.162583848590042, longitude: 72.95025515582131 },
            { latitude: 19.159848054904327, longitude: 72.94923445114924 },
            { latitude: 19.15749342554412, longitude: 72.9482656028524 },
            { latitude: 19.154311607073442, longitude: 72.94665799303405 },
            { latitude: 19.151370780857626, longitude: 72.94461658371796 },
            { latitude: 19.147189413579635, longitude: 72.94137223027286 },
            { latitude: 19.142175298020536, longitude: 72.93762114066662 },
            { latitude: 19.138836487556382, longitude: 72.93496730857964 },
            { latitude: 19.13336406734564, longitude: 72.93076966070885 },
            { latitude: 19.13176087900863, longitude: 72.92965964430043 },
            { latitude: 19.129289768889038, longitude: 72.92857514565917 },
            { latitude: 19.126927111899576, longitude: 72.92800099929813 },
            { latitude: 19.124371546944506, longitude: 72.92789892883778 },
            { latitude: 19.120333191521336, longitude: 72.92805203454226 },
            { latitude: 19.117331484308547, longitude: 72.92831996951274 },
            { latitude: 19.113594342943152, longitude: 72.9284475575907 },
            { latitude: 19.110737181118463, longitude: 72.92830721069502 },
            { latitude: 19.106623469236048, longitude: 72.92728850478444 },
            { latitude: 19.103995253596672, longitude: 72.92621676491717 },
            { latitude: 19.102162711545418, longitude: 72.92519606021285 },
            { latitude: 19.099570594417035, longitude: 72.92320568612377 },
            { latitude: 19.097508928094545, longitude: 72.92121531210252 },
            { latitude: 19.093313176950012, longitude: 72.91718352871703 },
            { latitude: 19.090528007487443, longitude: 72.91450417892366 },
            { latitude: 19.08757398872643, longitude: 72.91113585359135 },
            { latitude: 19.086006528806585, longitude: 72.90894133865446 }
          ],
        },
        {
          icon: <MaterialIcons name="tram" size={24} color="#0000FF" />, // Metro
          description: "22 min",
          mode: "metro",
          coordinates:  [
            { latitude: 19.086769924067397, longitude: 72.90807468738724 },
            { latitude: 19.089307076186884, longitude: 72.90784294466485 },
            { latitude: 19.090607622594348, longitude: 72.90772515154734 },
            { latitude: 19.090837046796935, longitude: 72.90765126306546 },
            { latitude: 19.09106647068156, longitude: 72.90744015311729 },
            { latitude: 19.091216094782855, longitude: 72.90710237720018 },
            { latitude: 19.091315844108568, longitude: 72.90669071280124 },
            { latitude: 19.091146270250853, longitude: 72.90570905138352 },
            { latitude: 19.091555242301947, longitude: 72.90399906071897 },
            { latitude: 19.092467974940394, longitude: 72.90182699362528 },
            { latitude: 19.096427016236735, longitude: 72.89478673877092 },
            { latitude: 19.098254646671613, longitude: 72.892710845038 },
            { latitude: 19.101314797453185, longitude: 72.89078321079309 },
            { latitude: 19.101241937439873, longitude: 72.89086031597296 },
            { latitude: 19.1036754466228, longitude: 72.88799199609971 },
            { latitude: 19.104549752582955, longitude: 72.8864653096627 },
            { latitude: 19.107187214151498, longitude: 72.88392083235773 },
            { latitude: 19.107449500875365, longitude: 72.88299556777034 },
            { latitude: 19.10781378725966, longitude: 72.8805436170108 },
            { latitude: 19.107682644269136, longitude: 72.8809445647795 },
            { latitude: 19.10944578043306, longitude: 72.87604066313459 },
            { latitude: 19.112054021832268, longitude: 72.86763617737554 },
            { latitude: 19.113525692939945, longitude: 72.86339538174781 },
            { latitude: 19.11450194278472, longitude: 72.86125185235153 },
            { latitude: 19.114851642824554, longitude: 72.86015695598627 },
            { latitude: 19.11511391737536, longitude: 72.85782837369001 },
            { latitude: 19.116119299244172, longitude: 72.85651758240347 },
            { latitude: 19.123915097930695, longitude: 72.84255843347863 },
            { latitude: 19.124279989759973, longitude: 72.8420563655027 },
            { latitude: 19.125173971263834, longitude: 72.84161222856764 },
            { latitude: 19.12583077091907, longitude: 72.84103291952188 },
            { latitude: 19.12625039155408, longitude: 72.84033774866697 },
            { latitude: 19.12698016403301, longitude: 72.83751844464429 }
          ]
          ,
        },
        {
          icon: <FontAwesome5 name="walking" size={24} color="#FFA500" />, // Walk
          description: "7 min",
          mode: "walking",
          coordinates:  [
            { latitude: 19.12688517063067, longitude: 72.83769161186544 },
            { latitude: 19.1273909105343, longitude: 72.83413087927664 },
            { latitude: 19.124282667182747, longitude: 72.83335957750974 },
            { latitude: 19.12431241141538, longitude: 72.83356420859076 },
            { latitude: 19.12289955445295, longitude: 72.83346976347644 },
            { latitude: 19.123063149035417, longitude: 72.83658645224885 },
            { latitude: 19.12411907380764, longitude: 72.836633674806 }
          
          ],
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
          mode: "rickshaw",
          coordinates: [
            { latitude: 19.18434, longitude: 72.96341 },
            { latitude: 19.18500, longitude: 72.96400 },
          ],
        },
        {
          icon: <MaterialIcons name="train" size={24} color="#32CD32" />,
          description: "35 min",
          mode: "train",
          coordinates: [
            { latitude: 19.18500, longitude: 72.96400 },
            { latitude: 19.25000, longitude: 73.00000 },
          ],
        },
        {
          icon: <MaterialIcons name="train" size={24} color="#32CD32" />,
          description: "24 min",
          mode: "train",
          coordinates: [
            { latitude: 19.25000, longitude: 73.00000 },
            { latitude: 19.27500, longitude: 73.02000 },
          ],
        },
        {
          icon: <FontAwesome5 name="taxi" size={24} color="#FFA500" />,
          description: "9 min",
          mode: "rickshaw",
          coordinates: [
            { latitude: 19.27500, longitude: 73.02000 },
            { latitude: 19.28000, longitude: 73.03000 },
          ],
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
          mode: "walking",
          coordinates: [
            { latitude: 19.18434, longitude: 72.96341 },
            { latitude: 19.18500, longitude: 72.96400 },
          ],
        },
        {
          icon: <FontAwesome5 name="bus" size={24} color="#32CD32" />,
          description: "58 min",
          mode: "bus",
          coordinates: [
            { latitude: 19.18500, longitude: 72.96400 },
            { latitude: 19.27500, longitude: 73.00000 },
          ],
        },
        {
          icon: <FontAwesome5 name="taxi" size={24} color="#FFA500" />,
          description: "10 min",
          mode: "rickshaw",
          coordinates: [
            { latitude: 19.27500, longitude: 73.00000 },
            { latitude: 19.28000, longitude: 73.01000 },
          ],
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
          mode: "rickshaw",
          coordinates: [
            { latitude: 19.18434, longitude: 72.96341 },
            { latitude: 19.21500, longitude: 72.97000 },
          ],
        },
        {
          icon: <MaterialIcons name="tram" size={24} color="#0000FF" />,
          description: "22 min",
          mode: "metro",
          coordinates: [
            { latitude: 19.21500, longitude: 72.97000 },
            { latitude: 19.24000, longitude: 72.99000 },
          ],
        },
        {
          icon: <FontAwesome5 name="walking" size={24} color="#FFA500" />,
          description: "7 min",
          mode: "walking",
          coordinates: [
            { latitude: 19.24000, longitude: 72.99000 },
            { latitude: 19.25000, longitude: 73.00000 },
          ],
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
          mode: "cab",
          coordinates: [
            { latitude: 19.18434, longitude: 72.96341 },
            { latitude: 19.28000, longitude: 73.03000 },
          ],
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
    <ScrollView className="flex-1 bg-gray-100 p-4">

      {/* Tabs */}
      <View className="flex-row justify-around mt-2 mb-2 pb-2">
        <TouchableOpacity
          onPress={() => setSelectedTab("quickest")}
          className={`px-4 py-2 rounded-full ${
            selectedTab === "quickest" ? "bg-emerald-700" : "bg-gray-200"
          }`}
        >
          <Text
            className={`text-base font-semibold ${
              selectedTab === "quickest" ? "text-white" : "text-gray-700"
            }`}
          >
            Quickest
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("cheapest")}
          className={`px-4 py-2 rounded-full ${
            selectedTab === "cheapest" ? "bg-emerald-700" : "bg-gray-200"
          }`}
        >
          <Text
            className={`text-base font-semibold ${
              selectedTab === "cheapest" ? "text-white" : "text-gray-700"
            }`}
          >
            Cheapest
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("greenest")}
          className={`px-4 py-2 rounded-full ${
            selectedTab === "greenest" ? "bg-emerald-700" : "bg-gray-200"
          }`}
        >
          <Text
            className={`text-base font-semibold ${
              selectedTab === "greenest" ? "text-white" : "text-gray-700"
            }`}
          >
            Greenest
          </Text>
        </TouchableOpacity>
      </View>

      {/* Route Cards */}
      {getSortedRoutes().map((route) => (
        <RouteCard
          key={route.id}
          route={route}
          className="bg-white p-4 mb-4 rounded-xl shadow-md"
        />
      ))}
    </ScrollView>
  );
};

export default RoutesScreen;
