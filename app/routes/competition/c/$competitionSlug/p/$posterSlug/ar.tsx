import { BrowserView, MobileView } from "react-device-detect";
import { DeviceMobileIcon, StopIcon } from "@heroicons/react/outline";
import { useLoaderData } from "@remix-run/react";

import Footer from "~/components/Footer/Footer";
import type { LoaderArgs } from "@remix-run/node";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import { getAllMarkingsByPosterId } from "~/models/arMarking.server";
import { getPosterBySlug } from "~/models/poster.server";
import invariant from "tiny-invariant";
import { json } from "@remix-run/node";

export const loader = async ({ params }: LoaderArgs) => {
  const { posterSlug } = params;

  invariant(posterSlug, "Poster slug is not found.");

  const poster = await getPosterBySlug(posterSlug);

  if (!poster) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const markings = await getAllMarkingsByPosterId(poster.id);

  return json({ poster, markings });
};

export default function AR() {
  const { poster, markings } = useLoaderData<typeof loader>();

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
        {poster.compiledARFilePath ? (
          <>
            <script src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/dist/mindar-image.prod.js"></script>
            <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
            <script src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/dist/mindar-image-aframe.prod.js"></script>
            <a-scene mindar-image={`imageTargetSrc: ${poster.compiledARFilePath};`} color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
              <a-assets>
                {markings.map((marking) => {
                  if (marking.associatedMediaType === 'IMAGE') return <img key={`media-${marking.id}`} id={marking.id} src={marking.associatedMediaPath} />
                  if (marking.associatedMediaType === 'THREE_D_MODEL') return <a-asset-item key={`media-${marking.id}`} id={marking.id} src={marking.associatedMediaPath}></a-asset-item>
                })}
              </a-assets>

              <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

              {markings.map((marking, index) => (
                <a-entity key={`entity-${marking.id}`} mindar-image-target={`targetIndex: ${index}`}>
                  {marking.associatedMediaType === 'IMAGE' && <a-plane key={`plane-entity-${marking.id}`} src={`#${marking.id}`} position="0 0 0" height="0.55" width="1" rotation="0 0 0"></a-plane>}
                  {marking.associatedMediaType === 'THREE_D_MODEL' && <a-gltf-model key={`model-entity-${marking.id}`} rotation="0 0 0 " position="0 0 0.1" scale="0.005 0.005 0.005" src={`#${marking.id}`} animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate" />}
                </a-entity>
              )}
            </a-scene>
          </>
        ) : (
          <h1 className="mt-8 text-center text-4xl">
            This poster does not added AR experience, yet.
          </h1>
        )}
      </MobileView>
    </>
  );
}
