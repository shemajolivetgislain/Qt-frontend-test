import FooterSection from "../Home/FooterSection";
import Navbar from "../Home/Navbar";
import RegisterForm from "./form/RegisterForm";

const RegisterPage = () => {
  return (
    <section className="w-full h-full">
      <Navbar />
      <div className="my-36 max-lg:mt-52 w-full h-screen flex justify-center items-center">
        <RegisterForm />
      </div>
      <FooterSection />
    </section>
  );
};

export default RegisterPage;
