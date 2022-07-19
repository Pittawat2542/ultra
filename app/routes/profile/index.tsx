import Footer from "~/components/Footer/Footer";
import NavigationBar from "~/components/NavigationBar/NavigationBar";
import { Outlet } from "@remix-run/react";
import PageHeader from "~/components/Competitions/PageHeader/PageHeader";

export default function Profile() {
  return (
    <>
      <NavigationBar />
      <main className="px-32">
        <section className="mt-8">
          <PageHeader title="Management" />
          <div className="flex">
            <aside className="mt-8 px-8">
              <ul className="flex flex-col gap-4">
                <li>Profile</li>
                <li>Submission</li>
                <li>Competitions</li>
              </ul>
            </aside>
            <Outlet />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
