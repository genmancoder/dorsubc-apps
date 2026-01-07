import { DisplayArea } from "@/components/container/display-area";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen p-4 pb-20 gap-2 sm:p-15">
      <main className="flex  gap-[16px] row-start-2 items-center sm:items-start">
        {/* <Window title="Window 1" /> */}
        <DisplayArea />
        {/* <MediaPlayer/> */}
        {/* <Window title="BSBA" /> */}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Current Queue
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/request"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Request Number
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          DOrSU Banaybanay Campus - SRIS
        </Link>

        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Settings
        </Link>
      </footer>
    </div>
  );
}
