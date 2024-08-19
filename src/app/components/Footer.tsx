import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { GITHUB, INSTAGRAM } from "../utils/constants";
const Footer = () => {
  return (
    <>
      <div className="w-full bg-[#323232] py-8 px-[70px] border-t-4 border-gray-800 h-full relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="main-heads">
            <h1 className="text-sm font-semibold text-white">COMPANY</h1>
            <p className="text-gray-300 mt-3 font-extralight text-[13px]">
              About Us
            </p>
            <p className="text-gray-300 mt-3 font-extralight text-[13px]">
              Privacy Policy
            </p>
            <p className="text-gray-300 mt-3 font-extralight text-[13px]">
              Delivery Location Outside Kathmandu Via Courier
            </p>
            <p className="text-gray-300 mt-3 font-extralight text-[13px]">
              CG Brand Warranty Information
            </p>
            <p className="text-gray-300 mt-3 font-extralight text-[13px]">
              About Us
            </p>
            <p className="text-gray-300 font-extralight mt-5 w-[250px] text-[13px]">
              Appointment Booking
            </p>
            <p className="text-gray-300 font-extralight mt-5 w-[250px] text-[13px]">
              Terms And Conditions
            </p>
            <p className="text-gray-300 font-extralight mt-5 w-[250px] text-[13px]">
              Cancellation And Replacement
            </p>
            <p className="text-gray-300 font-extralight mt-5 w-[250px] text-[13px]">
              F.A.Q.s
            </p>
          </div>
          <div className="main-heads">
            <h1 className="text-sm font-semibold text-white">ASSISTANCE</h1>
            <p className="text-gray-300 mt-3 font-extralight text-[13px] w-[230px]">
              Store Locator
            </p>
          </div>
          <div className="main-heads">
            <h1 className="text-sm font-semibold text-gray-300">STORES</h1>
            <p className="text-gray-300 font-extralight mt-3 w-[250px] text-[13px]">
              CG Digital
            </p>
            <p className="text-gray-300 font-extralight mt-3 w-[250px] text-[13px]">
              LG Shoppe
            </p>
          </div>
          <div className="main-heads">
            <h1 className="text-sm font-semibold text-white">
              LETS GET CONNECTED
            </h1>
            <div className="flex space-x-6 mt-5">
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
              >
                <FaInstagram size={20} />
              </a>
            </div>

            <p className="mt-5 text-gray-300 font-extralight py-2 w-[250px] px-3 border boder-white rounded-lg flex text-[13px]">
              <FaEnvelope className="mr-2 text-xs" size={16} />
              myelectronics@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className="w-full border border-t-[0.5px] border-r-0 border-l-0 border-gray-300 bg-[#323232] py-3 px-[80px]">
        <p className="text-xs text-gray-200 font-extralight ">
          COPYRIGHT © 2021 CG Digital. ALL RIGHTS RESERVEDPrivacy policyTerms
          and conditions
        </p>
      </div>
    </>
  );
};

export default Footer;
