import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Dropdown } from 'react-native-paper';

const FMovimientoForm = () => {
  const [fechaMovimiento, setFechaMovimiento] = useState('');
  const [cantidadProducto, setCantidadProducto] = useState('');
  const [idMotivo, setIdMotivo] = useState('');
  const [idProductoMateriaPrima, setIdProductoMateriaPrima] = useState('');
  const [idUsuario, setIdUsuario] = useState('');

  const handleSubmit = () => {
    console.log('Formulario enviado');
    // Aquí puedes realizar acciones como enviar datos al servidor
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Fecha de Movimiento"
        value={fechaMovimiento}
        onChangeText={text => setFechaMovimiento(text)}
      />
      <TextInput
        label="Cantidad de Producto"
        value={cantidadProducto}
        onChangeText={text => setCantidadProducto(text)}
        keyboardType="numeric"
      />
      <Dropdown
        label="Motivo"
        value={idMotivo}
        onChangeText={text => setIdMotivo(text)}
        data={[
          { label: 'Motivo 1', value: '1' },
          { label: 'Motivo 2', value: '2' },
          // Agrega más opciones según tus necesidades
        ]}
      />
      <TextInput
        label="ID Producto Materia Prima"
        value={idProductoMateriaPrima}
        onChangeText={text => setIdProductoMateriaPrima(text)}
        keyboardType="numeric"
      />
      <TextInput
        label="ID Usuario"
        value={idUsuario}
        onChangeText={text => setIdUsuario(text)}
        keyboardType="numeric"
      />

      <Button mode="contained" onPress={handleSubmit}>
        Enviar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default FMovimientoForm;