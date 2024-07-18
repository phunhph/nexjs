import Login from "../../../components/LoginComponent";
import { AuthProvider } from "../../../contexts/AuthContext";

export default function Home() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}
