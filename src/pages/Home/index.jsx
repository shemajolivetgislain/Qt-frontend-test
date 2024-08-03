import HeroSection from "./HeroSection";
import Navbar from "./Navbar";

const Homepage = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Homepage;
