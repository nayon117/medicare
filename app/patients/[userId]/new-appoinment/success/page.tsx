import Image from "next/image";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
        <Image 
        src='/assets/icons/logo-icon.svg'
        width={1000}
        height={1000}
        alt="logo"
        className="h-10 w-fit"
        />
        </Link>
      </div>
    </div>
  );
};
export default SuccessPage;
