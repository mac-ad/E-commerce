import PromoSlider from "./components/PromoSlider";
import RefrigiratorCollection from "./components/SummerCollection";
import SummerCollectionFilterByCategory from "./components/SummerCollectionFIlterByCategory";
import TvCollection from "./components/TvCollection";
import TVFilterSeach from "./components/TVFilterByCategory";

export default function Home() {
  return (
    <main>
      <PromoSlider/>
      <TVFilterSeach/>
      <TvCollection/>
      <SummerCollectionFilterByCategory/>
      <RefrigiratorCollection/>
    </main>
  );
}
