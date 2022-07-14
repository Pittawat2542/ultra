import {
  ExternalLinkIcon,
  LinkIcon,
  UserIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";

import Button from "~/components/Button/Button";
import Divider from "~/components/Divider/Divider";
import Footer from "~/components/Footer/Footer";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import PageHeader from "~/components/Competitions/PageHeader/PageHeader";
import { formatNames } from "~/utils/string";

export default function PosterDetail() {
  return (
    <>
      <NavigationBar />
      <main className="mt-8 px-32">
        <section className="mt-8">
          <PageHeader
            title="F.E.A.S.T: Fully-elastic Architecture Strategy for Training Neural
            Network"
            subtitle={
              <p className="mt-4 text-xl">
                As a part of{" "}
                <a
                  className="ml-1 font-serif text-2xl font-bold hover:underline"
                  href="/competition/c/test"
                >
                  Deep Learning Artificial Intelligence Summer School 2022
                  Poster Competition
                </a>
              </p>
            }
          />
          <img
            className="mt-16 mb-8 max-h-[750px] w-full rounded-xl object-cover transition group-hover:opacity-70"
            src="https://cdn.pixabay.com/photo/2022/07/08/02/44/pet-7308330_1280.jpg"
            alt=""
          />
          <div className="flex justify-between">
            <div className="flex-7 flex flex-col">
              <p className="mb-3 text-xl">
                <UserIcon className="mr-1 -mt-1 inline-block h-6 w-6" />{" "}
                <span className="mr-4 font-bold">Authors</span>
                {formatNames(["John Doe", "Jane Doe"])}
              </p>
              <p className="mb-3 text-xl">
                <LinkIcon className="mr-1 -mt-1 inline-block h-6 w-6" />{" "}
                <span className="mr-4 font-bold">Poster</span>
                <span className="hover:underline">
                  <a href="http://example.com">
                    http://example.com
                    <ExternalLinkIcon className="ml-2 -mt-1 inline-block h-4 w-4" />
                  </a>
                </span>
              </p>
              <p className="mb-3 text-xl">
                <VideoCameraIcon className="mr-1 -mt-1 inline-block h-6 w-6" />{" "}
                <span className="mr-4 font-bold">Video</span>
                <span className="hover:underline">
                  <a href="http://example.com">
                    http://example.com
                    <ExternalLinkIcon className="ml-2 -mt-1 inline-block h-4 w-4" />
                  </a>
                </span>
              </p>
            </div>
            <div className="flex max-w-[30%] flex-1 flex-col justify-between">
              <Button className="w-full">AR Experience</Button>
              <Button className="w-full">Vote</Button>
            </div>
          </div>
        </section>
        <Divider className="my-8" />
        <section className="text-lg">
          <p className="mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus sit
            est maecenas curae consectetur viverra ac faucibus lectus mus
            dapibus odio. Eget quam sapien suscipit facilisi tempor phasellus
            tortor cum aptent neque quam orci. Convallis nec litora conubia
            faucibus taciti fringilla conubia malesuada ridiculus platea
            elementum erat.
          </p>
          <p className="mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus sit
            est maecenas curae consectetur viverra ac faucibus lectus mus
            dapibus odio. Eget quam sapien suscipit facilisi tempor phasellus
            tortor cum aptent neque quam orci. Convallis nec litora conubia
            faucibus taciti fringilla conubia malesuada ridiculus platea
            elementum erat.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
