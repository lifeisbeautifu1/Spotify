import Image from "next/image";
import { PulseLoader } from "react-spinners";

function Loader() {
  return (
    <div className="h-screen bg-black">
      <div className="pt-40 flex flex-col items-center space-y-4">
        <span className="relative w-[400px] h-[250px] lg:w-[550px] lg:h-[240px]">
          <Image
            src="https://rb.gy/y9mwtb"
            layout="fill"
            objectFit="contain"
            className="animate-pulse"
          />
        </span>
        <PulseLoader size={20} color="#fff" speedMultiplier={0.5} />
      </div>
    </div>
  );
}

export default Loader;
