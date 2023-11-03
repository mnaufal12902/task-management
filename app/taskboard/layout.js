import Navbar from "../../components/Navbar/navbar";

export default function TaskboardLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
