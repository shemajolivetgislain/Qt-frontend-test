import BlogsSection from "./BlogsSection";
import FooterSection from "./FooterSection";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";


const Homepage = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <HeroSection />
      <BlogsSection />
      <FooterSection />
    </div>
  );
};

export default Homepage;
