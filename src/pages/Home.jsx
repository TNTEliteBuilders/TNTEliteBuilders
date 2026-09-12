import home from "../data/home.json";
import { CONTACT } from "../site.js";
import Hero from "../sections/Hero.jsx";
import Stats from "../sections/Stats.jsx";
import Services from "../sections/Services.jsx";
import Why from "../sections/Why.jsx";
import Process from "../sections/Process.jsx";
import Gallery from "../sections/Gallery.jsx";
import QuoteCta from "../sections/QuoteCta.jsx";
import Faq from "../sections/Faq.jsx";
import Reviews from "../reviews/Reviews.jsx";
import SectionRule from "../ui/SectionRule.jsx";

// The home page is a composition of section modules, each fed its slice of
// home.json. Content is data; every section is a thin, swappable layer.
export default function Home() {
  return (
    <div id="top">
      <Hero data={home.hero} contact={CONTACT} />
      <Stats items={home.stats} />
      <SectionRule index="01" label="Services" />
      <Services data={home.services} />
      <Why data={home.why} />
      <SectionRule index="02" label="How We Work" />
      <Process data={home.process} />
      <SectionRule index="03" label="Selected Work" />
      <Gallery data={home.projects} />
      <Reviews />
      <QuoteCta data={home.quote} contact={CONTACT} />
      <SectionRule index="04" label="Questions" />
      <Faq data={home.faq} />
    </div>
  );
}
