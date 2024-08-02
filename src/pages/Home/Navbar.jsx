import { useState } from "react";
import Button from "../../components/Button";
import { HiMenuAlt2 } from "react-icons/hi";
import { navLinks } from "../../constants/navLinks";
import { navImage } from "../../constants/images";
import { MdClose } from "react-icons/md";
import MobileMenu from "./child/MobileMenu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [onScroll, setOnScroll] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const loginUser = localStorage.getItem("token");
  const userDetails = JSON.parse(localStorage.getItem("user"));

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
          <img
            src={navImage.logo}
            alt="logo"
            className="w-[250px] h-[62px]"
            onClick={() => {
              navigate("/");
            }}
          />
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
          {loginUser ? (
            <div className=" flex gap-2 items-center bg-blue-100 py-3 px-5 rounded-full">
              <span className=" rounded-full p-4  w-10 h-10 bg-blue-400 flex items-center font-bold max-sm:hidden">
                <p>{userDetails?.firstname?.charAt(0).toUpperCase()}</p>
              </span>
              <span>
                <p className="text-sm font-semibold text-whiteTheme capitalize max-sm:hidden">
                  {userDetails?.firstname} {userDetails?.lastname}
                </p>
                <p
                  className="text-sm underline cursor-pointer"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  Logout
                </p>
              </span>
            </div>
          ) : (
            <Button
              value={<a href="/login">Login</a>}
              className={"max-md:hidden"}
            />
          )}
        </div>
      </nav>
      {openMenu && <MobileMenu />}
    </section>
  );
};

export default Navbar;
