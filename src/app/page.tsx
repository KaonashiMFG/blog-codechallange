import Image from "next/image";

export default function Hero() {
  return (
    <div className="max-w-full my-20 px-20 py-5 bg-main">
      <h1 className="bg-secondary p-2">My Featured Post</h1>
      <div className="grid grid-cols-2 gap-1 mt-3">
        <div className="pr-10 flex flex-col gap-2">
          <h2>disini judul</h2>
          <p className="break-words">
            kbwdwbkdwbbbbbbbwwwwwwwwwwwwwwwwwwwwwwwwwwwwbkwdddddwkdbkwbdkwdbwkdbwdbkwdwdbkwkdwbdwkdeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.
          </p>
        </div>
        <div className="w-full h-full border-2 border-secondary items-center justify-center flex">
          <Image src="/myself.jpg" width={100} height={100} alt="dummy" className="object-cover"/>
        </div>
      </div>
    </div>
  );
}
