import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });


    console.log(pickerResult);
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  }; 

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 305, height: 159 }} /> 
      <Image source={{ uri: "https://image5jvqbd.fmkorea.com/files/attach/new/20200113/486616/1995360715/2598643674/ee7596f329d837951fe0be9cfd30a97a.png" }} style={styles.logo} />

      <Text style={styles.instructions} >
        awwawawawwawawaawawawawwaawawawawaw
        </Text>

        <TouchableOpacity
        onPress= {openImagePickerAsync}
        style={{ backgroundColor: 'blue' }}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34e5eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
    thumbnail: {
      width: 300,
      height: 300,
      resizeMode: "contain"
    },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#34e5eb',
    fontSize: 18,
    marginHorizontal: 15,
  }, 
});