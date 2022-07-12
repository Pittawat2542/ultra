export default function HeroSection() {
  return (
    <section className="flex w-full items-center justify-between pt-32">
      <div className="flex max-w-[50%] flex-col items-center">
        <h1 className="mb-8 font-serif text-6xl">
          Explore Posters, Now in{" "}
          <span className="font-bold">Augmented Reality</span>
        </h1>
        <p className="font-sans text-xl">
          Experience the poster exhibition like never before, whether you are an
          organizer, or visitor. Enhance the perception with augmented reality
          and make the poster literally pop out of a sheet of paper.
        </p>
      </div>
      <div className="flex items-center justify-end">
        <img src="/images/hero.png" alt="" />
      </div>
    </section>
  );
}
