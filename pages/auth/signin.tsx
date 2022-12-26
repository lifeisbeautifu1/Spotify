import Image from "next/image";
import Head from "next/head";
import { useEffect } from "react";
import { getProviders, useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { Loader } from "../../components";

const SignIn = ({ providers }: any) => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  if (session) {
    return <Loader />;
  }
  return (
    <>
      <Head>
        <title>Login - Spotify</title>
        <link rel="icon" href="https://www.scdn.co/i/_global/favicon.png" />
      </Head>
      <main className="h-screen flex flex-col items-center pt-40 space-y-8">
        <Image
          src="https://rb.gy/y9mwtb"
          width={600}
          height={250}
          objectFit="contain"
          className="animate-pulse"
        />
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id)}
              className="text-white py-4 px-6 rounded-full bg-[#1db954]
             transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#0db146]"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </main>
    </>
  );
};

export default SignIn;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
