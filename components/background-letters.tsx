"use client";

const backgroundLetters = [
  { letter: "P", x: "11%", y: "7%" },
  { letter: "F", x: "21%", y: "59%" },
  { letter: "S", x: "8%", y: "38%" },
  { letter: "C", x: "74%", y: "33%" },
  { letter: "M", x: "89%", y: "7%" },
  { letter: "A", x: "84%", y: "82%" },
  { letter: "W", x: "86%", y: "52%" },
  { letter: "G", x: "5%", y: "82%" },
];

function BackgroundLetters() {
  return (
    <div className="absolute inset-0 z-0 ">
      {backgroundLetters.map((item, index) => (
        <div
          key={index}
          className="absolute flex w-15 h-15 items-center justify-center rounded-full bg-[linear-gradient(to_bottom,#282832,#212121,#121212)] text-3xl font-bold text-[#C4C4C8] blur-[0.21875rem]"
          style={{
            top: item.y,
            left: item.x,
          }}
        >
          {item.letter}
        </div>
      ))}
    </div>
  );
}

export default BackgroundLetters;
