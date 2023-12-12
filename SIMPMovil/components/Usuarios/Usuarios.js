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
import { useAuth } from './AuthContext'; // Asegúrate de importar useAuth

const apiUrl = 'http://192.168.0.10:3000/usuarios';

const Tabla = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleCreacion, setModalVisibleCreacion] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { token } = useAuth(); // Obtén el token del contexto

  const fetchData = async (Busqueda = null) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token a la cabecera
        },
      };

      if (Busqueda !== null) {
        console.log("dentro de fetch data pero del if primer bloque");
        const response = await axios.get(`${apiUrl}/${Busqueda}`, config);
        setData(response.data);
      } else {
        const response = await axios.get(apiUrl, config);
        setData(response.data);
      }
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
    }
  };

  const fetchData2 = async (Busqueda = null) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token a la cabecera
        },
      };

        const response = await axios.get(apiUrl, config);
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

  const buscar = async (query) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${apiUrl}/${query}`,{
        ...config
      });
      setData(response.data);
    } catch (error) {
      console.error('Error al buscar usuarios:', error);
    }
  };

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
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token a la cabecera
        },
      };
  
      if (selectedItem.idUsuario) {
        await axios.put(`${apiUrl}/actualizar/${selectedItem.idUsuario}`, formData, config);
      } else {
        try {
          await axios.put(`${apiUrl}/agregar`, formData, config);
        } catch (error) {
          console.error('Error al agregar usuario:', error);
          throw error; // Puedes manejar el error según tus necesidades
        }
      }
    } catch (error) {
      console.error('Error en actualizar/crear usuario:', error);
    }
  
    setModalVisible(false);
    fetchData2();
  };
  

  const crear = async (formData) => {
    console.log('Datos a enviar:', formData);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Agrega el token a la cabecera
      },
    };
    try {
      await axios.post(`${apiUrl}/agregar`, formData,config);
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      throw error;
    }

    setModalVisibleCreacion(false);
    fetchData();
  };

  const borrar = async (idUsuario) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token a la cabecera
        },
      };
      await axios.delete(`${apiUrl}/borrar/${idUsuario}`,config);
      setData(data.filter((user) => user.idUsuario !== idUsuario));
    } catch (error) {
      console.error('Error al borrar usuario:', error);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Usuarios del sistema</Text>
      <Button style={[styles.cell, styles.Borrar]} onPress={agregar}
        title="Añadir nuevo" />
      <Button style={[styles.cell, styles.Borrar]} onPress={fetchData2} title="Refrescar" />
      <View>
        <TextInput
          keyboardType="default"
          placeholder="Ingresa consulta SQL de búsqueda"
          onChangeText={(text) => setQuery(text)}
          value={query}
          style={styles.input}
        />
        <Button
          style={[styles.cell, styles.Borrar]}
          onPress={() => buscar(query)}
          title="Buscar"
        />
      </View>

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
