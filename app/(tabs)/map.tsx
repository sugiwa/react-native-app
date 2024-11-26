import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } else {
        console.log("位置情報の取得に失敗");
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={
          location && {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            longitudeDelta: 0.01,
            latitudeDelta: 0.01,
          }
        }
        // provider={PROVIDER_GOOGLE} // https://github.com/react-native-maps/react-native-maps/issues/5224
        showsUserLocation
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location?.coords.latitude + 0.01,
              longitude: location?.coords.longitude + 0.01,
            }}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
