import React, { useState } from "react";
import { Text, View, Button, TextInput, StyleSheet,Image } from "react-native";
import * as ExpoDocumentPicker from "expo-document-picker";
//import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

const Pdf = () => {
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('Esperando PDF ....');

 

  const adjuntar = async () => {
    try {
      const result = await ExpoDocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        multiple: true, // Se capturan múltiples archivos pdfs
      });

      const results = result.assets
      console.log(results)

      //se agregan los pdfs a un formdata
      const formData = new FormData();
      results.forEach((file) => {
        formData.append('file', {
          uri: file.uri,
          type: file.mimeType,
          name: file.name,
        });
      });
  
      const response= await axios.post('http://192.168.100.20:5000/cargar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    
      
      if(response){
        alert("PDF listo")
      } 
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };


  const enviarPregunta = async () => {
    const formDataPregunta = new FormData(); 

    formDataPregunta.append("texto",  pregunta);

    const opcionesPregunta = {
      method: 'POST',
      body: formDataPregunta,
    };

    try {
      const responsePRE = await fetch('http://192.168.100.20:5000/preguntapdf', opcionesPregunta); 
    
      const data = await responsePRE.json(); // Analizar el cuerpo de la respuesta JSON
      setRespuesta(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }}
        style={styles.backgroundImage}
      />
      <Text style={styles.title}>Seleccione un PDF:</Text>
      <Button title="Adjuntar PDF" onPress={adjuntar} />
      <Text style={styles.title}>Ingrese su pregunta:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escriba aquí..."
        onChangeText={setPregunta}
      />
      <Button title="Enviar Pregunta" onPress={enviarPregunta} />
      <Text style={styles.respuestaText}>{respuesta}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: '80%',
  },
  respuestaText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Pdf;
