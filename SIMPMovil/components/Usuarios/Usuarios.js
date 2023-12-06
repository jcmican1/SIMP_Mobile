import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Button,
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import axios from 'axios';
import FormularioUsuario from './FormularioUsuario';
import FormularioUsuariosCrear from './FormularioUsuariosCrear';


const apiUrl = 'http://192.168.0.10:3000/usuarios';

const Tabla = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleCreacion, setModalVisibleCreacion] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}> idUsuario </Text>
      <Text style={styles.headerText}> NombreUsuario </Text>
      <Text style={styles.headerText}> Apellido </Text>
      <Text style={styles.headerText}> Correo </Text>
      <Text style={styles.headerText}> Clave </Text>
      <Text style={styles.headerText}> Rol_IdRol </Text>
      <Text style={styles.headerText}> Estado_idEstado </Text>
      <Text style={styles.headerText}> Editar </Text>
      <Text style={styles.headerText}> Borrar </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log('Elemento presionado')}>
      <View style={styles.row}>
        <Text style={styles.cell}>{item.idUsuario}</Text>
        <Text style={styles.cell}>{item.NombreUsuario}</Text>
        <Text style={styles.cell}>{item.Apellido}</Text>
        <Text style={styles.cell}>{item.Correo}</Text>
        <Text style={styles.cell}>{item.Clave}</Text>
        <Text style={styles.cell}>{item.DescripcionRol}</Text>
        <Text style={styles.cell}>{item.DescripcionEstado}</Text>
        <Button
          style={[styles.cell, styles.Editar]}
          onPress={() => editar(item)}
          title="Editar"
        />
        <Button
          style={[styles.cell, styles.Borrar]}
          onPress={() => borrar(item.idUsuario)}
          title="Borrar"
        />
      </View>
    </TouchableOpacity>
  );

  const agregar = () => {
    setSelectedItem(null); // Para indicar que no hay ningún elemento seleccionado (nuevo usuario)
    setModalVisibleCreacion(true);
  };

  const editar = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const actualizar = async (formData) => {
    try {
      console.log('Datos a enviar:', formData);
      if (selectedItem.idUsuario) {
        await axios.put(`${apiUrl}/actualizar/${selectedItem.idUsuario}`, formData);
      }
      else {
        try {
          await axios.put(`${apiUrl}/agregar`, formData);
        } catch (error) {
          console.error('Error al agregar usuario:', error);
          throw error; // Puedes manejar el error según tus necesidades
        }
      }
    } catch (error) {
      console.error('Error en actualizar/crear usuario:', error);
    }

    setModalVisible(false);
    fetchData();
  };

  const crear = async (formData) => {
    console.log('Datos a enviar:', formData);
    try {
      await axios.post(`${apiUrl}/agregar`, formData);
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      throw error;
    }

    setModalVisibleCreacion(false);
    fetchData();
  };

  const borrar = async (idUsuario) => {
    try {
      await axios.delete(`${apiUrl}/borrar/${idUsuario}`);
      setData(data.filter((user) => user.idUsuario !== idUsuario));
    } catch (error) {
      console.error('Error al borrar usuario:', error);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Usuarios del sistema</Text>
      <Button style={[styles.cell, styles.Borrar]} onPress={agregar} title="Añadir nuevo" />
      <TextInput keyboardType="email-address" />
      <Button style={[styles.cell, styles.Borrar]} onPress={borrar} title="Buscar" />

      <ScrollView horizontal>
        <View style={styles.container}>
          {renderHeader()}
          <FlatList
            data={data}
            keyExtractor={(item) => item.idUsuario.toString()}
            renderItem={renderItem}
          />
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View>
          <FormularioUsuario data={selectedItem} onSubmit={actualizar} onUpdate={fetchData} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisibleCreacion}
        onRequestClose={() => setModalVisibleCreacion(false)}
      >
        <View>
          <FormularioUsuariosCrear onSubmit={crear} onUpdate={fetchData} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    color: 'black',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
    color: 'black',
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: '#fff',
    color: 'black',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#c0c0c0',
    color: 'black',
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
    color: 'black',
  },
});

export default Tabla;
