import { Image, ImageSource } from "expo-image";
import { StyleSheet } from "react-native";

type Props = {
  imageSource: ImageSource;
};

export default function ImageViewer({ imageSource }: Props) {
  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
