import Login from "../../../components/LoginComponent";
import { AuthProvider } from "../../../contexts/AuthContext";
import styles from "../style/page.module.css";
import { ThemeProvider } from "../../../contexts/ThemeContext";

export default function Home() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </ThemeProvider>
  );
}
