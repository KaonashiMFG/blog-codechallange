import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const navItems = [
    {
      logo: "/nav/post.svg",
      label: "Post",
      herf: "/post",
    },
    {
      logo: "/nav/categories.svg",
      label: "Categories",
      herf: "/categories",
    },
    {
      logo: "/nav/about.svg",
      label: "About",
      herf: "about",
    },
  ];

  return (
    <>
      <nav className="flex justify-between p-7 shadow-sm h-20 items-center bg-main">

        <Link href="/" className="flex items-center">
          <div className="w-14 h-14">
            <Image
              src="/nav/mountain.svg"
              width={100}
              height={100}
              alt="logo"
            />
          </div>
          <span className="font-raleway -mt-2 -ml-2">Me:JP</span>
        </Link>
        
        <div className="flex items-center gap-3">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-center mx-5 cursor-pointer"
            >
              {/* Logo */}
              <div className="w-7 h-7">
                <Link href={item.herf}>
                  <Image
                    src={item.logo}
                    alt={item.label}
                    width={100}
                    height={100}
                    className="w-12 h-12 transition-transform duration-300 group-hover:-translate-y-2"
                  />
                </Link>
              </div>
              {/* Label */}
              <span className="mt-2 text-sm text-gray-500 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
