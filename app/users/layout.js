import Navbar from "../../components/Navbar/navbar";

export default function UsersLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
