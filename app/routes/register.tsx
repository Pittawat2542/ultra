import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { createUser, getUserByEmail } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { json, redirect } from "@remix-run/node";
import { safeRedirect, validateEmail } from "~/utils";
import { useEffect, useRef, useState } from "react";

import Button from "~/components/Button/Button";
import Footer from "~/components/Footer/Footer";
import HeroSection from "~/components/HeroSection/HeroSection";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import TextInput from "~/components/TextInput/TextInput";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!validateEmail(email)) {
    return json(
      {
        errors: {
          email: "Email is invalid",
          password: null,
          firstName: null,
          lastName: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      {
        errors: {
          email: null,
          password: "Password is required",
          firstName: null,
          lastName: null,
        },
      },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      {
        errors: {
          email: null,
          password: "Password is too short",
          firstName: null,
          lastName: null,
        },
      },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
          firstName: null,
          lastName: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof firstName !== "string" || firstName.length === 0) {
    return json(
      {
        errors: {
          email: null,
          password: null,
          firstName: "First name is required",
          lastName: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof lastName !== "string" || lastName.length === 0) {
    return json(
      {
        errors: {
          email: null,
          password: null,
          firstName: null,
          lastName: "Last name is required",
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser(email, password, firstName, lastName);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
}

export default function Register() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const [firstName, setFirstName] = useState("");
  const lastNameRef = useRef<HTMLInputElement>(null);
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  const heroContent = {
    titleContent: (
      <h1 className="mb-8 font-serif text-6xl font-bold">Register</h1>
    ),
    subtitleText:
      "Get started with all-new experience in exploring exhibitions.",
    heroImageUrl: "/images/hero-login.png",
    actionContent: (
      <Form method="post" className="space-y-6">
        <div className="mt-1">
          <TextInput
            inputRef={emailRef}
            id="email"
            isRequired={true}
            autoFocus={true}
            type="email"
            value={email}
            setValue={setEmail}
            labelText="Email Address"
          />
          {actionData?.errors?.email && (
            <div className="pt-1 text-red-700" id="email-error">
              {actionData.errors.email}
            </div>
          )}
        </div>

        <div className="mt-1">
          <TextInput
            id="password"
            inputRef={passwordRef}
            type="password"
            isRequired={true}
            value={password}
            setValue={setPassword}
            labelText="Password"
          />
          {actionData?.errors?.password && (
            <div className="pt-1 text-red-700" id="password-error">
              {actionData.errors.password}
            </div>
          )}
        </div>

        <div className="mt-1 flex gap-4">
          <TextInput
            id="firstName"
            inputRef={firstNameRef}
            isRequired={true}
            value={firstName}
            setValue={setFirstName}
            labelText="First Name"
          />
          <TextInput
            id="lastName"
            inputRef={lastNameRef}
            isRequired={true}
            value={lastName}
            setValue={setLastName}
            labelText="Last Name"
          />
          {actionData?.errors?.firstName && (
            <div className="pt-1 text-red-700" id="firstName-error">
              {actionData.errors.firstName}
            </div>
          )}
          {actionData?.errors?.lastName && (
            <div className="pt-1 text-red-700" id="lastName-error">
              {actionData.errors.lastName}
            </div>
          )}
        </div>

        <input type="hidden" name="redirectTo" value={redirectTo} />
        <Button className="w-full" type="submit">Create Account</Button>
        <div className="flex items-center justify-end">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              className="hover:underline font-bold"
              to={{
                pathname: "/login",
                search: searchParams.toString(),
              }}
            >
              Log in
            </Link>
          </div>
        </div>
      </Form>
    ),
  };

  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <HeroSection
          titleContent={heroContent.titleContent}
          subtitleText={heroContent.subtitleText}
          heroImageUrl={heroContent.heroImageUrl}
          actionContent={heroContent.actionContent}
        />
      </main>
      <Footer />
    </>
  );
}
