import LoadingContainer from "@/components/global/LoadingContainer";
import PromotionalHero from "@/components/home/PromotionalHero";
import DiscoveryGrid from "@/components/home/DiscoveryGrid";
import HorizontalScrollableList from "@/components/home/HorizontalScrollableList";
import { Suspense } from "react";
import { fetchFeaturedProducts } from "@/utils/actions";

const HomePage = async () => {
  const featuredProducts = await fetchFeaturedProducts();

  // For demonstration, slice the products into two groups to make the carousels look different
  const firstHalf = featuredProducts.slice(0, Math.ceil(featuredProducts.length / 2));
  const secondHalf = featuredProducts.slice(Math.ceil(featuredProducts.length / 2));

  return (
    <>
      <PromotionalHero />
      <DiscoveryGrid />
      <Suspense fallback={<LoadingContainer />}>
        {/* Amazon-style horizontal scrolling lists */}
        <HorizontalScrollableList products={featuredProducts} title="Selected for you" />
        <HorizontalScrollableList products={secondHalf.concat(firstHalf)} title="Related to items you've viewed" />
      </Suspense>
    </>
  );
};
export default HomePage;
