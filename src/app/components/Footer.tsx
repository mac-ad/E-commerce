import { FaPhone } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { ImHome } from "react-icons/im";
import { LiaFaxSolid } from "react-icons/lia";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="w-full bg-[#323232] py-8 px-[70px] border-t-4 border-gray-800">
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
          {/* <div className="main-heads">
              <h1 className="text-sm font-semibold text-white">ASSISTANCE</h1>
              <p className="text-gray-300 mt-3 font-extralight text-[13px] w-[230px]">
                Store Locator
              </p>
            </div> */}
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
              Branch Office, JAPAN
            </h1>
            <p className="text-gray-300 text-[13px] mt-5 flex font-extralight">
              <FaPhone className="mr-2" />
              027-289-0762
            </p>
            <p className="text-gray-300 text-[13px] flex font-extralight mt-5">
              <LiaFaxSolid className="mr-2" size={18} /> 027-289-077
            </p>

            <p className="text-gray-300 text-[13px] mt-5 flex font-extralight">
              <MdOutlineMailOutline className="mr-2" size={18} />
              myhtc@mytechuniverse.co.jp
            </p>
            <p className="text-gray-300 text-[13px] mt-5 flex font-extralight">
              <ImHome className="mr-2" size={18} />
              371-0854 Gunma Ken, Maebashi-shi,
            </p>
            <p className="text-gray-300 text-[13px] font-extralight ml-6">
              {" "}
              Owatarimachi 1-6-1 Okushi Maebashi,
            </p>
            <p className="text-gray-300 text-[13px] font-extralight ml-6">
              {" "}
              1-A
            </p>

            <h1 className="text-sm font-semibold text-white mt-5">
              Head Office, Nepal
            </h1>
            <p className="text-gray-300 text-[13px] mt-5 flex font-extralight">
              <FaPhone size={16} className="mr-2" />
              +977-9851113133
            </p>

            <p className="text-gray-300 text-[13px] mt-5 flex font-extralight">
              <MdOutlineMailOutline className="mr-2" size={18} />
              balabhadraandsons@gmail.com
            </p>
            <p className="text-gray-300 text-[13px] mt-5 flex font-extralight">
              <MdOutlineMailOutline className="mr-2" size={18} />
              hemanta@mytechuniverse.co.jp
            </p>
            <p className="text-gray-300 text-[13px] mt-5 flex font-extralight">
              <ImHome className="mr-2" size={18} />
              Kathmandu, Nepal
            </p>
          </div>
          <div className="main-heads">
            <h1 className="text-sm font-semibold text-white">
              Help
            </h1>
            <Link href={'/complaint'}>
              <p className="text-gray-300 text-[13px] mt-5 flex font-extralight">
                Mail a complaint
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full border border-t-[0.5px] border-r-0 border-l-0 border-gray-300 bg-[#323232] py-3 px-[80px]">
        <p className="text-xs text-gray-200 font-extralight text-center ">
          COPYRIGHT © 2021 MyTechUniverse. ALL RIGHTS RESERVED Privacy
          policyTerms and conditions
        </p>
      </div>
    </>
  );
};

export default Footer;
