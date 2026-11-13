import { CategoryTiles } from "@/components/home/category-tiles";
import { CollectionSplit } from "@/components/home/collection-split";
import { EditorialStory } from "@/components/home/editorial-story";
import { FinishingTouches } from "@/components/home/finishing-touches";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { NewArrivals } from "@/components/home/new-arrivals";
import { Services } from "@/components/home/services";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <Intro />
      <CollectionSplit />
      <NewArrivals />
      <CategoryTiles />
      <EditorialStory />
      <FinishingTouches />
      <Services />
    </main>
  );
}
