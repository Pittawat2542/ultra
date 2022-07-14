import Button from "~/components/Button/Button";
import Footer from "~/components/Footer/Footer";
import { Form } from "@remix-run/react";
import ImageListInput from "~/components/ListInput/ImageListInput";
import type { LinksFunction } from "@remix-run/server-runtime";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import PageHeader from "~/components/Competitions/PageHeader/PageHeader";
import SectionHeader from "~/components/Competitions/SectionHeader/SectionHeader";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/cropper/4.1.0/cropper.min.css",
    },
  ];
};

export default function ARPosterSubmission() {
  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <section className="mt-8">
          <PageHeader
            title="AR Poster Submission"
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
          <SectionHeader
            title="F.E.A.S.T: Fully-elastic Architecture Strategy for Training Neural Network"
            className="my-8"
          />
          <Form>
            <ImageListInput
              labelText="Marking(s)"
              isRequired={true}
              addNewLabelText="Marking"
            />
            <div className="flex justify-end gap-8">
              <Button className="w-1/6">Submit</Button>
            </div>
          </Form>
        </section>
      </main>
      <Footer />
    </>
  );
}
