import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { avatarData } from "@/motion/orbit-data";
import {
  calculateOrbitPositions,
  startOrbitAnimation,
  startCounterRotationAnimation,
} from "@/motion/orbit-animation";
import OrbitBackground from "@/motion/orbit-background";

function OrbitAvatars() {
  const [isLoaded, setIsLoaded] = useState(false);
  const size = 320;
  const center = size / 2;
  const gap = 15;
  const radius = 135;
  const avatarSize = 52;

  // Animation controls for smooth animation
  const orbitControls = useAnimationControls();
  const avatarControls = avatarData.map(() => useAnimationControls());

  // Start animations only after component fully mounts and images load
  useEffect(() => {
    setIsLoaded(true);

    // Initialize animations using functions from motion utilities
    startOrbitAnimation(orbitControls);
    startCounterRotationAnimation(avatarControls);
  }, []);

  // Pre-calculate avatar positions using the utility function
  const avatarPositions = calculateOrbitPositions(
    avatarData,
    center,
    center,
    radius,
    avatarSize
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
            width: 130, // 8.125rem
            height: 130, // 8.125rem
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
              <motion.div
                key={item.label}
                className="absolute"
                style={{
                  left: avatarPositions[index].x,
                  top: avatarPositions[index].y,
                  width: avatarSize,
                  height: avatarSize,
                  transformOrigin: "center",
                  opacity: isLoaded ? 1 : 0, // Start visible only after loaded
                }}
                animate={avatarControls[index]}
                initial={{ rotate: 0 }}
              >
                <Avatar className="size-[3.25rem] select-none">
                  <AvatarImage src={item.image} alt={item.label} />
                  <AvatarFallback>{item.label}</AvatarFallback>
                </Avatar>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </OrbitBackground>
    </div>
  );
}

export default OrbitAvatars;
