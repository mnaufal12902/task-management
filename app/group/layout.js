import Navbar from "../../components/Navbar/navbar";

export default function GroupLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
