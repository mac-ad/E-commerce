import PromoSlider from "./components/PromoSlider";
import RefrigiratorCollection from "./components/SummerCollection";
import TvCollection from "./components/TvCollection";
import TVFilterSeach from "./components/TVFilterByCategory";

export default function Home() {
  return (
    <main>
      <PromoSlider/>
      <TVFilterSeach/>
      <TvCollection/>
      <RefrigiratorCollection/>
    </main>
  );
}
