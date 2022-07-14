import { Form, Link } from "@remix-run/react";

import Button from "~/components/Button/Button";
import Divider from "~/components/Divider/Divider";
import FileUploadInput from "~/components/FileUploadInput/FileUploadInput";
import Footer from "~/components/Footer/Footer";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import PageHeader from "~/components/Competitions/PageHeader/PageHeader";
import TextArea from "~/components/TextInput/TextArea";
import TextInput from "~/components/TextInput/TextInput";
import TextListInput from "~/components/ListInput/TextListInput";

export default function PosterSubmission() {
  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <section className="mt-8">
          <PageHeader
            title="Poster Submission"
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
          <Form>
            <FileUploadInput
              id="poster-image"
              labelText="Poster Image"
              isRequired={true}
              type="image"
              callToActionText={"Upload Poster Image File"}
            />
            <TextInput
              labelText="Title"
              id="title"
              isRequired={true}
              maxLength={250}
            />
            <TextArea
              labelText="Abstract"
              id="abstract"
              isRequired={true}
              maxLength={2500}
            />
            <TextListInput
              labelText="Author(s)"
              isRequired={true}
              addNewLabelText="Author"
              maxItems={1}
            />
            <TextInput
              labelText="URL Link to Original Poster File"
              id="poster-url"
            />
            <TextInput
              labelText="URL Link to Video Presentation"
              id="video-url"
            />
            <Divider className="mt-4 mb-6" />
            <div className="flex justify-end gap-8">
              <Button className="w-1/6">Submit</Button>
              <Link className="w-1/6" to="ar">
                <Button className="w-full">Add AR Poster</Button>
              </Link>
            </div>
          </Form>
        </section>
      </main>
      <Footer />
    </>
  );
}
