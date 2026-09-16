import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";

const metrics = [
  {
    value: "24/7",
    label: "Monitoring Concept",
    note: "Continuous telemetry-ready design",
  },
  {
    value: "4+",
    label: "Core Sensor Groups",
    note: "Soil and environmental parameters",
  },
  {
    value: "AI",
    label: "Disease Assistance",
    note: "Image-based prediction interface",
  },
  {
    value: "Demo",
    label: "Competition Mode",
    note: "Works without physical hardware",
  },
];

const comparison = [
  ["Fixed irrigation", "Sensor-informed irrigation"],
  ["Manual monitoring", "Real-time monitoring"],
  ["Delayed detection", "AI-assisted detection"],
  ["Broad water application", "Targeted irrigation"],
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.12),transparent_32%),radial-gradient(circle_at_85%_30%,rgba(6,182,212,0.10),transparent_30%)]" />

        <PageContainer className="relative">
          <div className="grid items-center gap-12 py-8 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.55 }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                SMART • PRECISION • AGRICULTURE
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Smarter farming through{" "}
                <span className="text-emerald-400">data, AI & automation.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                A demonstration platform that connects agricultural sensing,
                analytics, AI-assisted disease detection and precision
                irrigation into one mobile-first interface.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/dashboard"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-500 px-5 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-950/30 transition hover:bg-emerald-400 active:scale-[0.98]"
                >
                  View Live Dashboard →
                </Link>

                <Link
                  to="/ai-lab"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 px-5 text-sm font-bold text-white transition hover:border-slate-600 hover:bg-slate-800 active:scale-[0.98]"
                >
                  Explore AI Lab
                </Link>
              </div>

              <p className="mt-5 text-xs leading-5 text-slate-500">
                Demo mode clearly separates simulated data from future live
                hardware data.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="relative"
            >
              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl shadow-black/30 sm:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      System Flow
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">
                      Precision Agriculture Pipeline
                    </p>
                  </div>

                  <span className="rounded-full border border-amber-400/20 bg-amber-400/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-300">
                    Demo
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    ["01", "Soil Sensors", "Moisture • NPK • pH • Environment", "emerald"],
                    ["02", "Smart Controller", "ESP32-ready telemetry layer", "cyan"],
                    ["03", "Cloud / Database", "Real-time data synchronization", "emerald"],
                    ["04", "AI + Analytics", "Disease assistance & insights", "cyan"],
                    ["05", "Irrigation System", "Pump & valve control", "emerald"],
                  ].map(([number, title, subtitle, accent], index) => (
                    <div key={title}>
                      <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                            accent === "emerald"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-cyan-500/10 text-cyan-400"
                          } text-xs font-black`}
                        >
                          {number}
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white">{title}</p>
                          <p className="mt-0.5 truncate text-xs text-slate-500">
                            {subtitle}
                          </p>
                        </div>
                      </div>

                      {index < 4 && (
                        <div className="ml-7 h-3 border-l border-dashed border-slate-700" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </PageContainer>
      </section>

      {/* Metrics */}
      <section className="border-b border-slate-800/70">
        <PageContainer>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5"
              >
                <p className="text-2xl font-black text-white">{metric.value}</p>
                <p className="mt-2 text-sm font-semibold text-slate-200">
                  {metric.label}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {metric.note}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="mt-4 text-center text-[11px] leading-5 text-slate-600">
            These are system/design indicators, not experimentally validated
            agricultural performance claims.
          </p>
        </PageContainer>
      </section>

      {/* Problem vs Solution */}
      <section>
        <PageContainer>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
              Why precision agriculture?
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              From manual decisions to data-informed decisions.
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
              The platform is designed to demonstrate how sensing, analytics
              and controlled irrigation can work together.
            </p>
          </motion.div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50">
            <div className="grid grid-cols-2 border-b border-slate-800 bg-slate-900">
              <div className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 sm:p-5">
                Conventional Approach
              </div>
              <div className="border-l border-slate-800 p-4 text-xs font-bold uppercase tracking-wider text-emerald-400 sm:p-5">
                Precision Approach
              </div>
            </div>

            {comparison.map(([traditional, precision], index) => (
              <div
                key={traditional}
                className="grid grid-cols-2 border-b border-slate-800/80 last:border-b-0"
              >
                <div className="p-4 text-sm text-slate-400 sm:p-5">
                  <span className="mr-2 text-slate-600">•</span>
                  {traditional}
                </div>

                <div className="border-l border-slate-800 p-4 text-sm font-medium text-slate-200 sm:p-5">
                  <span className="mr-2 text-emerald-500">✓</span>
                  {precision}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] p-5 sm:flex-row">
            <div>
              <p className="text-sm font-bold text-white">
                Ready to inspect the system?
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Explore simulated telemetry in the live dashboard.
              </p>
            </div>

            <Link
              to="/dashboard"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-500 px-5 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
            >
              Open Dashboard
            </Link>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}

export default Home;