import Divider from "../Dividier/Divider";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <footer className="mt-48 bg-white bg-opacity-10 bg-clip-padding p-4 px-32 pt-16 pb-8 backdrop-blur-xl backdrop-filter transition">
      <div className="flex">
        <div className="mb-2 flex w-full flex-col text-lg">
          <Logo />
          <p className="my-6">
            Experience the poster exhibition like never before.
          </p>
          <div className="flex flex-col">
            <p className="font-bold">Innovative Cognitive Computing (IC2)</p>
            <p>School of Information Technology </p>
            <p>King Mongkut&apos;s University of Technology Thonburi</p>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex w-full flex-col">
            <h3 className="text-lg font-bold">Profile</h3>
            <ul className="mt-4 flex flex-col justify-between gap-4">
              <li>
                <Link className="cursor-pointer hover:underline" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="cursor-pointer hover:underline" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link className="cursor-pointer hover:underline" to="/profile">
                  Manage Profile
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex w-full flex-col">
            <h3 className="text-lg font-bold">Explore</h3>
            <ul className="mt-4 flex flex-col justify-between gap-4">
              <li>
                <Link
                  className="cursor-pointer hover:underline"
                  to="/competition"
                >
                  Competitions
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex w-full flex-col">
            <h3 className="text-lg font-bold">Organize</h3>
            <ul className="mt-4 flex flex-col justify-between gap-4">
              <li>
                <Link
                  className="cursor-pointer hover:underline"
                  to="/competition/new"
                >
                  Start New Competition
                </Link>
              </li>
              <li>
                <Link
                  className="cursor-pointer hover:underline"
                  to="/competition/manage"
                >
                  Manage Competition
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="flex justify-between opacity-70">
        <p>Copyright ©2022 IC2. All Right Reserved</p>
        <p>Developed with ❤️ and ☕️</p>
      </div>
    </footer>
  );
}
