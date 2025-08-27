import AuthCard from "@/components/ui/card";
import { ChevronUp, HeartHandshake, Lock } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function Auth() {
  return (
    <div className="flex flex-col xl:flex-row justify-center items-center min-h-screen gap-10 px-8">
      <section className="order-2 xl:order-1 flex flex-1 justify-center">
        <AuthCard />
      </section>
      <section className="mt-20 xl:mt-0 order-1 xl:order-2 flex flex-1 items-center ">
        <div className="space-y-10 shadow-2xl rounded-3xl bg-gray-300 bg-[url('/assets/auth_page.png')] bg-[length:40%] bg-no-repeat bg-right-bottom  relative p-6">
          <h1 className="heading-primary">
            Secure Every Collaboration,
            <br /> Effortlessly
          </h1>
          <p className="heading-sub">
            From creators to corporates - Creed Link ensures your <br />{" "}
            agreements are digital, fast and legally binding. <br /> Build trust
            in every project, one click at a time.
          </p>
          <p className="flex">
            <Lock />
            <span className="body-text">
              Legally Compliant Digital Signatures
            </span>
          </p>
          <p className="flex">
            <HeartHandshake />
            <span className="body-text">
              Creator-to-Creator & Creator-to-Corporate Agreements
            </span>
          </p>
          <p className="flex">
            <ChevronUp />
            <span className="body-text">Instant Access, Anywhere, Anytime</span>
          </p>
          {/* <Image className="absolute -z-1 bottom-0 right-0" src={"/assets/auth_page.png"} width={500} height={500} alt={"What is Creed Link about?"} /> */}
        </div>
      </section>
    </div>
  );
}
