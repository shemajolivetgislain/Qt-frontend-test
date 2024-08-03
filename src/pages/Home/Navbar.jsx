import { useState } from "react";
import Button from "../../components/Button";
import { HiMenuAlt2 } from "react-icons/hi";
import { navLinks } from "../../constants/navLinks";
import { navImage } from "../../constants/images";
import { MdClose } from "react-icons/md";
import MobileMenu from "./child/MobileMenu";

const Navbar = () => {
  const [onScroll, setOnScroll] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const changeColor = () =>
    window.scrollY >= 10 ? setOnScroll(true) : setOnScroll(false);
  window.addEventListener("scroll", changeColor);
  return (
    <section className="grid grid-cols-1">
      <nav
        className={`w-full flex items-center justify-between fixed z-[999] py-4 px-32 max-md:px-16 max-sm:px-10 border-b-2 border-slate-100 dark:border-darkTheme-borderColor ${
          onScroll
            ? "bg-white dark:bg-darkTheme-primaryColor"
            : "bg-white dark:bg-darkTheme-primaryColor"
        }`}
      >
        <header>
          <img src={navImage.logo} alt="logo" className="w-[250px] h-[62px]" />
        </header>

        <ul className="flex gap-8 text-whiteTheme-primaryColor dark:text-darkTheme-textColor max-md:hidden">
          {navLinks?.map((link, index) => (
            <li
              key={index}
              className={`${
                link.path === "/" &&
                "text-whiteTheme-subPrimaryColor font-semibold dark:text-darkTheme-secondColor"
              } font-medium cursor-pointer hover:text-whiteTheme-subPrimaryColor dark:hover:text-darkTheme-secondColor `}
            >
              <a href={link.path} className={``}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 ">
          <div className="hidden max-md:contents  max-md:bg-slate-200">
            {openMenu ? (
              <MdClose
                size={40}
                onClick={() => {
                  setOpenMenu(false);
                }}
                className="text-whiteTheme-primaryColor border-2 border-whiteTheme-primaryColor p-1 rounded-md"
              />
            ) : (
              <HiMenuAlt2
                size={40}
                onClick={() => {
                  setOpenMenu(true);
                }}
                className="text-whiteTheme-primaryColor border-2 border-whiteTheme-primaryColor p-1 rounded-md"
              />
            )}
          </div>
          <Button
            value={<a href="/login">Login</a>}
            className={"max-md:hidden"}
          />
        </div>
      </nav>
      {openMenu && <MobileMenu />}
    </section>
  );
};

export default Navbar;
