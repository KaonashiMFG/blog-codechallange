import Image from "next/image";

export default function Hero() {
  return (
    <div className="max-w-screen-xl m-20">
      <div>
      <h1>My Featured Post</h1>
        <span>disini slogan</span>
        <p className="break-words">
          Very long text goes here...
          bfbbfbbfbbfbbfbbfbbfbbfbbfbbfbbfbbfbbfbbfbbfbbfbbfbbfbbfbbfbwndddddddddddddddddddddddddddddddddddddddddddddddddddddddnwwwwwwwwwnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnndwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwbf...
        </p>
      </div>

      <div className="w-10 h-10 object-cover">
        <Image src="/myself.jpg" width={100} height={100} alt="dummy"/>
      </div>
    </div>
  );
}
