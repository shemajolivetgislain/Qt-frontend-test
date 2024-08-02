import BlogsSection from "./BlogsSection";
import FooterSection from "./FooterSection";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";

const Homepage = () => {
  const loginUser = localStorage.getItem("token");
  return (
    <div className="flex flex-col">
      <Navbar />
      {loginUser ? <span className="mt-20"></span> : <HeroSection />}
      <BlogsSection />
      <FooterSection />
    </div>
  );
};

export default Homepage;
