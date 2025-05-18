import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { avatarData } from "@/components/motion/orbit-data";
import {
  calculateOrbitPositions,
  startOrbitAnimation,
} from "@/components/motion/orbit-animation";
import OrbitBackground from "@/components/motion/orbit-background";

interface AvatarDataItem {
  label: string;
  image: string;
  angle: number;
}

interface OrbitingAvatarItemProps {
  item: AvatarDataItem;
  initialPosition: { x: number; y: number };
  avatarSize: number;
  isLoaded: boolean;
  orbitDuration?: number;
}

function OrbitingAvatarItem({
  item,
  initialPosition,
  avatarSize,
  isLoaded,
  orbitDuration = 45,
}: OrbitingAvatarItemProps) {
  const itemControl = useAnimationControls();

  useEffect(() => {
    if (isLoaded) {
      itemControl.start({
        rotate: -360,
        transition: {
          duration: orbitDuration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        },
      });
    }
  }, [isLoaded, itemControl, orbitDuration]);

  return (
    <motion.div
      key={item.label}
      className="absolute"
      style={{
        left: initialPosition.x,
        top: initialPosition.y,
        width: avatarSize,
        height: avatarSize,
        transformOrigin: "center",
        opacity: isLoaded ? 1 : 0,
      }}
      animate={itemControl}
      initial={{ rotate: 0 }}
    >
      <Avatar className="size-[3.25rem] select-none">
        <AvatarImage src={item.image} alt={item.label} />
        <AvatarFallback>{item.label}</AvatarFallback>
      </Avatar>
    </motion.div>
  );
}

function OrbitAvatars() {
  const [isLoaded, setIsLoaded] = useState(false);
  const size = 320;
  const center = size / 2;
  const gap = 15;
  const radius = 135;
  const avatarSize = 52;
  const orbitDuration = 45; // Consistent duration

  const orbitControls = useAnimationControls();

  useEffect(() => {
    setIsLoaded(true);
    startOrbitAnimation(orbitControls, orbitDuration);
  }, [orbitControls, orbitDuration]);

  const avatarPositions = useMemo(
    () =>
      calculateOrbitPositions(avatarData, center, center, radius, avatarSize),
    [center, radius, avatarSize]
  );

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        flexGrow: 0,
        backgroundColor: "transparent",
      }}
    >
      <OrbitBackground size={size} rings={5} gap={gap} color="#FFFFFF1F">
        <div
          className="bg-background-default/5 flex rounded-full absolute"
          style={{
            width: 130,
            height: 130,
            top: "calc(50% - 65px)",
            left: "calc(50% - 65px)",
          }}
        >
          <Image
            src="/logo.svg"
            alt="logo"
            width={84}
            height={84}
            className="m-auto"
            priority
          />
        </div>

        <div
          className="absolute"
          style={{
            width: size,
            height: size,
            top: 0,
            left: 0,
          }}
        >
          <motion.div
            className="relative w-full h-full"
            style={{ transformOrigin: "center" }}
            animate={orbitControls}
            initial={{ rotate: 0 }}
          >
            {avatarData.map((item, index) => (
              <OrbitingAvatarItem
                key={item.label}
                item={item as AvatarDataItem}
                initialPosition={avatarPositions[index]}
                avatarSize={avatarSize}
                isLoaded={isLoaded}
                orbitDuration={orbitDuration}
              />
            ))}
          </motion.div>
        </div>
      </OrbitBackground>
    </div>
  );
}

export default OrbitAvatars;
