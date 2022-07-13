import { BrowserView, MobileView } from "react-device-detect";

import { DeviceMobileIcon } from "@heroicons/react/outline";
import Footer from "~/components/Footer/Footer";
import NavigationBar from "~/components/NavigationBar/NavigationBar";

export default function AR() {
  return (
    <>
      <BrowserView>
        <NavigationBar />
        <main className="px-32 flex flex-col justify-center items-center mt-8">
          <DeviceMobileIcon className="h-1/4 w-1/4 stroke-1" />
          <h1 className="font-bold text-4xl text-center mt-8">
            Please continue the augmented reality experience on mobile device.
          </h1>
        </main>
        <Footer />
      </BrowserView>
      <MobileView>
        <h1>AR Content Goes Here</h1>
      </MobileView>
    </>
  );
}
