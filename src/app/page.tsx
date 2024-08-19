import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Footer />
    </main>
  );
}
