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
import { useState } from "react";

enum ViewingPrivacy {
  DISABLED = "Disabled",
  PUBLIC = "Public",
  LIMITED = "Limited",
}

enum SubmissionPrivacy {
  DISABLED = "Disabled",
  PUBLIC = "Public",
  LIMITED = "Limited",
}

enum SubmissionPolicy {
  NONE = "None",
  REQUIRE_APPROVAL = "Require Approval",
}

enum VotingPrivacy {
  DISABLED = "Disabled",
  PUBLIC = "Public",
  LIMITED = "Limited",
}

enum PosterType {
  IMAGE = "Image",
  IMAGE_AR = "Image and AR",
}

enum TeamSubmission {
  DISABLED = "Disabled",
  ENABLED = "Enabled",
}

export default function NewCompetition() {
  const [selectedViewingPrivacy, setSelectedViewingPrivacy] = useState(
    ViewingPrivacy.PUBLIC
  );
  const [selectedSubmissionPrivacy, setSelectedSubmissionPrivacy] = useState(
    SubmissionPrivacy.PUBLIC
  );
  const [selectedSubmissionPolicy, setSelectedSubmissionPolicy] = useState(
    SubmissionPolicy.NONE
  );
  const [selectedVotingPrivacy, setSelectedVotingPrivacy] = useState(
    VotingPrivacy.PUBLIC
  );
  const [selectedPosterType, setSelectedPosterType] = useState(
    PosterType.IMAGE
  );
  const [selectedTeamSubmission, setSelectedTeamSubmission] = useState(
    TeamSubmission.ENABLED
  );

  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <section className="mt-8">
          <PageHeader title="Start a New Competition" />
          <Form>
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
            />
            <TextArea
              labelText="Detail and Rules"
              id="detail"
              isRequired={true}
              maxLength={2500}
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
                choices={Object.values(PosterType)}
                selectedChoice={selectedPosterType}
                setSelectedChoice={(posterType: string) =>
                  setSelectedPosterType(posterType as PosterType)
                }
              />
              <label className="flex items-center gap-4">
                Maximum Number of Submitted Poster
                <TextInput id="max-number-poster" value="30" />
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
                  <TextInput id="max-number-per-team" value="3" />
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
                  <TextInput id="viewing-code" isRequired={true} />
                </label>
              )}
              {selectedSubmissionPrivacy === SubmissionPrivacy.LIMITED && (
                <label className="flex items-center gap-4">
                  Submission Code
                  <TextInput id="submission-code" isRequired={true} />
                </label>
              )}
              {selectedVotingPrivacy === VotingPrivacy.LIMITED && (
                <label className="flex items-center gap-4">
                  Voting Code
                  <TextInput id="voting-code" isRequired={true} />
                </label>
              )}
            </div>
            <h3 className="mt-8 font-serif text-2xl">Schedule</h3>
            <Divider className="my-2" />
            <div className="my-4 flex gap-8">
              <p className="flex items-center font-bold">Submission</p>
              <p className="flex items-center">Start</p>
              <DateInput id="submission-start-date" />
              <TimeInput id="submission-start-time" />
              <p className="flex items-center">End</p>
              <DateInput id="submission-end-date" />
              <TimeInput id="submission-end-time" />
            </div>
            {selectedVotingPrivacy !== VotingPrivacy.DISABLED && (
              <div className="my-4 flex gap-8">
                <p className="flex items-center font-bold">Voting</p>
                <p className="flex items-center">Start</p>
                <DateInput id="voting-start-date" />
                <TimeInput id="voting-start-time" />
                <p className="flex items-center">End</p>
                <DateInput id="voting-end-date" />
                <TimeInput id="voting-end-time" />
              </div>
            )}
            <div className="my-4 flex gap-8">
              <p className="flex items-center font-bold">Ranking Announcement</p>
              <DateInput id="rank-announce-date" />
              <TimeInput id="rank-announce-time" />
            </div>
            <Divider className="my-8" />
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
