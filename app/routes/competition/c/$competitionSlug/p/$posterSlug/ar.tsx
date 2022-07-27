import { BrowserView, MobileView } from "react-device-detect";
import { DeviceMobileIcon, StopIcon } from "@heroicons/react/outline";

import Footer from "~/components/Footer/Footer";
import type { LoaderArgs } from "@remix-run/node";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import { getPosterBySlug } from "~/models/poster.server";
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderArgs) => {
  const { posterSlug } = params;

  invariant(posterSlug, "Poster slug is not found.");

  const poster = await getPosterBySlug(posterSlug);

  if (!poster) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  return json({ poster });
};

export default function AR() {
  const { poster } = useLoaderData<typeof loader>();

  return poster.competition.acceptedPosterType === "IMAGE" ? (
    <>
      <NavigationBar />
      <main className="mt-8 flex flex-col items-center justify-center px-32">
        <StopIcon className="h-1/4 w-1/4 stroke-1" />
        <h1 className="mt-8 text-center text-4xl">
          AR Experience is not supported by this competition.
        </h1>
      </main>
      <Footer />
    </>
  ) : (
    <>
      <BrowserView>
        <NavigationBar />
        <main className="mt-8 flex flex-col items-center justify-center px-32">
          <DeviceMobileIcon className="h-1/4 w-1/4 stroke-1" />
          <h1 className="mt-8 text-center text-4xl">
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
