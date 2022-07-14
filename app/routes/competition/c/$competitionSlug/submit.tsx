import Button from "~/components/Button/Button";
import Divider from "~/components/Divider/Divider";
import Footer from "~/components/Footer/Footer";
import { Form } from "@remix-run/react";
import ListInput from "~/components/ListInput/ListInput";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import PageHeader from "~/components/Competitions/PageHeader/PageHeader";
import TextArea from "~/components/TextInput/TextArea";
import TextInput from "~/components/TextInput/TextInput";
import { UploadIcon } from "@heroicons/react/outline";
import { useDropzone } from "react-dropzone";

export default function PastCompetitions() {
  //TODO: Complete author inputs
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
    });

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
            <label className="my-4 block font-bold" htmlFor="poster-image">
              Poster Image{" "}
              <span className="font-normal italic">(Required)</span>
              <div
                {...getRootProps()}
                className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white px-8 py-16 font-normal hover:bg-white hover:bg-opacity-30 focus:bg-opacity-30"
              >
                <input
                  name="poster-image"
                  id="poster-image"
                  {...getInputProps()}
                />
                <UploadIcon className="mb-2 h-16 w-16 stroke-1" />
                <p className="text-xl font-bold">Upload Poster Image File</p>
                <p className="mb-3">
                  Drag &amp; Drop to This Area or click to choose from file
                  manager.
                </p>
                <p className="italic">
                  <span className="font-bold">Accepted Format:</span> .jpg,
                  .jpeg, .png
                </p>
                <p className="italic">
                  <span className="font-bold">Recommended resolution:</span> ???
                  x ???,
                </p>
                <p className="italic">
                  <span className="font-bold">Maximum number of file:</span> 1
                  file
                </p>
                <p className="italic">
                  <span className="font-bold">Maximum file size:</span> 10MB
                </p>
              </div>
            </label>
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
            <ListInput
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
              <Button className="w-1/6">Add AR Poster</Button>
            </div>
          </Form>
        </section>
      </main>
      <Footer />
    </>
  );
}
