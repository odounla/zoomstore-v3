import LoadingContainer from "@/components/global/LoadingContainer";
import PromotionalHero from "@/components/home/PromotionalHero";
import DiscoveryGrid from "@/components/home/DiscoveryGrid";
import HorizontalProductList from "@/components/home/HorizontalProductList";
import { Suspense } from "react";
import { fetchFeaturedProducts } from "@/utils/actions";

const HomePage = async () => {
  const featuredProducts = await fetchFeaturedProducts();

  return (
    <>
      <PromotionalHero />
      <DiscoveryGrid />
      <Suspense fallback={<LoadingContainer />}>
        <HorizontalProductList products={featuredProducts} title="Best Sellers" />
      </Suspense>
    </>
  );
};
export default HomePage;
