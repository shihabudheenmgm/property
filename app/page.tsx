import Link from "next/link";

export default function Home() {
  return (
    <>
      <section
        className="relative flex items-center justify-center h-dvh group bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/images/bannerbg.jpg')" }}
      >
        <Link
          href={`/properties`}
          className="absolute inset-0 bg-white/70 transition-all duration-300"
        ></Link>
        <div className="container relative z-10 text-center">
          <Link
            className="m-auto px-4 py-3 bg-black text-white uppercase text-base rounded-md leading-none inline-flex items-center justify-center text-center transition-all group-hover:bg-cyan-600 group-hover:text-white"
            href={`/properties`}
          >
            View Properties
          </Link>
        </div>
      </section>
    </>
  );
}
