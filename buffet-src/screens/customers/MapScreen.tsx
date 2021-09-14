import React, {useCallback, useRef, useState} from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions, View, Image, TouchableOpacity,
} from "react-native";
import Carousel from 'react-native-snap-carousel';
import colors from "../../config/colors";
import {baseText, boldText} from "../../config/globalStyles";

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
  image: string,
}

const markers: IMarkerObject[] = [
  {
    coordinate: {
      latitude: 34.072778,
      longitude: -118.441944,
    },
    title: 'Royce Hall',
    description: 'Lecture Hall',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Royce_Hall_edit.jpg',
  },
  {
    coordinate: {
      latitude: 34.070211,
      longitude: -118.446775,
    },
    title: 'Pauley Pavilion',
    description: 'Sports Venue',
    image: 'https://uclabruins.com/images/2016/6/7/151203_MBKC_0447.jpg',
  },
  {
    coordinate: {
      latitude: 34.073582702728885,
      longitude: -118.4522479327651,
    },
    title: 'Hedrick Hall',
    description: 'Residence Hall',
    image: 'https://wp.dailybruin.com/images/2019/12/Image-from-iOS-3.jpg',
  },
  {
    coordinate: {
      latitude: 34.06327500432117,
      longitude: -118.4479401715765,
    },
    title: 'In-N-Out',
    description: 'Fast Food',
    image: 'https://lh5.googleusercontent.com/p/AF1QipP3E4T46jxvnxsuEq53uyau4yAg5bbyCrpCP8E7=w426-h240-k-no',
  },
  {
    coordinate: {
      latitude: 33.95686462265021,
      longitude: -118.33078669093723,
    },
    title: 'Red Lobster',
    description: 'RED LOBSTER',
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/1a/98/39/d3/red-lobster.jpg',
  },
];

interface RenderMarkersProps {
  item: IMarkerObject;
  index: number;
}

const MapScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [carouselItems, setCarouselItems] = useState<IMarkerObject[]>(markers);
  const [markerItems, setMarkerItems] = useState<Marker[]>([]);
  const carouselRef = useRef(null);
  const mapRef = useRef(null);

  const [region, setRegion] = useState({
    latitude: 34.0689,
    longitude: -118.4452,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015
  });

  const renderCarouselItem = useCallback(({ item, index }: RenderMarkersProps) => {
    return (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => console.log(item)}
        >
          <Image
              source={{uri: item.image}}
              style={styles.cardImage}
          />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </View>
        </TouchableOpacity>
    );
  }, []);

  const onCarouselItemChange = (index) => {
    let location = carouselItems[index];

    mapRef.current.animateToRegion({
      latitude: location.coordinate.latitude,
      longitude: location.coordinate.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    })

    markerItems[index].showCallout();
  }

  const onMarkerPressed = (location, index) => {
    mapRef.current.animateToRegion({
      latitude: location.coordinate.latitude,
      longitude: location.coordinate.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    });

    carouselRef.current.snapToItem(index);
  }

  return (
      <View style={styles.container}>
        <MapView
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            style={styles.map}
            region={region}
            onRegionChangeComplete={region => setRegion(region)}
        >
          {
            markers.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={{
                      latitude: marker.coordinate.latitude,
                      longitude: marker.coordinate.longitude,
                    }}
                    title={marker.title}
                    onPress={() => onMarkerPressed(marker, index)}
                    ref={ref => markerItems[index] = ref}
                />
            ))
          }
        </MapView>
        <Text style={globalStyles.headerText}>restaurants</Text>
        <Carousel
            layout={"default"}
            ref={carouselRef}
            data={carouselItems}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={200}
            renderItem={renderCarouselItem}
            containerCustomStyle={styles.carousel}
            onSnapToItem={(index) => onCarouselItemChange(index)}
            removeClippedSubviews={false}
        />
      </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.7,
    // ...StyleSheet.absoluteFillObject,
  },
  bottom: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 30,
  },
  cardContainer: {
    backgroundColor: 'white',
    height: 160,
    width: 200,
    padding: 5,
    borderRadius: 24
  },
  cardImage: {
    height: 100,
    width: 200,
    top: 0,
    position: 'absolute',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24
  },
  cardText: {
    position: "absolute",
    height: 60,
    bottom: 0,
    left: 10,
  },
  cardTitle: {
    ...boldText,
    color: colors.primary,
    fontSize: 22,
    marginBottom: 0,
    padding: 0,
  },
  cardDesc: {
    ...baseText,
    color: colors.text,
    marginTop: 0,
    padding: 0,
  }
});
