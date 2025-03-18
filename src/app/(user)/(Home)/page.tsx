import HomeBanner from "../../components/Home/Banner";
import HomepageProducts from "./HomepageProducts";
import HomepageBrands from "./HomepageBrands";
import HomepageCategories from "./HomepageCategories";
import HomepageDiscounted from "./HomepageDiscounted"

export default function Home() {
  return (
      <main className = "bg-gray-100">
        <HomeBanner />
        <HomepageDiscounted className = "mt-5"/>
        <HomepageProducts className = "mt-5"/>
        <HomepageBrands   />
        <HomepageCategories />
      </main>
  );
}
