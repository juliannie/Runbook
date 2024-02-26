import Image from "next/image";
import RunbookLogo from "../../public/Runbook.png";

export default function Home() {
  return (
    <div className="container flex flex-col items-center text-center">
      <Image
        src={RunbookLogo}
        alt="Futuristic notebook"
        width={500}
        height={500}
      />

      <h1>Get started with Runbook today!</h1>
    </div>
  );
}
