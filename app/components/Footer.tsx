import { Link } from "@remix-run/react";
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from "react-icons/io";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="bg-bg_light_secondary dark:bg-bg_dark_secondary h-36 md:h-48 p-2 flex items-center justify-around w-screen">
      <div className="w-full md:w-2/5 text-center md:text-start">
        <h2 className="w-full">truvaille</h2>
        <p className="w-full text-text_light_primary dark:text-text_dark_secondary">
          Plug those places that bring you joy and put a smile on a stranger's
          face.
        </p>
        <p className="text-sm text-text_light_secondary dark:text-text_dark_secondary">
          Tawanda Munongo © 2022
        </p>
      </div>
      <div className="hidden md:flex md:items-center md:justify-around md:w-1/2 text-text_light_primary dark:text-text_dark_secondary">
        <div className="w-1/4">
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/profile">About Us</Link>
            </li>
            <li>
              <Link to="/profile">Categories</Link>
            </li>
          </ul>
        </div>
        <div className="w-1/3">
          <ul>
            <li>
              <Link to="/profile">Terms and Conditions</Link>
            </li>
            <li>
              <Link to="/profile">Our Commitment</Link>
            </li>
          </ul>
        </div>
        <div className="w-1/5">
          <p>Get in touch</p>
          <div className="flex items-center justify-between">
            <IoLogoFacebook size={20} />
            <IoLogoTwitter size={20} />
            <IoLogoInstagram size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
