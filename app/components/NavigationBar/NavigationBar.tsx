import { Form, Link } from "@remix-run/react";

import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import { useOptionalUser } from "~/utils";

export default function NavigationBar() {
  const user = useOptionalUser();

  return (
    <nav className="flex flex-wrap items-center justify-between py-8 px-32 font-sans">
      <Link to="/">
        <Logo />
      </Link>
      <ul className="flex flex-wrap items-center justify-between gap-12 text-xl">
        <li className="hover:underline">
          <Link to="/competition">Competition</Link>
        </li>
        {user ? (
          <>
            <li className="hover:underline">
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Form method="post" action="/logout">
                <Button type="submit">Logout</Button>
              </Form>
            </li>
          </>
        ) : (
          <>
            <li className="hover:underline">
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
