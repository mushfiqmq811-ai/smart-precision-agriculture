import PageContainer from "../components/layout/PageContainer";

function Home() {
  return (
    <PageContainer>
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Smart Precision Agriculture
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-5xl">
            Frontend Foundation Ready
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            The application foundation is ready for the next development stage.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}

export default Home;