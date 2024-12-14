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
          start: "Teen Hath Naka",
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
          start: "Thane Station",
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
          start: "Ghatkopar Station",
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
          start: "Azad Nagar Metro Station",
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
          start: "Teen Hath Naka",
          icon: <FontAwesome5 name="taxi" size={24} color="#FFA500" />,
          description: "10 min",
          mode: "rickshaw",
          coordinates: [
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
          ],
        },
        {
          start: "Thane Station",
          icon: <MaterialIcons name="train" size={24} color="#32CD32" />,
          description: "35 min",
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
          { latitude: 19.086006528806585, longitude: 72.90894133865446 },
            { latitude: 19.085357133101997, longitude: 72.90781945504366 },
            { latitude: 19.08426210682816, longitude: 72.90584534930672 },
            { latitude: 19.08310623788735, longitude: 72.9033991746969 },
            { latitude: 19.081918066085628, longitude: 72.90094422316493 },
            { latitude: 19.08107650127211, longitude: 72.89958166099814 },
            { latitude: 19.079302103622787, longitude: 72.89731787664657 },
            { latitude: 19.076280514168744, longitude: 72.89338039386756 },
            { latitude: 19.074333689062204, longitude: 72.89079474434305 },
            { latitude: 19.071808866203302, longitude: 72.88760828000939 },
            { latitude: 19.06929414496924, longitude: 72.88443254455328 },
            { latitude: 19.067397938789338, longitude: 72.88217948896697 },
            { latitude: 19.066008725842398, longitude: 72.88043068866583 },
            { latitude: 19.06520764157209, longitude: 72.8793792627842 },
            { latitude: 19.065461149671243, longitude: 72.8791003130605 },
            { latitude: 19.063270826859668, longitude: 72.87635373103191 },
            { latitude: 19.061952563060867, longitude: 72.87471221910096 },
            { latitude: 19.06015767936977, longitude: 72.8728775881726 },
            { latitude: 19.0583158682382, longitude: 72.87139920557631 },
            { latitude: 19.054890417023255, longitude: 72.86900017165352 },
            { latitude: 19.05341997089549, longitude: 72.86794874571169 },
            { latitude: 19.051848100294457, longitude: 72.86684367558635 },
            { latitude: 19.049393924138702, longitude: 72.86512706175402 },
            { latitude: 19.046655750899525, longitude: 72.86318514248214 },
            { latitude: 19.046493032816823, longitude: 72.86337827348919 },
            { latitude: 19.043295027922127, longitude: 72.86123107559634 },
            { latitude: 19.04071952319182, longitude: 72.85941768580183 },
            { latitude: 19.038399829107025, longitude: 72.85775766726933 },
            { latitude: 19.035611036343916, longitude: 72.8558450372458 },
            { latitude: 19.03405884392963, longitude: 72.85480752565421 },
            { latitude: 19.032114318666935, longitude: 72.85351740253526 },
            { latitude: 19.029905378598848, longitude: 72.85199271163218 },
            { latitude: 19.028054622399708, longitude: 72.85071161037989 },
            { latitude: 19.025794454393324, longitude: 72.84916887578962 },
            { latitude: 19.02487332048324, longitude: 72.84860049988556 },
            { latitude: 19.02183695410289, longitude: 72.84657058598603 },
            { latitude: 19.019841110013193, longitude: 72.84517220082738 },
            { latitude: 19.018297299621175, longitude: 72.84408055812187 },
            { latitude: 19.01697524069602, longitude: 72.84307011211644 }
          ],
        },
        {
          start: "Dadar Station",
          icon: <MaterialIcons name="train" size={24} color="#32CD32" />,
          description: "24 min",
          mode: "train",
          coordinates:  [
            { latitude: 19.01892298344224, longitude: 72.84296610990116 },
            { latitude: 19.026821252173036, longitude: 72.8465350315216 },
            { latitude: 19.031057790286308, longitude: 72.8478328212768 },
            { latitude: 19.03379902199805, longitude: 72.84823838055185 },
            { latitude: 19.03428578789045, longitude: 72.84819853580163 },
            { latitude: 19.035244247032395, longitude: 72.84813770191037 },
            { latitude: 19.03790873438147, longitude: 72.84781325449033 },
            { latitude: 19.0394997388138, longitude: 72.84746852910654 },
            { latitude: 19.04041983091164, longitude: 72.84708324778823 },
            { latitude: 19.051468988240337, longitude: 72.84201108491828 },
            { latitude: 19.05692928508738, longitude: 72.83994215146271 },
            { latitude: 19.060192494532952, longitude: 72.83921954468913 },
            { latitude: 19.06239322735332, longitude: 72.83917939987103 },
            { latitude: 19.064461130800556, longitude: 72.8397614997255 },
            { latitude: 19.06960232003058, longitude: 72.84036367199715 },
            { latitude: 19.08165277670231, longitude: 72.8417338619084 },
            { latitude: 19.10035556713277, longitude: 72.84427108927201 },
            { latitude: 19.116399520878108, longitude: 72.8464682288221 },
            { latitude: 19.12003753908205, longitude: 72.84702132306626 }
          ]
          ,
        },
        {
          start: "Andheri Station",
          icon: <FontAwesome5 name="taxi" size={24} color="#FFA500" />,
          description: "9 min",
          mode: "rickshaw",
          coordinates: [
            { latitude: 19.120877195795938, longitude: 72.84607729160598 },
            { latitude: 19.122057173644567, longitude: 72.8462816543422 },
            { latitude: 19.123698401576835, longitude: 72.84290966909855 },
            { latitude: 19.124170385695045, longitude: 72.84204680413217 },
            { latitude: 19.12504998881548, longitude: 72.84158131123299 },
            { latitude: 19.125446881373268, longitude: 72.84133153455537 },
            { latitude: 19.12595104081518, longitude: 72.84066167891994 },
            { latitude: 19.12684249586294, longitude: 72.83766201239136 },
            { latitude: 19.127140679987992, longitude: 72.83619443833469 },
            { latitude: 19.127140679987992, longitude: 72.83497935013722 },
            { latitude: 19.127185407560344, longitude: 72.83422189252302 },
            { latitude: 19.124338827948954, longitude: 72.83340685210418 },
            { latitude: 19.124251172665463, longitude: 72.83353441849343 },
            { latitude: 19.122925380832463, longitude: 72.83349962765999 },
            { latitude: 19.122925380832463, longitude: 72.83659601183575 },
            { latitude: 19.124119689653064, longitude: 72.83657281794679 }
          ]
          ,
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
          start: "Teen Hath Naka",
          icon: <FontAwesome5 name="walking" size={24} color="#FFA500" />,
          description: "10 min",
          mode: "walking",
          coordinates: [
            { latitude: 19.184216460924198, longitude: 72.96248551551896 },
            { latitude: 19.184223179208136, longitude: 72.96228989955864 },
            { latitude: 19.1834136240189, longitude: 72.96281272767078 },
            { latitude: 19.18340018738024, longitude: 72.96152166230985 },
            { latitude: 19.183430419805703, longitude: 72.96142207600278 },
            { latitude: 19.18365212409914, longitude: 72.96122646000565 },
            { latitude: 19.185650808352275, longitude: 72.96058981895577 },
            { latitude: 19.185751581721565, longitude: 72.9605862622935 },
            { latitude: 19.18649394351903, longitude: 72.96081388813825 },
            { latitude: 19.18825244834447, longitude: 72.9635203540609 },
            { latitude: 19.187937689628768, longitude: 72.96362776342453 },

          
          
          ],
        },
        {
          start: "Teen Hath Naka Bus Stop",
          icon: <FontAwesome5 name="bus" size={24} color="#32CD32" />,
          description: "58 min",
          mode: "bus",
          coordinates: [
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
          ],
        },
        {
          start: "Azad Nagar Bus Stop",
          icon: <FontAwesome5 name="taxi" size={24} color="#FFA500" />,
          description: "10 min",
          mode: "rickshaw",
          coordinates: [
            { latitude: 19.127336916746916, longitude: 72.83404016026842 },
            { latitude: 19.124397298169534, longitude: 72.83337497246575 },
            { latitude: 19.12307952112099, longitude: 72.83348226082526 },
            { latitude: 19.122998426806703, longitude: 72.83657216545699 },
            { latitude: 19.123505265618093, longitude: 72.8360571813517 },
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
          start: "Teen Hath Naka",
          icon: <FontAwesome5 name="taxi" size={24} color="#FFA500" />,
          description: "29 min",
          mode: "rickshaw",
          coordinates: [
            { latitude: 19.184221839533937, longitude: 72.96247515806687 },
            { latitude: 19.184230668245505, longitude: 72.962278853956 },
            { latitude: 19.183409596973252, longitude: 72.9628303750189 },
            { latitude: 19.183595000521592, longitude: 72.96496167675355 },
            { latitude: 19.186155313907427, longitude: 72.96404559095537 },
            { latitude: 19.18792985257481, longitude: 72.96366233055572 },
            { latitude: 19.18504290678192, longitude: 72.96484950301317 },
            { latitude: 19.18030184918857, longitude: 72.96673776171994 },
            { latitude: 19.17791237082114, longitude: 72.96784563907393 },
            { latitude: 19.174742714921837, longitude: 72.9686402033382 },
            { latitude: 19.17443369224867, longitude: 72.96864020332576 },
            { latitude: 19.17172309743166, longitude: 72.96819150822373 },
            { latitude: 19.17067239878534, longitude: 72.96788303027782 },
            { latitude: 19.15553806425104, longitude: 72.95767521617095 },
            { latitude: 19.12702266229919, longitude: 72.93994895062487 },
            { latitude: 19.087912216829373, longitude: 72.92383658427808 },
            { latitude: 19.086901554558136, longitude: 72.92356559805857 },
            { latitude: 19.088028958493382, longitude: 72.91801817492572 },
            { latitude: 19.089344253398174, longitude: 72.91682518076888 },
            { latitude: 19.089926737803317, longitude: 72.91543335425257 },
            { latitude: 19.091129279810552, longitude: 72.91404152759375 },
            { latitude: 19.09204997009917, longitude: 72.91157600633629 },
            { latitude: 19.08926909398714, longitude: 72.90789760743651 },
            // { latitude: 19.087765898274885, longitude: 72.9079771403803 }
          
          ],
        },
        {
          start: "Ghatkopar Metro Station",
          icon: <MaterialIcons name="tram" size={24} color="#0000FF" />,
          description: "22 min",
          mode: "metro",
          coordinates: [
            // { latitude: 19.086769924067397, longitude: 72.90807468738724 },
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
          start: "Azad Nagar Metro Station",
          icon: <FontAwesome5 name="walking" size={24} color="#FFA500" />,
          description: "7 min",
          mode: "walking",
          coordinates: [
            { latitude: 19.12688517063067, longitude: 72.83769161186544 },
            { latitude: 19.1273909105343, longitude: 72.83413087927664 },
            { latitude: 19.124282667182747, longitude: 72.83335957750974 },
            { latitude: 19.12431241141538, longitude: 72.83356420859076 },
            { latitude: 19.12289955445295, longitude: 72.83346976347644 },
            { latitude: 19.123063149035417, longitude: 72.83658645224885 },
            { latitude: 19.12411907380764, longitude: 72.836633674806 }
          ]
          ,
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
          start: "Teen Hath Naka",
          icon: <FontAwesome5 name="taxi" size={24} color="#FFA500" />,
          description: "59 min",
          mode: "cab",
          coordinates: [
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
          ],
        },
      ],
    },
  ];
  
  const { id, name, description} = useLocalSearchParams();
  const route = routes[id-1];
  // console.log(route);
  return (
    <SafeAreaView className="flex h-full bg-background">
  
  <View style={StyleSheet.absoluteFill}>
  <MapView
    style={StyleSheet.absoluteFillObject}
    initialRegion={INITIAL_REGION}
  >
    {route.steps.map((step, stepIndex) => (
      <>
        {/* Polyline for each step */}
        <Polyline
          key={`polyline-${stepIndex}`} // Ensure the key is unique for each Polyline
          coordinates={step.coordinates}
          strokeColor={MODE_COLORS[step.mode]} // Use color based on mode
          strokeWidth={4}
        />

        {/* Start Marker */}
        <Marker
          key={`start-${stepIndex}`} // Ensure the key is unique for each Start Marker
          coordinate={step.coordinates[0]}
          pinColor={stepIndex === 0 ? 'red' : '#89CFF0'} // First step: red, else #f0f0f0
          title={`${step.start}`}
          description={step.description}
        />

        {/* End Marker for the last step */}
        {stepIndex === route.steps.length - 1 ? (
          <Marker
            key={`end-${stepIndex}`} // Ensure the key is unique for each End Marker
            coordinate={step.coordinates[step.coordinates.length - 1]}
            pinColor="red"  // End of last step: red
            title={"Sardar Patel Institute of Technology"}
            description={step.description}
          />
        ) : null}
      </>
    ))}
  </MapView>
</View>

    </SafeAreaView>
  );
};

export default mapscreen;

const styles = StyleSheet.create({});
