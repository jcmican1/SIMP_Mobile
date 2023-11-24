import React from 'react';
import {Button, View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const dataPrueba = [
  {
    Producto: "Queso",
    Descripcion: "Queso sabor a queso",
    Categoria: "Indefinida",
    UnidadDeMedida: 'g',
    Existencias: 200,
    Consumida: 20,
    PuntodeCompradeProducto: 120,
    PuntoMáximodeProducto:200,
    Modificacion: '2023-11-22',
  },
  {
    Producto: "Jamón",
    Descripcion: "Rico Jamón",
    Categoria: "Topings",
    UnidadDeMedida: 'g',
    Existencias: 150,
    Consumida: 4,
    PuntodeCompradeProducto: 80,
    PuntoMáximodeProducto:200,
    Modificacion: '2023-11-23',
  },
  
 
];

const Existencias = ({ data }) => {

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}> Producto </Text>
      <Text style={styles.headerText}> Descripción </Text>
      <Text style={styles.headerText}> Categoría </Text>
      <Text style={styles.headerText}> Unidad de Medida </Text>
      <Text style={styles.headerText}> Existencias </Text>
      <Text style={styles.headerText}> Consumida </Text>
      <Text style={styles.headerText}> Punto de Compra de Producto </Text>
      <Text style={styles.headerText}> Punto Máximo de Producto </Text>
      <Text style={styles.headerText}> Modificación </Text>
      <Text style={styles.headerText}> Editar </Text>
      <Text style={styles.headerText}> Borrar </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log('Elemento presionado')}>
      <View style={styles.row}>
        <Text style={styles.cell}>{item.Producto}</Text>
        <Text style={styles.cell}>{item.Descripcion}</Text>
        <Text style={styles.cell}>{item.Categoria}</Text>
        <Text style={styles.cell}>{item.UnidadDeMedida}</Text>
        <Text style={styles.cell}>{item.Existencias}</Text>
        <Text style={styles.cell}>{item.Consumida}</Text>
        <Text style={styles.cell}>{item.PuntodeCompradeProducto}</Text>
        <Text style={styles.cell}>{item.PuntoMáximodeProducto}</Text>
        <Text style={styles.cell}>{item.Modificacion}</Text>
        <Button style={[styles.cell, styles.Editar]} title="Editar"/>
        <Button style={[styles.cell, styles.Borrar]} title="Borrar"/>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={styles.title}>Existencias</Text>
      <ScrollView horizontal>

        <View style={styles.container}>
          {renderHeader()}
          <FlatList
            data={dataPrueba}
            keyExtractor={(item) => item.Producto.toString()}
            renderItem={renderItem}
          />
        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#c0c0c0',
  },
  Editar: {
    color: '#00FF23',
  },
  Borrar: {
    color: '#ff0000',
  },
  title: {
    textAlign:'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Existencias;