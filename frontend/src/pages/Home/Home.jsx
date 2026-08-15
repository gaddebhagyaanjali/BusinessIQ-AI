import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import TrustedCompanies from "../../components/TrustedCompanies/TrustedCompanies";
import Features from "../../components/Features/Features";
import Testimonials from "../../components/Testimonials/Testimonials";
import FAQ from "../../components/FAQ/FAQ";
import CTA from "../../components/CTA/CTA";
function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustedCompanies />
      <Features />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}

export default Home;