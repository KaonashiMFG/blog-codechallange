import Link from "next/link";
import Image from "next/image";
import navItems from "../data/navItems.json";

export default function Navbar() {
  return (
    <>
      <nav className="flex h-20 items-center justify-between bg-main p-7 shadow-sm">
        <Link href="/" className="flex items-center">
          <div className="h-14 w-14">
            <Image
              src="/nav/mountain.svg"
              width={100}
              height={100}
              alt="logo"
            />
          </div>
          <span className="-ml-2 -mt-2 font-raleway text-secondary">Me:JP</span>
        </Link>

        <div className="flex items-center gap-3">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="group mx-5 flex cursor-pointer flex-col items-center"
            >
              {/* Logo */}
              <div className="h-7 w-7">
                <Link href={item.herf}>
                  <Image
                    src={item.logo}
                    alt={item.label}
                    width={100}
                    height={100}
                    className="h-12 w-12 transition-transform duration-300 group-hover:-translate-y-2"
                  />
                </Link>
              </div>
              {/* Label */}
              <span className="mt-2 translate-y-2 text-sm text-secondary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
