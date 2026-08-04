import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Services from "../../components/Services/Services";
import Statistics from "../../components/Statistics/Statistics";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Statistics />
    </>
  );
}

export default Home;