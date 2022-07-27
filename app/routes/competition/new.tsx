import {
  AcceptedPosterType,
  SubmissionPolicy,
  SubmissionPrivacy,
  TeamSubmission,
  ViewingPrivacy,
  VotingPrivacy,
} from "@prisma/client";
import type { ActionArgs, LinksFunction } from "@remix-run/node";
import { createNewCompetition, isSlugExist } from "~/models/competition.server";
import {
  redirect,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";

import Button from "~/components/Button/Button";
import DateInput from "~/components/Inputs/DateInput";
import Divider from "~/components/Divider/Divider";
import FileUploadInput from "~/components/Inputs/FileUploadInput";
import Footer from "~/components/Footer/Footer";
import { Form } from "@remix-run/react";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import PageHeader from "~/components/Competitions/PageHeader/PageHeader";
import SelectInput from "~/components/Inputs/SelectInput";
import ShortUniqueId from "short-unique-id";
import TextArea from "~/components/Inputs/TextArea";
import TextInput from "~/components/Inputs/TextInput";
import TimeInput from "~/components/Inputs/TimeInput";
import invariant from "tiny-invariant";
import moment from "moment";
import { requireUserId } from "~/session.server";
import slugify from "slug";
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
  const userId = await requireUserId(request);

  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      directory: "uploads/pictures",
      maxPartSize: 1000000,
    }),
    unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  let coverImagePath = null;
  const image = formData.get("cover-image");
  if (!(image && typeof image === "string")) {
    coverImagePath = "/uploads/pictures/" + (image as File)?.name;
  }

  const title = formData.get("title")?.toString();
  invariant(title, "title is required");

  let slug = slugify(title);
  const isSlugAvailable = await isSlugExist(slug);
  if (!isSlugAvailable) {
    slug = `${slug}-${new ShortUniqueId({ length: 6 })()}`;
  }

  const description = formData.get("description")?.toString();
  invariant(description, "description is required");

  const _submissionPolicy = formData.get("submission-policy");
  invariant(_submissionPolicy, "submission policy is required");
  const submissionPolicy = _submissionPolicy.toString() as SubmissionPolicy;

  const _posterType = formData.get("poster-type");
  invariant(_posterType, "poster type is required");
  const acceptedPosterType = _posterType.toString() as AcceptedPosterType;

  const maxNumPoster = formData.get("max-number-poster")
    ? Number.parseInt(formData.get("max-number-poster")!.toString())
    : null;

  const _teamSubmission = formData.get("team-submission");
  invariant(_teamSubmission, "team submission is required");
  const teamSubmission = _teamSubmission.toString() as TeamSubmission;

  let maxTeamSize = null;
  if (teamSubmission === TeamSubmission.ENABLED) {
    maxTeamSize = formData.get("max-number-per-team");
    invariant(maxTeamSize, "max team size is required");
    maxTeamSize = Number.parseInt(maxTeamSize.toString());
  }

  const _viewingPrivacy = formData.get("viewing-privacy");
  invariant(_viewingPrivacy, "viewing privacy is required");
  const viewingPrivacy = _viewingPrivacy.toString() as ViewingPrivacy;

  let viewingCode = null;
  if (viewingPrivacy === ViewingPrivacy.LIMITED) {
    viewingCode = formData.get("viewing-code");
    invariant(viewingCode, "viewing code is required");
    viewingCode = viewingCode.toString();
  }

  const _submissionPrivacy = formData.get("submission-privacy");
  invariant(_submissionPrivacy, "submission privacy is required");
  const submissionPrivacy = _submissionPrivacy.toString() as SubmissionPrivacy;

  let submissionCode = null;
  if (submissionPrivacy === SubmissionPrivacy.LIMITED) {
    submissionCode = formData.get("submission-code");
    invariant(submissionCode, "submission code is required");
    submissionCode = submissionCode.toString();
  }

  const _votingPrivacy = formData.get("voting-privacy");
  invariant(_votingPrivacy, "voting privacy is required");
  const votingPrivacy = _votingPrivacy.toString() as VotingPrivacy;

  let votingCode = null;
  if (votingPrivacy === VotingPrivacy.LIMITED) {
    votingCode = formData.get("voting-code");
    invariant(votingCode, "voting code is required");
    votingCode = votingCode.toString();
  }

  let submissionStart = null;
  let submissionEnd = null;
  if (submissionPrivacy !== SubmissionPrivacy.DISABLED) {
    let submissionStartDate = formData.get("submission-start-date");
    invariant(submissionStartDate, "submission start date is required");
    let submissionStartTime = formData.get("submission-start-time");
    invariant(submissionStartTime, "submission start time is required");
    submissionStart = moment(
      `${submissionStartDate} ${submissionStartTime}`,
      "YYYY-MM-DD HH:mm"
    ).toDate();
    let submissionEndDate = formData.get("submission-end-date");
    invariant(submissionEndDate, "submission end date is required");
    let submissionEndTime = formData.get("submission-end-time");
    invariant(submissionEndTime, "submission end time is required");
    submissionEnd = moment(
      `${submissionEndDate} ${submissionEndTime}`,
      "YYYY-MM-DD HH:mm"
    ).toDate();

    if (submissionStart > submissionEnd || submissionStart < new Date()) {
      throw new Error(
        "Submission start date must be before submission end date"
      );
    }
  }

  let votingStart = null;
  let votingEnd = null;
  let rankAnnouncementDate = null;
  if (votingPrivacy !== VotingPrivacy.DISABLED) {
    let votingStartDate = formData.get("voting-start-date");
    invariant(votingStartDate, "voting start date is required");
    let votingStartTime = formData.get("voting-start-time");
    invariant(votingStartTime, "voting start time is required");
    votingStart = moment(
      `${votingStartDate} ${votingStartTime}`,
      "YYYY-MM-DD HH:mm"
    ).toDate();
    let votingEndDate = formData.get("voting-end-date");
    invariant(votingEndDate, "voting end date is required");
    let votingEndTime = formData.get("voting-end-time");
    invariant(votingEndTime, "voting end time is required");
    votingEnd = moment(
      `${votingEndDate} ${votingEndTime}`,
      "YYYY-MM-DD HH:mm"
    ).toDate();
    rankAnnouncementDate = formData.get("rank-announce-date");
    invariant(rankAnnouncementDate, "rank announcement date is required");
    let rankAnnouncementTime = formData.get("rank-announce-time");
    invariant(rankAnnouncementTime, "rank announcement time is required");
    rankAnnouncementDate = moment(
      `${rankAnnouncementDate} ${rankAnnouncementTime}`,
      "YYYY-MM-DD HH:mm"
    ).toDate();

    if (votingStart > votingEnd || votingStart < new Date()) {
      throw new Error("Voting start date must be before voting end date");
    }

    if (votingEnd > rankAnnouncementDate) {
      throw new Error("Rank can be announced after voting is ended");
    }
  }

  const competition = await createNewCompetition({
    title,
    slug,
    description,
    coverImagePath,
    submissionPolicy,
    acceptedPosterType,
    maxNumPoster,
    teamSubmission,
    maxTeamSize,
    userId,
    viewingPrivacy,
    viewingCode,
    submissionPrivacy,
    submissionCode,
    votingPrivacy,
    votingCode,
    submissionStart,
    submissionEnd,
    votingStart,
    votingEnd,
    rankAnnouncementDate,
  });

  return redirect(`/competition/c/${competition.slug}`);
}

export default function NewCompetition() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
          <Form method="post" encType="multipart/form-data">
            <FileUploadInput
              id="cover-image"
              labelText="Cover Image"
              type="image"
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
              labelText="Description"
              id="description"
              isRequired={true}
              maxLength={2500}
              value={description}
              setValue={setDescription}
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
              <input
                name="submission-policy"
                type="hidden"
                value={selectedSubmissionPolicy}
              />
              <SelectInput
                labelText="Poster Type"
                choices={Object.values(AcceptedPosterType)}
                selectedChoice={selectedPosterType}
                setSelectedChoice={(posterType: string) =>
                  setSelectedPosterType(posterType as AcceptedPosterType)
                }
              />
              <input
                name="poster-type"
                type="hidden"
                value={selectedPosterType}
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
              <input
                name="team-submission"
                type="hidden"
                value={selectedTeamSubmission}
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
              <input
                name="viewing-privacy"
                type="hidden"
                value={selectedViewingPrivacy}
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
              <input
                name="submission-privacy"
                type="hidden"
                value={selectedSubmissionPrivacy}
              />
              <SelectInput
                labelText="Voting Privacy"
                choices={Object.values(VotingPrivacy)}
                selectedChoice={selectedVotingPrivacy}
                setSelectedChoice={(votingPrivacy: string) =>
                  setSelectedVotingPrivacy(votingPrivacy as VotingPrivacy)
                }
              />
              <input
                name="voting-privacy"
                type="hidden"
                value={selectedVotingPrivacy}
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
              <>
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
              </>
            )}
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
