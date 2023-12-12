import NavegacionCajon from './components/NavegacionCajon';
import { AuthProvider } from './components/Usuarios/AuthContext';


export default function App() {
  return (
    <AuthProvider>
      <NavegacionCajon />
    </AuthProvider>
  );
}
