import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

const Homepage = () => {
  return (
    <div className="flex h-screen min-h-screen">
      {/* TODO: OTP Verification | PassKeyModal */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-icon.svg"
            width={1000}
            height={1000}
            alt="illustration"
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              ©2024 Medicare
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        width={1000}
        height={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};
export default Homepage;
