import React from 'react';
import { Button, View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const dataPrueba = [
  {
    IDExistencias: 1,
    CantidadExistencias: 100,
    CantidadConsumida: 20,
    PuntoCompra: 'Algun Punto',
    PuntoMaximo: 200,
    FechaUltimaModificacion: '2023-11-22',
    IDProductoMateriaPrima: 101,
  },
  {
    IDExistencias: 2,
    CantidadExistencias: 150,
    CantidadConsumida: 30,
    PuntoCompra: 'Otro Punto',
    PuntoMaximo: 250,
    FechaUltimaModificacion: '2023-11-21',
    IDProductoMateriaPrima: 102,
  },
  {
    IDExistencias: 2,
    CantidadExistencias: 150,
    CantidadConsumida: 30,
    PuntoCompra: 'Otro Punto',
    PuntoMaximo: 250,
    FechaUltimaModificacion: '2023-11-21',
    IDProductoMateriaPrima: 102,
  },
  {
    IDExistencias: 2,
    CantidadExistencias: 150,
    CantidadConsumida: 30,
    PuntoCompra: 'Otro Punto',
    PuntoMaximo: 250,
    FechaUltimaModificacion: '2023-11-21',
    IDProductoMateriaPrima: 102,
  },
  {
    IDExistencias: 2,
    CantidadExistencias: 150,
    CantidadConsumida: 30,
    PuntoCompra: 'Otro Punto',
    PuntoMaximo: 250,
    FechaUltimaModificacion: '2023-11-21',
    IDProductoMateriaPrima: 102,
  },
  {
    IDExistencias: 2,
    CantidadExistencias: 150,
    CantidadConsumida: 30,
    PuntoCompra: 'Otro Punto',
    PuntoMaximo: 250,
    FechaUltimaModificacion: '2023-11-21',
    IDProductoMateriaPrima: 102,
  },
  {
    IDExistencias: 2,
    CantidadExistencias: 150,
    CantidadConsumida: 30,
    PuntoCompra: 'Otro Punto',
    PuntoMaximo: 250,
    FechaUltimaModificacion: '2023-11-21',
    IDProductoMateriaPrima: 102,
  },
  {
    IDExistencias: 2,
    CantidadExistencias: 150,
    CantidadConsumida: 30,
    PuntoCompra: 'Otro Punto',
    PuntoMaximo: 250,
    FechaUltimaModificacion: '2023-11-21',
    IDProductoMateriaPrima: 102,
  },
  // Agrega más datos según tus necesidades
];

const Tabla = ({ data }) => {
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}> ID </Text>
      <Text style={styles.headerText}> Cantidad Existencias </Text>
      <Text style={styles.headerText}> Cantidad Consumida </Text>
      <Text style={styles.headerText}> Punto de Compra </Text>
      <Text style={styles.headerText}> Punto Máximo </Text>
      <Text style={styles.headerText}> Fecha de Modificación </Text>
      <Text style={styles.headerText}> ID Producto/Materia Prima </Text>
      <Text style={styles.headerText}> Editar </Text>
      <Text style={styles.headerText}> Borrar </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log('Elemento presionado')}>
      <View style={styles.row}>
        <Text style={styles.cell}>{item.IDExistencias}</Text>
        <Text style={styles.cell}>{item.CantidadExistencias}</Text>
        <Text style={styles.cell}>{item.CantidadConsumida}</Text>
        <Text style={styles.cell}>{item.PuntoCompra}</Text>
        <Text style={styles.cell}>{item.PuntoMaximo}</Text>
        <Text style={styles.cell}>{item.FechaUltimaModificacion}</Text>
        <Text style={styles.cell}>{item.IDProductoMateriaPrima}</Text>
        <Button style={[styles.cell, styles.Editar]} title="Editar" />
        <Button style={[styles.cell, styles.Borrar]} title="Borrar" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={styles.title}>Usuarios del sistema</Text>
      <ScrollView horizontal>

        <View style={styles.container}>
          {renderHeader()}
          <FlatList
            data={dataPrueba}
            keyExtractor={(item) => item.IDExistencias.toString()}
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
    color: '#FF0000',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Tabla;
