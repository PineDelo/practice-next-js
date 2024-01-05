import Image from "next/image";
import Styles from "@/styles/app/components/splashScreen.module.scss";

const SplashScreen = () => {
  return (
    <main>
      <Image
        className={Styles.bounceImage}
        src="/splash_screen_icon.svg"
        alt="splash screen"
        width={500}
        height={500}
      />
    </main>
  );
};

export default SplashScreen;
