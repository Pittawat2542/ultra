import {
  AcceptedPosterType,
  SubmissionPolicy,
  SubmissionPrivacy,
  TeamSubmission,
  ViewingPrivacy,
  VotingPrivacy,
} from "@prisma/client";
import type { ActionArgs, LinksFunction } from "@remix-run/node";

import Button from "~/components/Button/Button";
import DateInput from "~/components/DateInput/DateInput";
import Divider from "~/components/Divider/Divider";
import FileUploadInput from "~/components/FileUploadInput/FileUploadInput";
import Footer from "~/components/Footer/Footer";
import { Form } from "@remix-run/react";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import PageHeader from "~/components/Competitions/PageHeader/PageHeader";
import SelectInput from "~/components/SelectInput/SelectInput";
import TextArea from "~/components/TextInput/TextArea";
import TextInput from "~/components/TextInput/TextInput";
import TextListInput from "~/components/ListInput/TextListInput";
import TimeInput from "~/components/TimeInput/TimeInput";
import moment from "moment";
import { useState } from "react";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/filepond/4.30.4/filepond.min.css",
    },
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/filepond-plugin-image-preview@4.6.11/dist/filepond-plugin-image-preview.css",
    },
  ];
};

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  console.log(body);
}

export default function NewCompetition() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [maximumNumberOfSubmittedPoster, setMaximumNumberOfSubmittedPoster] =
    useState("");
  const [maximumTeamSize, setMaximumTeamSize] = useState("2");
  const [viewingCode, setViewingCode] = useState("");
  const [submissionCode, setSubmissionCode] = useState("");
  const [votingCode, setVotingCode] = useState("");
  const [selectedViewingPrivacy, setSelectedViewingPrivacy] =
    useState<ViewingPrivacy>(ViewingPrivacy.PUBLIC);
  const [selectedSubmissionPrivacy, setSelectedSubmissionPrivacy] =
    useState<SubmissionPrivacy>(SubmissionPrivacy.PUBLIC);
  const [selectedSubmissionPolicy, setSelectedSubmissionPolicy] =
    useState<SubmissionPolicy>(SubmissionPolicy.NONE);
  const [selectedVotingPrivacy, setSelectedVotingPrivacy] =
    useState<VotingPrivacy>(VotingPrivacy.PUBLIC);
  const [selectedPosterType, setSelectedPosterType] =
    useState<AcceptedPosterType>(AcceptedPosterType.IMAGE);
  const [selectedTeamSubmission, setSelectedTeamSubmission] =
    useState<TeamSubmission>(TeamSubmission.ENABLED);
  const [submissionStartDate, setSubmissionStartDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [submissionStartTime, setSubmissionStartTime] = useState(
    moment().format("HH:mm")
  );
  const [submissionEndDate, setSubmissionEndDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [submissionEndTime, setSubmissionEndTime] = useState(
    moment().format("HH:mm")
  );
  const [votingStartDate, setVotingStartDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [votingStartTime, setVotingStartTime] = useState(
    moment().format("HH:mm")
  );
  const [votingEndDate, setVotingEndDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [votingEndTime, setVotingEndTime] = useState(moment().format("HH:mm"));
  const [rankAnnouncementDate, setRankAnnouncementDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [rankAnnouncementTime, setRankAnnouncementTime] = useState(
    moment().format("HH:mm")
  );

  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <section className="mt-8">
          <PageHeader title="Start a New Competition" />
          <Form method="post" action="">
            <FileUploadInput
              id="cover-image"
              labelText="Cover Image"
              type="image"
              callToActionText={"Upload Cover Image File"}
            />
            <TextInput
              labelText="Title"
              id="title"
              isRequired={true}
              maxLength={250}
              value={title}
              setValue={setTitle}
            />
            <TextArea
              labelText="Abstract"
              id="detail"
              isRequired={true}
              maxLength={2500}
              value={abstract}
              setValue={setAbstract}
            />
            <TextListInput
              labelText="Organizer(s)"
              isRequired={true}
              addNewLabelText="Organizer"
            />
            <h3 className="mt-8 font-serif text-2xl">General</h3>
            <Divider className="my-2" />
            <div className="my-4 flex justify-between gap-4">
              <SelectInput
                labelText="Submission Policy"
                choices={Object.values(SubmissionPolicy)}
                selectedChoice={selectedSubmissionPolicy}
                setSelectedChoice={(submissionPolicy: string) =>
                  setSelectedSubmissionPolicy(
                    submissionPolicy as SubmissionPolicy
                  )
                }
              />
              <SelectInput
                labelText="Poster Type"
                choices={Object.values(AcceptedPosterType)}
                selectedChoice={selectedPosterType}
                setSelectedChoice={(posterType: string) =>
                  setSelectedPosterType(posterType as AcceptedPosterType)
                }
              />
              <label className="flex items-center gap-4">
                Maximum Number of Submitted Poster
                <TextInput
                  id="max-number-poster"
                  type="number"
                  value={maximumNumberOfSubmittedPoster}
                  setValue={setMaximumNumberOfSubmittedPoster}
                />
              </label>
            </div>
            <div className="my-4 flex gap-8">
              <SelectInput
                labelText="Team Submission"
                choices={Object.values(TeamSubmission)}
                selectedChoice={selectedTeamSubmission}
                setSelectedChoice={(teamSubmission: string) =>
                  setSelectedTeamSubmission(teamSubmission as TeamSubmission)
                }
              />
              {selectedTeamSubmission === TeamSubmission.ENABLED && (
                <label className="flex items-center gap-4">
                  Maximum Number of Members Per Team
                  <TextInput
                    id="max-number-per-team"
                    type="number"
                    value={maximumTeamSize}
                    setValue={setMaximumTeamSize}
                  />
                </label>
              )}
            </div>
            <h3 className="mt-8 font-serif text-2xl">Privacy</h3>
            <Divider className="my-2" />
            <div className="my-4 flex justify-between gap-4">
              <SelectInput
                labelText="Viewing Privacy"
                choices={Object.values(ViewingPrivacy)}
                selectedChoice={selectedViewingPrivacy}
                setSelectedChoice={(viewingPrivacy: string) =>
                  setSelectedViewingPrivacy(viewingPrivacy as ViewingPrivacy)
                }
              />
              <SelectInput
                labelText="Submission Privacy"
                choices={Object.values(SubmissionPrivacy)}
                selectedChoice={selectedSubmissionPrivacy}
                setSelectedChoice={(submissionPrivacy: string) =>
                  setSelectedSubmissionPrivacy(
                    submissionPrivacy as SubmissionPrivacy
                  )
                }
              />
              <SelectInput
                labelText="Voting Privacy"
                choices={Object.values(VotingPrivacy)}
                selectedChoice={selectedVotingPrivacy}
                setSelectedChoice={(votingPrivacy: string) =>
                  setSelectedVotingPrivacy(votingPrivacy as VotingPrivacy)
                }
              />
            </div>
            <div
              className={`my-4 flex gap-8 ${
                selectedViewingPrivacy === ViewingPrivacy.LIMITED &&
                selectedSubmissionPrivacy === SubmissionPrivacy.LIMITED &&
                selectedVotingPrivacy === VotingPrivacy.LIMITED &&
                "justify-between"
              }`}
            >
              {selectedViewingPrivacy === ViewingPrivacy.LIMITED && (
                <label className="flex items-center gap-4">
                  Viewing Code
                  <TextInput
                    id="viewing-code"
                    isRequired={true}
                    value={viewingCode}
                    setValue={setViewingCode}
                  />
                </label>
              )}
              {selectedSubmissionPrivacy === SubmissionPrivacy.LIMITED && (
                <label className="flex items-center gap-4">
                  Submission Code
                  <TextInput
                    id="submission-code"
                    isRequired={true}
                    value={submissionCode}
                    setValue={setSubmissionCode}
                  />
                </label>
              )}
              {selectedVotingPrivacy === VotingPrivacy.LIMITED && (
                <label className="flex items-center gap-4">
                  Voting Code
                  <TextInput
                    id="voting-code"
                    isRequired={true}
                    value={votingCode}
                    setValue={setVotingCode}
                  />
                </label>
              )}
            </div>
            <h3 className="mt-8 font-serif text-2xl">Schedule</h3>
            <Divider className="my-2" />
            <div className="my-4 flex gap-8">
              <p className="flex items-center font-bold">Submission</p>
              <p className="flex items-center">Start</p>
              <DateInput
                id="submission-start-date"
                isRequired={true}
                value={submissionStartDate}
                setValue={setSubmissionStartDate}
              />
              <TimeInput
                id="submission-start-time"
                isRequired={true}
                value={submissionStartTime}
                setValue={setSubmissionStartTime}
              />
              <p className="flex items-center">End</p>
              <DateInput
                id="submission-end-date"
                isRequired={true}
                value={submissionEndDate}
                setValue={setSubmissionEndDate}
              />
              <TimeInput
                id="submission-end-time"
                isRequired={true}
                value={submissionEndTime}
                setValue={setSubmissionEndTime}
              />
            </div>
            {selectedVotingPrivacy !== VotingPrivacy.DISABLED && (
              <div className="my-4 flex gap-8">
                <p className="flex items-center font-bold">Voting</p>
                <p className="flex items-center">Start</p>
                <DateInput
                  id="voting-start-date"
                  isRequired={true}
                  value={votingStartDate}
                  setValue={setVotingStartDate}
                />
                <TimeInput
                  id="voting-start-time"
                  isRequired={true}
                  value={votingStartTime}
                  setValue={setVotingStartTime}
                />
                <p className="flex items-center">End</p>
                <DateInput
                  id="voting-end-date"
                  isRequired={true}
                  value={votingEndDate}
                  setValue={setVotingEndDate}
                />
                <TimeInput
                  id="voting-end-time"
                  isRequired={true}
                  value={votingEndTime}
                  setValue={setVotingEndTime}
                />
              </div>
            )}
            <div className="my-4 flex gap-8">
              <p className="flex items-center font-bold">
                Ranking Announcement
              </p>
              <DateInput
                id="rank-announce-date"
                isRequired={true}
                value={rankAnnouncementDate}
                setValue={setRankAnnouncementDate}
              />
              <TimeInput
                id="rank-announce-time"
                isRequired={true}
                value={rankAnnouncementTime}
                setValue={setRankAnnouncementTime}
              />
            </div>
            <Divider className="my-8" />
            <div className="flex justify-end gap-8">
              <Button type="submit" className="w-1/6">
                Submit
              </Button>
            </div>
          </Form>
        </section>
      </main>
      <Footer />
    </>
  );
}
