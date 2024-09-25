import AirConditioner from "./AC/page";
import AirConditionerCollection from "./components/AirConditionerCollection";
import PromoSlider from "./components/PromoSlider";
import RefrigiratorCollection from "./components/SummerCollection";
import SummerCollectionFilterByType from "./components/SummerCollectionFIlterByType";
import TvCollection from "./components/TvCollection";
import TVFilterSeach from "./components/TVFilterByCategory";

export default function Home() {
  return (
    <main>
      <PromoSlider/>
      <TVFilterSeach/>
      <TvCollection/>
      <SummerCollectionFilterByType/>
      <RefrigiratorCollection/>
      <AirConditionerCollection/>
    </main>
  );
}
