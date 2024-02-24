import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import MapView, {
  Callout,
  MapCallout,
  MapMarker,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import Images from "../images";

const DirectionScreen = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const center = {
    latitude: 5.55164,
    longitude: -0.194864,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const markers = [
    { name: "loc-1", location: { latitude: 5.559642, longitude: -0.195583 } },
    { name: "loc-2", location: { latitude: 5.557207, longitude: -0.189261 } },
    { name: "loc-3", location: { latitude: 5.55164, longitude: -0.194864 } },
    { name: "loc-4", location: { latitude: 5.557739, longitude: -0.178414 } },
    { name: "loc-5", location: { latitude: 5.552438, longitude: -0.185148 } },
  ];
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <View>
        <MapView
          style={{ width: "100%", height: "100%" }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          minZoomLevel={5}
          region={center}
        >
          <View>
            {markers.map((marker) => {
              return (
                <Marker
                  coordinate={marker.location}
                  key={marker.name}
                  onPress={() => handleMarkerPress(marker)}
                >
                  <Image
                    source={{
                      uri: "https://img.icons8.com/?size=256&id=NuiM0K3RQiBQ&format=png",
                    }}
                    style={{ width: 40, height: 40 }}
                  />
                  {selectedMarker && selectedMarker.name === marker.name && (
                    <Callout>
                      <View  style={{ width: 100}}>
                        <Text>Accra Mall</Text>
                        <Text>This a paragraph</Text>
                      </View>
                    </Callout>
                  )}
                </Marker>
              );
            })}
          </View>
        </MapView>
      </View>
    </View>
  );
};

export default DirectionScreen;
