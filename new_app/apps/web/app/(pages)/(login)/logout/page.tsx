import Logout from "../../../components/LogoutComponent";
import { AuthProvider } from "../../../contexts/AuthContext";
import { ThemeProvider } from "../../../contexts/ThemeContext";

export default function Home() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Logout />
      </AuthProvider>
    </ThemeProvider>
  );
}
