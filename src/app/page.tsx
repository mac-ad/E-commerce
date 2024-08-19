import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PromoSlider from "./components/PromoSlider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <PromoSlider/>
      <Footer />
    </main>
  );
}
