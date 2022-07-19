import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { createUserSession, getUserId } from "~/session.server";
import { json, redirect } from "@remix-run/node";
import { safeRedirect, validateEmail } from "~/utils";
import { useEffect, useRef, useState } from "react";

import Button from "~/components/Button/Button";
import Footer from "~/components/Footer/Footer";
import HeroSection from "~/components/HeroSection/HeroSection";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import TextInput from "~/components/TextInput/TextInput";
import { verifyLogin } from "~/models/user.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo,
  });
}

export default function Login() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  const heroContent = {
    titleContent: <h1 className="mb-8 font-serif text-6xl font-bold">Login</h1>,
    subtitleText:
      "Welcome back! Jump right back into the all-new exhibition experience.",
    heroImageUrl: "/images/hero-login.png",
    actionContent: (
      <Form method="post" className="mt-8 space-y-6">
        <div className="mt-1">
          <TextInput
            labelText="Email Address"
            inputRef={emailRef}
            id="email"
            isRequired={true}
            autoFocus={true}
            type="email"
            value={email}
            setValue={setEmail}
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
            labelText="Password"
            type="password"
            value={password}
            setValue={setPassword}
            isRequired={true}
          />
          {actionData?.errors?.password && (
            <div className="pt-1 text-red-700" id="password-error">
              {actionData.errors.password}
            </div>
          )}
        </div>

        <input type="hidden" name="redirectTo" value={redirectTo} />
        <Button type="submit" className="w-full">
          Log in
        </Button>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="remember" className="ml-2 block text-sm">
              Remember me
            </label>
          </div>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              className="font-bold hover:underline"
              to={{
                pathname: "/register",
                search: searchParams.toString(),
              }}
            >
              Register
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
