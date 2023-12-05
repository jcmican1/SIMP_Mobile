import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './Usuarios/Login';
import Usuarios from './Usuarios/Usuarios';
import FormularioUsuario from './Usuarios/FormularioUsuario';
import FMovimientoForm  from './Usuarios/FMovimientoForm';


const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen initialRouteName name="Login" component={Login} />
      <Drawer.Screen name="Usuarios" component={Usuarios} />
      {/* <Drawer.Screen name="FormularioUsuario" component={FormularioUsuario} /> */}
      {/* <Drawer.Screen name="FMovimientoForm" component={FMovimientoForm} /> */}
    </Drawer.Navigator>
  )
}

export default function NavegacionCajon() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
