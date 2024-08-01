import React from 'react';
import { View, StyleSheet, Image, Text, Linking, TouchableOpacity  } from 'react-native';
import { SocialIcon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';






const HomeScreen = () => {
const navigation = useNavigation();

// Función para dividir el array en grupos de tamaño específico
const chunk = (array, size) => {
  return array.reduce((chunks, element, index) => {
    index % size === 0
      ? chunks.push([element])
      : chunks[chunks.length - 1].push(element);
    return chunks;
  }, []);
};

//funcion para navegacion
const context = () => {
  navigation.navigate('Chat2');
};

const chatpdf = () => {
  navigation.navigate('Chat');
};



  const user = {
    avatar: "https://media.giphy.com/media/MIMMeXIfk2Dx20GXk5/giphy.gif",
    coverPhoto: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Steven Solórzano"
  };

  //utilizcion de la libreria de SocialIcons para los botones
  const socialIcons = [
    
    { type: "linkedin", url: "https://www.linkedin.com/in/steven-sol%C3%B3rzano-794a93320/" }
    // { type: "github", url: "" },
    // { type: "twitch", url: "" },
    // { type: "pinterest", url: "" },
    // { type: "steam", url: "" },
    // { type: "kwai",  onPress: kwai },
  ];

  // Dividir los iconos en grupos de 4
  const socialIconGroups = chunk(socialIcons, 4);

  return (
    <View style={styles.container}>
    
      <Image
        source={{ uri: user.coverPhoto }}
        style={styles.backgroundImage}
      />
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.title}>{user.name}</Text>
      </View>
  
 
      <View style={styles.socialContainer}>
        {socialIconGroups.map((group, index) => (
          <View key={index} style={styles.socialRow}>
            {group.map((icon, iconIndex) => (
              // Si el tipo es 'kwai', renderiza la imagen con TouchableOpacity
              icon.type === "kwai" ? (
                <TouchableOpacity key={iconIndex} onPress={icon.onPress}>
                  <Image
                    source={{ uri: 'https://scontent.fuio13-1.fna.fbcdn.net/v/t39.30808-1/352477448_218562007165072_2410409305293964572_n.png?stp=dst-png_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=596444&_nc_eui2=AeEwMsNWASuYWrlwQtqDfCgII4E6Q578xK4jgTpDnvzErtt161QlGeRBC-TQla9vKiz_Zinjfb64q1gRorBbnNc1&_nc_ohc=sW-DsWNJfe0AX-O_Tor&_nc_ht=scontent.fuio13-1.fna&oh=00_AfAIE6bCHMbBvlDcwWMvovVMKwBoDEYBBe6ehD1LN1FZAQ&oe=65DB2C6E' }}
                    style={{ width: 50, height: 50 , borderRadius: 25 }} // ajusta el tamaño según sea necesario
                  />
                </TouchableOpacity>
              ) : (
                // Si no, renderiza el componente SocialIcon
                <SocialIcon
                  key={iconIndex}
                  type={icon.type}
                  onPress={() => Linking.openURL(icon.url)}
                />
              )
            ))}
          </View>
        ))}
      </View>
      
      

      {/* Botón personalizado para otras acciones */}
      

      <Button
        title="Contexto"
        onPress={context}
        buttonStyle={styles.customButton}
      />
      <Button
        title="Chat PDF"
        onPress={chatpdf}
        buttonStyle={styles.customButton}
      />
    </View>
  );
 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Agrega posición relativa al contenedor principal
  },
  title: {
    fontSize: 30,
    marginBottom: 80,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  avatarContainer: {
    alignItems: 'center',

  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 10,
    borderColor: 'white',
  },
  socialContainer: {
    marginBottom: 60,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  customButton: {
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 75,
    borderRadius: 30,
    borderColor: '#FFFF',
    borderWidth: 3,
  },
});


export default HomeScreen;