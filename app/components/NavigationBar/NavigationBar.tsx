import Button from "../Button/Button";
import { Link } from "@remix-run/react";
import Logo from "../Logo/Logo";

export default function NavigationBar() {
  return (
    <nav className="flex flex-wrap items-center justify-between py-8 px-32 font-sans">
      <Link to="/">
        <Logo />
      </Link>
      <ul className="flex flex-wrap items-center justify-between text-xl">
        <li>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
