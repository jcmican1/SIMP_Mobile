import React from 'react';
import {Button, View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'; 

import React, { useState } from 'react';
 import { View, Text, TextInput, Button } from 'react-native';
 import { Input } from 'react-native-elements'; 

const FormularioProducto = () => {
  const [producto, setProducto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [unidadMedida, setUnidadMedida] = useState('');
  const [existencias, setExistencias] = useState('');
  const [consumida, setConsumida] = useState('');
  const [puntoCompra, setPuntoCompra] = useState('');
  const [puntoMaximo, setPuntoMaximo] = useState('');
  const [ultimaModificacion, setUltimaModificacion] = useState('');

  const handleSubmit = () => {
    // Aquí puedes manejar la lógica para enviar los datos a tu backend o almacenarlos localmente.
    console.log('Datos enviados:', {
      producto,
      descripcion,
      categoria,
      unidadMedida,
      existencias,
      consumida,
      puntoCompra,
      puntoMaximo,
      ultimaModificacion,
    });
  }; 

  return (
    <View>
      <Input
        label="Producto"
        value={producto}
        onChangeText={setProducto}
      />
      <Input
        label="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <Input
        label="Categoría"
        value={categoria}
        onChangeText={setCategoria}
      />
      <Input
        label="Unidad de Medida"
        value={unidadMedida}
        onChangeText={setUnidadMedida}
      />
      <Input
        label="Existencias"
        value={existencias}
        onChangeText={setExistencias}
        keyboardType="numeric"
      />
      <Input
        label="Consumida"
        value={consumida}
        onChangeText={setConsumida}
        keyboardType="numeric"
      />
      <Input
        label="Punto de Compra"
        value={puntoCompra}
        onChangeText={setPuntoCompra}
        keyboardType="numeric"
      />
      <Input
        label="Punto Máximo de Producto"
        value={puntoMaximo}
        onChangeText={setPuntoMaximo}
        keyboardType="numeric"
      />
      <Input
        label="Ultima Modificación"
        value={ultimaModificacion}
        onChangeText={setUltimaModificacion}
      />

      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
 };

export default FormularioProducto;
