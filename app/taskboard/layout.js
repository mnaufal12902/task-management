import Navbar from "../../components/Navbar/navbar";
import { AuthProvider } from "../providers";

export default function TaskboardLayout({ children }) {
  return (
    <>
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>
    </>
  );
}
