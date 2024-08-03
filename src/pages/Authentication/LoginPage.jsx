import FooterSection from "../Home/FooterSection";
import Navbar from "../Home/Navbar";
import LoginForm from "./form/LoginForm";

const LoginPage = () => {
  return (
    <section className="w-full h-full">
      <Navbar />
      <div className="mt-12 w-full h-screen flex justify-center items-center">
        <LoginForm />
      </div>
      <FooterSection />
    </section>
  );
};

export default LoginPage;
