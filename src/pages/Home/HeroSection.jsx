import ContainerHolder from "../../components/container";
import Typewriter from "typewriter-effect";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const navigate = useNavigate();
  return (
    <section
      id="hero"
      className="w-full !mt-20 h-[85vh] max-md:py-20 flex flex-col justify-center items-center max-md:items-start max-lg:h-full max-xl:h-full max-md:h-full "
    >
      <ContainerHolder
        className={`flex flex-col gap-10 text-white max-md:flex-col max-md:items-start  justify-between items-start `}
      >
        <motion.article
          ref={ref}
          initial={{ y: 100, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col gap-5"
        >
          {" "}
          <h1 className="text-5xl max-md:text-2xl font-bold">
            {" "}
            <Typewriter
              options={{
                strings: " Welcome to Blogger Quicker!",
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <p className="text-lg w-[60%] max-md:w-full max-md:text-base">
            We&apos;re excited to have you in our vibrant community of writers
            and readers. Share your unique stories, discover new perspectives,
            and connect with others. Let&apos;s make your voice heard!
          </p>
        </motion.article>
        <Button
          value={"Sign up Now"}
          className={
            "!bg-white !text-whiteTheme-primaryColor !py-4 !px-9 !font-bold hover:!bg-whiteTheme-primaryColor hover:!text-white"
          }
          onClick={() => {
            navigate("/register");
          }}
        />
      </ContainerHolder>
    </section>
  );
};

export default HeroSection;
