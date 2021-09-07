import React, {useState} from "react";
import MapView, { Marker } from "react-native-maps";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";

import { globalStyles } from "../../config/globalStyles";
import Card from "../../components/Card";
import { restaurants } from "./HomeScreen";

export interface IMarkerObject {
  coordinate: {
    latitude: number,
    longitude: number,
  },
  title: string,
  description: string,
}

const markers: IMarkerObject[] = [
  {
    coordinate: {
      latitude: 34.072778,
      longitude: -118.441944,
    },
    title: 'Royce Hall',
    description: '340 Royce Drive'
  },
  {
    coordinate: {
      latitude: 34.070211,
      longitude: -118.446775,
    },
    title: 'Pauley Pavilion',
    description: '301 Westwood Plaza'
  },
  {
    coordinate: {
      latitude: 34.073582702728885,
      longitude: -118.4522479327651,
    },
    title: 'Hedrick Hall',
    description: '250 De Neve Dr'
  },
];

const MapScreen = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: 34.0689,
    longitude: -118.4452,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015
  });

  return (
    <ScrollView>
      <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={region => setRegion(region)}
      >
        {markers.map((marker, index) => (
            <Marker
                key={index}
                coordinate={{
                  latitude: marker.coordinate.latitude,
                  longitude: marker.coordinate.longitude,
                }}
                title={marker.title}
                description={marker.description}
            />
        ))}
      </MapView>
      <Text style={globalStyles.headerText}>restaurants</Text>
      <FlatList
        nestedScrollEnabled={true}
        horizontal={true}
        data={restaurants}
        renderItem={({ item }) => <Card item={item} navigation={navigation} />}
        keyExtractor={(item) => item.name}
      />
    </ScrollView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.7,
  },
});
