import Logout from "../../../components/LogoutComponent";
import { AuthProvider } from "../../../contexts/AuthContext";

export default function Home() {
  return (
    <AuthProvider>
      <Logout />
    </AuthProvider>
  );
}
