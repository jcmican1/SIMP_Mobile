import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FormularioUsuario = ({ onSubmit, data = {}, onUpdate }) => {
  const [NombreUsuario, setNombreUsuario] = useState(data.NombreUsuario || '');
  const [Apellido, setApellido] = useState(data.Apellido || '');
  const [Correo, setCorreo] = useState(data.Correo || '');
  const [Clave, setClave] = useState(data.Clave || '');
  const [DescripcionRol, setRolIdRol] = useState(data.DescripcionRol || '');
  const [DescripcionEstado, setEstadoIdEstado] = useState(data.DescripcionEstado || '');

  const roles = ['1', '2', '3'];
  const estados = ['1', '2', '3'];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async () => {
    // Validar que ningún campo esté vacío
    if (
      !NombreUsuario ||
      !Apellido ||
      !Correo ||
      !Clave ||
      !DescripcionRol ||
      !DescripcionEstado
    ) {
      alert('Por favor, completa todos los campos del formulario.');
      return; // Detener la ejecución si hay campos vacíos
    }

    // Validar el campo de correo electrónico
    if (!emailRegex.test(Correo)) {
      alert('Correo electrónico no válido');
      return; // Detener la ejecución si la validación del correo electrónico falla
    }

    const formData = {
      NombreUsuario,
      Apellido,
      Correo,
      Clave,
      DescripcionRol,
      DescripcionEstado,
    };

    await onSubmit(formData);

    if (onUpdate) {
      onUpdate();
    }

    setNombreUsuario('');
    setApellido('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de Usuario:</Text>
      <TextInput
        style={styles.input}
        value={NombreUsuario}
        onChangeText={setNombreUsuario}
      />

      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={styles.input}
        value={Apellido}
        onChangeText={setApellido}
      />

      <Text style={styles.label}>Correo:</Text>
      <TextInput
        style={styles.input}
        value={Correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Clave:</Text>
      <TextInput
        style={styles.input}
        value={Clave}
        onChangeText={setClave}
        secureTextEntry
      />

      <Text style={styles.label}>Rol:</Text>
      <Picker
        style={styles.input}
        selectedValue={DescripcionRol}
        onValueChange={(itemValue) => setRolIdRol(itemValue)}>
        {roles.map((rol) => (
          <Picker.Item key={rol} label={rol} value={rol} />
        ))}
      </Picker>

      <Text style={styles.label}>Estado:</Text>
      <Picker
        style={styles.input}
        selectedValue={DescripcionEstado}
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
    color: 'black',
  },
});

export default FormularioUsuario;
