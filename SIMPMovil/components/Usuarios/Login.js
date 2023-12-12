import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './AuthContext'; // Importa el contexto

const Login = () => {
  const [Correo, setCorreo] = useState('');
  const [Clave, setClave] = useState('');
  const navigation = useNavigation();
  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!Correo || !Clave) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (!isValidCorreo(Correo)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.10:3000/login', {
        Correo,
        Clave,
      });

      console.log("TOKEN",response.data,"TOKEN");

      if (response.status === 200 && response.data) {
        // Llama a la función signIn del contexto para almacenar el token
        signIn(response.data);
        console.log('¡Inicio de sesión exitoso!');
        navigation.navigate('Usuarios');
      } else {
        Alert.alert('Error', 'Inicio de sesión fallido. Verifica tus credenciales.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Hubo un problema al intentar iniciar sesión.');
    }
  };

  const isValidCorreo = (Correo) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(Correo);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a SIMP</Text>

      <Text style={styles.label}>Correo:</Text>
      <TextInput
        style={styles.input}
        value={Correo}
        onChangeText={(text) => setCorreo(text)}
        placeholder="Ingresa tu Correo"
      />

      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={Clave}
        onChangeText={(text) => setClave(text)}
        placeholder="Ingresa tu contraseña"
        secureTextEntry
      />

      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default Login;
