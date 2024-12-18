import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between p-7 shadow-sm h-10 items-center bg-main">
        <h1>logo</h1>

        <div className="flex gap-5">
          <div className="flex gap-7 mr-5 text-bold">
            <Link href="/">Posts</Link>
            <Link href="/">Categories</Link>
            <Link href="/about">About</Link>
          </div>
          
          <span>Dark Mode</span>
        </div>
      </nav>
    </>
  );
}
