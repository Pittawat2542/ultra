import {
  ChartBarIcon,
  ClockIcon,
  GlobeIcon,
  SearchIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

import Button from "~/components/Button/Button";
import Divider from "~/components/Divider/Divider";
import Footer from "~/components/Footer/Footer";
import { Link } from "@remix-run/react";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import PageHeader from "~/components/Competitions/PageHeader/PageHeader";
import PosterCard from "~/components/Competitions/PosterCard/PosterCard";
import { formatDateTimeString } from "~/utils/time";

export default function CompetitionDetailIndex() {
  //TODO: Handle empty state when there is no poster submitted & more configuration display and ranking mode after rank announcement date passed
  return (
    <>
      <NavigationBar />
      <main className="mt-8 px-32">
        <section>
          <div className="flex items-center justify-between gap-16">
            <PageHeader title="Deep Learning Artificial Intelligence Summer School 2022 Poster Competition" />
            <div className="flex flex-1 flex-col items-center">
              <img
                className="rounded-xl object-contain transition group-hover:opacity-70"
                src="https://cdn.pixabay.com/photo/2022/06/19/11/07/bird-7271620_1280.jpg"
                alt=""
              />
              <div className="mt-6 flex w-full justify-between gap-4">
                <Link className="block w-full" to="ar">
                  <Button className="w-full">AR Experience</Button>
                </Link>
                <Link className="block w-full" to="submit">
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-8">
          <h1 className="mb-4 font-serif text-3xl font-bold">Schedule</h1>
          <p className="mb-3 text-xl">
            <ClockIcon className="mr-1 -mt-1 inline-block h-6 w-6" />{" "}
            <span className="mr-4 font-bold">Submission</span>
            {`${formatDateTimeString(
              new Date("2020-08-01T00:00:00.000Z")
            )} - ${formatDateTimeString(new Date("2020-08-30T00:00:00.000Z"))}`}
          </p>
          <p className="mb-3 text-xl">
            <StarIcon className="mr-1 -mt-1 inline-block h-6 w-6" />{" "}
            <span className="mr-4 font-bold">Voting</span>
            {`${formatDateTimeString(
              new Date("2020-09-01T00:00:00.000Z")
            )} - ${formatDateTimeString(new Date("2020-09-14T00:00:00.000Z"))}`}
          </p>
          <p className="mb-3 text-xl">
            <ChartBarIcon className="mr-1 -mt-1 inline-block h-6 w-6" />{" "}
            <span className="mr-4 font-bold">Rank Announcement</span>
            {formatDateTimeString(new Date("2020-09-15T00:00:00.000Z"))}
          </p>
        </section>
        <Divider className="mt-6 mb-4" />
        <section className="flex justify-between gap-4">
          <p className="mb-3 text-xl">
            <GlobeIcon className="mr-2 -mt-1 inline-block h-6 w-6" />{" "}
            <span className="mr-4 font-bold">Anyone Can View</span>
          </p>
          <p className="mb-3 text-xl">
            <GlobeIcon className="mr-2 -mt-1 inline-block h-6 w-6" />{" "}
            <span className="mr-4 font-bold">Anyone Can Submit</span>
          </p>
          <p className="mb-3 text-xl">
            <UserGroupIcon className="mr-2 -mt-1 inline-block h-6 w-6" />{" "}
            <span className="mr-4 font-bold">Allow Team Submission</span>
          </p>
          <p className="mb-3 text-xl">
            <SearchIcon className="mr-2 -mt-1 inline-block h-6 w-6" />{" "}
            <span className="mr-4 font-bold">Submission Require Approval</span>
          </p>
        </section>
        <Divider className="mt-2 mb-16" />
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
            Etiam class convallis viverra inceptos sodales ridiculus per lacinia
            aenean at curabitur praesent. Elementum mauris tempus semper tellus
            vivamus erat pellentesque sociosqu iaculis eleifend quis fermentum.
            Curabitur vestibulum lobortis habitasse diam eros mattis porta
            vulputate erat eu euismod semper. Scelerisque lacinia vestibulum
            quam vulputate imperdiet vivamus suspendisse enim potenti convallis
            etiam massa.
          </p>
          <p className="mb-2">
            Et vel ornare purus sem volutpat natoque ad sollicitudin dictum
            risus interdum nascetur. Morbi nullam lorem erat nisi taciti primis
            hendrerit congue cubilia aptent rutrum tellus. Quis erat placerat
            ultrices lacus molestie nascetur ac habitasse integer sociis at
            ultricies. Et tellus amet consequat curae montes feugiat primis sem
            ipsum ultrices sit class.
          </p>
          <h3 className="mt-6 mb-2 text-lg font-bold">Rules</h3>
          <p className="mb-2">
            Et vel ornare purus sem volutpat natoque ad sollicitudin dictum
            risus interdum nascetur. Morbi nullam lorem erat nisi taciti primis
            hendrerit congue cubilia aptent rutrum tellus. Quis erat placerat
            ultrices lacus molestie nascetur ac habitasse integer sociis at
            ultricies. Et tellus amet consequat curae montes feugiat primis sem
            ipsum ultrices sit class.
          </p>
        </section>
        <section className="mt-16">
          <h2 className="mb-8 font-serif text-4xl font-bold leading-10">
            Posters
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <PosterCard
              title="F.E.A.S.T: Fully-elastic Architecture Strategy for Training Neural Network"
              url="p/test"
              imageUrl="https://cdn.pixabay.com/photo/2022/07/08/02/44/pet-7308330_1280.jpg"
              authors={["John Doe", "Jane Doe"]}
            />
            <PosterCard
              title="Decepticon: An Alternative to Transformers Architecture"
              url="p/test"
              imageUrl="https://cdn.pixabay.com/photo/2022/07/06/18/34/mountains-7305769_1280.jpg"
              authors={["John Doe", "Jane Doe", "Kane Doe"]}
            />
            <PosterCard
              title="F.E.A.S.T: Fully-elastic Architecture Strategy for Training Neural Network"
              url="p/test"
              imageUrl="https://cdn.pixabay.com/photo/2022/07/08/02/44/pet-7308330_1280.jpg"
              authors={["John Doe", "Jane Doe", "Kane Doe", "Peter Doe"]}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
