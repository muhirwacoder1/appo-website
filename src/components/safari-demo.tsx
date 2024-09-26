import Image from 'next/image';
import { cn } from "@/lib/utils";

const SafariDemo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full aspect-[16/9] bg-white rounded-2xl shadow-2xl", className)}>
      <div className="w-full h-full relative">
        <Image
          src="/path-to-your-image.jpg"
          alt="Safari Demo"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default SafariDemo;