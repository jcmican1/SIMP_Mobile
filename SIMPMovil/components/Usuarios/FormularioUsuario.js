import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Picker,
} from 'react-native';

const FormularioUsuario = ({ onSubmit }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [rolIdRol, setRolIdRol] = useState('');
  const [estadoIdEstado, setEstadoIdEstado] = useState('');

  const roles = ['Admin', 'Usuario', 'Invitado'];
  const estados = ['Activo', 'Inactivo'];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    // Validar que ningún campo esté vacío
    if (
      !nombreUsuario ||
      !apellido ||
      !correo ||
      !clave ||
      !rolIdRol ||
      !estadoIdEstado
    ) {
      alert('Por favor, completa todos los campos del formulario.');
      return; // Detener la ejecución si hay campos vacíos
    }

    // Validar el campo de correo electrónico
    if (!emailRegex.test(correo)) {
      alert('Correo electrónico no válido');
      return; // Detener la ejecución si la validación del correo electrónico falla
    }

    const formData = {
      nombreUsuario,
      apellido,
      correo,
      clave,
      rolIdRol,
      estadoIdEstado,
    };

    onSubmit(formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de Usuario:</Text>
      <TextInput
        style={styles.input}
        value={nombreUsuario}
        onChangeText={setNombreUsuario}
      />

      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
      />

      <Text style={styles.label}>Correo:</Text>
      <TextInput
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Clave:</Text>
      <TextInput
        style={styles.input}
        value={clave}
        onChangeText={setClave}
        secureTextEntry
      />

      <Text style={styles.label}>Rol:</Text>
      <Picker
        style={styles.input}
        selectedValue={rolIdRol}
        onValueChange={(itemValue) => setRolIdRol(itemValue)}>
        {roles.map((role) => (
          <Picker.Item key={role} label={role} value={role} />
        ))}
      </Picker>

      <Text style={styles.label}>Estado:</Text>
      <Picker
        style={styles.input}
        selectedValue={estadoIdEstado}
        onValueChange={(itemValue) => setEstadoIdEstado(itemValue)}>
        {estados.map((estado) => (
          <Picker.Item key={estado} label={estado} value={estado} />
        ))}
      </Picker>

      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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

export default FormularioUsuario;
