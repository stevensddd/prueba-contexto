import React, { useState } from "react";
import { Text, Image, View, Button, TextInput, StyleSheet } from "react-native";

const Contexto = () => {
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [arreglo, setArreglo]= useState([]);


  const enviarPregunta = async () => {
    const formDataPregunta = new FormData(); 

    formDataPregunta.append("text",  pregunta);
    

    const opcionesPregunta = {
      method: 'POST',
      body: formDataPregunta,
    };

    try {
      const responsePRE = await fetch('http://192.168.100.20:5000/clasificar', opcionesPregunta); 
    
      const data = await responsePRE.json(); // Analizar el cuerpo de la respuesta JSON
      
      arreglo.push(data.respuesta)
      setRespuesta(data.respuesta);
      console.log(respuesta)
      
      
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
    
      <Text style={styles.title}>Ingrese su texto:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escriba aquí..."
        onChangeText={setPregunta}
      />
      <Button title="Enviar" onPress={enviarPregunta} />
      <Text style={styles.respuestaText}>{respuesta}</Text>
      <Text style={styles.title}>Historial</Text>
      <Text style={styles.respuestaText}>{arreglo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'relative', // Agrega posición relativa al contenedor principal
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
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

export default Contexto;
