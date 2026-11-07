import {
  Activity,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  BadgeDollarSign,
  ChartNoAxesCombined,
  Check,
  CircleOff,
  Container,
  Clock3,
  Database,
  DatabaseZap,
  GitPullRequest,
  Github,
  Gauge,
  LockKeyhole,
  Rocket,
  Server,
  Terminal,
  Zap,
} from "lucide-react";
import {
  SiDjango,
  SiDocker,
  SiExpress,
  SiFlask,
  SiGin,
  SiGithub,
  SiHono,
  SiNestjs,
  SiNextdotjs,
  SiNuxt,
  SiPython,
  SiSqlite,
  SiSvelte,
} from "@icons-pack/react-simple-icons";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { pricing } from "@/lib/pricing";
import runtimeImage from "@/assets/stackminute-runtime.png";

const usd = (amount: number, maximumFractionDigits = 4) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits,
  }).format(amount);

const frameworks = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "SvelteKit", icon: SiSvelte },
  { name: "Python", icon: SiPython },
  { name: "Django", icon: SiDjango },
  { name: "Flask", icon: SiFlask },
  { name: "Docker", icon: SiDocker },
  { name: "Express", icon: SiExpress },
  { name: "Nuxt", icon: SiNuxt },
  { name: "NestJS", icon: SiNestjs },
  { name: "Gin", icon: SiGin },
  { name: "Hono", icon: SiHono },
  { name: "SQLite", icon: SiSqlite },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Stackminute — On-demand app hosting, billed by the minute",
      },
      {
        name: "description",
        content:
          "Deploy Next.js, SvelteKit, Python and more from GitHub. Scale to zero, wake on traffic, and pay per compute minute with 1 GB of free SQLite storage.",
      },
      {
        property: "og:title",
        content: "Stackminute — Cloud that clocks out.",
      },
      {
        property: "og:description",
        content:
          "Deploy your GitHub project, sleep at zero traffic, and pay per compute minute. Includes free, metered SQLite.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const [servingTraffic, setServingTraffic] = useState(false);
  const activeComputeCost = pricing.instance.rate_per_cu_minute_usd * 1.5;
  const formatInteger = (value: number) => new Intl.NumberFormat("en-US").format(value);

  return (
    <>
      <header className="site-width topbar">
        <Link aria-label="Stackminute home" className="brand-link" to="/">
          <span aria-hidden="true" className="brand-mark">
            <Activity size={15} strokeWidth={1.8} />
          </span>
          <span>stackminute</span>
        </Link>
        <nav aria-label="Main navigation" className="topbar-links">
          <a href="#deploy">How it works</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <Button asChild className="topbar-cta button-mono" size="sm">
            <a href="#deploy">
              Explore deploys <ArrowUpRight aria-hidden="true" size={13} />
            </a>
          </Button>
        </nav>
      </header>

      <main>
        <section aria-labelledby="hero-title" className="hero">
          <img
            alt=""
            className="hero-art"
            decoding="async"
            fetchPriority="high"
            height={1024}
            src={runtimeImage}
            width={1536}
          />
          <div className="site-width hero-content">
            <div className="hero-kicker mono-label">
              <span aria-hidden="true" className="live-dot" />
              APP HOSTING, BY THE MINUTE
            </div>
            <h1 className="hero-title" id="hero-title">
              Cloud that
              <br />
              <span className="hero-title-accent">clocks out.</span>
            </h1>
            <p className="hero-copy">
              Deploy your app from GitHub. Let it sleep when traffic disappears. Pay for compute
              only when it wakes up.
            </p>
            <div className="hero-actions">
              <Button asChild className="button-mono" size="lg">
                <a href="#deploy">
                  See how it works <ArrowRight aria-hidden="true" size={15} />
                </a>
              </Button>
              <Button asChild className="button-mono" size="lg" variant="outline">
                <a href="#pricing">Explore pricing</a>
              </Button>
            </div>
            <p className="hero-fineprint">
              {pricing.instance.free_cu_hours} free compute unit-hours included. No monthly minimum.
            </p>
          </div>
        </section>

        <section
          aria-label="Supported app frameworks and database"
          className="site-width ecosystem"
        >
          <div className="mono-label ecosystem-title">Bring the stack you already use</div>
          <div className="ecosystem-grid">
            {frameworks.map(({ name, icon: Icon }) => (
              <div className="ecosystem-item" key={name}>
                <Icon aria-hidden="true" className="ecosystem-icon" />
                <span className="ecosystem-name">{name}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="features-title"
          className="section features-section"
          id="features"
        >
          <div className="site-width">
            <div className="section-kicker mono-label">01 / THE PLATFORM</div>
            <h2 className="section-title" id="features-title">
              The boring infrastructure your app deserves.
            </h2>
            <p className="section-copy">
              Ship product instead of wiring together a database, build pipeline, and a fleet of
              always-on servers. Stackminute keeps the operational pieces small and predictable.
            </p>
            <div className="feature-grid">
              <article className="feature-card">
                <span className="feature-icon">
                  <Gauge aria-hidden="true" size={18} />
                </span>
                <h3 className="feature-title">Scale to zero</h3>
                <p className="feature-copy">
                  No traffic means no running compute. Wake quickly when the next request arrives.
                </p>
              </article>
              <article className="feature-card">
                <span className="feature-icon">
                  <GitPullRequest aria-hidden="true" size={18} />
                </span>
                <h3 className="feature-title">Git-native deploys</h3>
                <p className="feature-copy">
                  Connect a repository and turn every deploy into a repeatable, visible build.
                </p>
              </article>
              <article className="feature-card">
                <span className="feature-icon">
                  <DatabaseZap aria-hidden="true" size={18} />
                </span>
                <h3 className="feature-title">SQLite, included</h3>
                <p className="feature-copy">
                  Keep your application data close with metered storage and generous free usage.
                </p>
              </article>
              <article className="feature-card">
                <span className="feature-icon">
                  <Container aria-hidden="true" size={18} />
                </span>
                <h3 className="feature-title">Your stack, unchanged</h3>
                <p className="feature-copy">
                  Bring Next.js, Python, Docker, Express, Nuxt, NestJS, Gin, or SvelteKit.
                </p>
              </article>
              <article className="feature-card">
                <span className="feature-icon">
                  <ChartNoAxesCombined aria-hidden="true" size={18} />
                </span>
                <h3 className="feature-title">Usage you can read</h3>
                <p className="feature-copy">
                  See compute minutes, storage, reads, and writes as separate line items.
                </p>
              </article>
              <article className="feature-card">
                <span className="feature-icon">
                  <LockKeyhole aria-hidden="true" size={18} />
                </span>
                <h3 className="feature-title">Built for production</h3>
                <p className="feature-copy">
                  Health checks, isolated builds, and encrypted transport are part of the baseline.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section aria-labelledby="deploy-title" className="section" id="deploy">
          <div className="site-width">
            <div className="section-kicker mono-label">02 / FROM REPO TO RUNNING APP</div>
            <h2 className="section-title" id="deploy-title">
              A GitHub repo in. An app in the cloud out.
            </h2>
            <p className="section-copy">
              Connect the repository, let the cloud builder build your app, and deploy. Your
              framework is detected, your build is managed, and your instance scales with incoming
              requests.
            </p>
            <div className="deployment-grid">
              <div className="steps">
                <article className="step-row">
                  <Github aria-hidden="true" className="text-signal" size={20} strokeWidth={1.6} />
                  <div>
                    <h3 className="step-title">Connect your GitHub repo</h3>
                    <p className="step-copy">Choose the repository that has your application.</p>
                  </div>
                </article>
                <article className="step-row">
                  <ArrowDownToLine
                    aria-hidden="true"
                    className="text-signal"
                    size={20}
                    strokeWidth={1.6}
                  />
                  <div>
                    <h3 className="step-title">We build in the cloud</h3>
                    <p className="step-copy">
                      Build your app with support for the frameworks you already know.
                    </p>
                  </div>
                </article>
                <article className="step-row">
                  <Rocket aria-hidden="true" className="text-signal" size={20} strokeWidth={1.6} />
                  <div>
                    <h3 className="step-title">Deploy. Wake on requests. Sleep at zero.</h3>
                    <p className="step-copy">
                      The instance automatically scales with traffic, then scales to zero when there
                      is none.
                    </p>
                  </div>
                </article>
              </div>

              <div
                aria-label="Interactive preview: switch between no traffic and incoming traffic to see the instance sleep or wake"
                className="meter-panel"
              >
                <div className="meter-header">
                  <span className="meter-header-title mono-label">
                    <Server aria-hidden="true" size={14} />
                    INSTANCE STATUS
                  </span>
                  <span className="mono-label">PREVIEW</span>
                </div>
                <div aria-label="Incoming traffic" className="meter-tabs" role="group">
                  <Button
                    aria-pressed={!servingTraffic}
                    className="meter-choice"
                    onClick={() => setServingTraffic(false)}
                    size="sm"
                    variant={!servingTraffic ? "secondary" : "ghost"}
                  >
                    0 requests
                  </Button>
                  <Button
                    aria-pressed={servingTraffic}
                    className="meter-choice"
                    onClick={() => setServingTraffic(true)}
                    size="sm"
                    variant={servingTraffic ? "secondary" : "ghost"}
                  >
                    Traffic arrives
                  </Button>
                </div>
                <div aria-live="polite" className="meter-body">
                  <div className="meter-state">
                    <span className={`meter-status-icon${servingTraffic ? " is-awake" : ""}`}>
                      {servingTraffic ? (
                        <Zap aria-hidden="true" size={17} />
                      ) : (
                        <CircleOff aria-hidden="true" size={17} />
                      )}
                    </span>
                    <div>
                      <div className="meter-state-name">
                        {servingTraffic ? "Instance running" : "Instance asleep"}
                      </div>
                      <div className="meter-state-caption mono-label">
                        {servingTraffic ? "128 requests / min" : "0 requests / min"}
                      </div>
                    </div>
                  </div>
                  <div className="meter-rows">
                    <div className="meter-row">
                      <span>Compute running</span>
                      <span className="mono-label">{servingTraffic ? "1.5 CU" : "0 CU"}</span>
                    </div>
                    <div className="meter-row">
                      <span>Compute charges</span>
                      <span className="mono-label">
                        {servingTraffic ? `${usd(activeComputeCost)} / min` : "$0.00 / min"}
                      </span>
                    </div>
                    <div className="meter-row">
                      <span>SQLite database</span>
                      <span className="mono-label">Kept separate</span>
                    </div>
                  </div>
                </div>
                <div className="meter-footer mono-label">
                  <span>Idle compute billed</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check aria-hidden="true" size={13} />
                    {servingTraffic ? "Traffic active" : "None"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="pricing-title"
          className="site-width pricing-section"
          id="pricing"
        >
          <div className="pricing-heading-row">
            <div>
              <div className="section-kicker mono-label">03 / TRANSPARENT, PER-MINUTE PRICING</div>
              <h2 className="section-title" id="pricing-title">
                A smaller bill starts with a smaller clock.
              </h2>
              <p className="section-copy">
                Start with generous free allowances. After that, pay only for the compute time,
                storage, and database activity you use.
              </p>
            </div>
            <span className="sample-rate-note mono-label">
              <BadgeDollarSign aria-hidden="true" size={14} /> SAMPLE RATES
            </span>
          </div>

          <div className="pricing-tables">
            <div aria-labelledby="instance-pricing-title" className="pricing-block">
              <h3 className="pricing-block-title" id="instance-pricing-title">
                <Server aria-hidden="true" size={15} /> Instance
              </h3>
              <div className="table-scroll">
                <table className="pricing-table">
                  <thead>
                    <tr>
                      <th scope="col">Usage</th>
                      <th scope="col">Included, every month</th>
                      <th scope="col">Example rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Compute, billed by the minute</td>
                      <td>{formatInteger(pricing.instance.free_cu_hours)} CU-hours</td>
                      <td>
                        <span className="price-value">
                          {usd(pricing.instance.rate_per_cu_minute_usd, 5)} / CU-minute
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Idle instance</td>
                      <td>Scale to zero</td>
                      <td>
                        <span className="price-value">$0.00</span> compute at zero traffic
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="pricing-footnote">
                Auto-scaling instance. Example running cost at 1.5 CU: {usd(activeComputeCost)} per
                minute.
              </p>
            </div>

            <div aria-labelledby="database-pricing-title" className="pricing-block">
              <h3 className="pricing-block-title" id="database-pricing-title">
                <Database aria-hidden="true" size={15} /> SQLite database
              </h3>
              <div className="table-scroll">
                <table className="pricing-table">
                  <thead>
                    <tr>
                      <th scope="col">Usage</th>
                      <th scope="col">Included, every month</th>
                      <th scope="col">Example rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Database storage</td>
                      <td>{formatInteger(pricing.sqlite.free_storage_gb)} GB</td>
                      <td>
                        <span className="price-value">
                          {usd(pricing.sqlite.storage_per_gb_month_usd)} / GB-month
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Reads</td>
                      <td>{formatInteger(pricing.sqlite.free_monthly_reads)} / month</td>
                      <td>
                        <span className="price-value">
                          {usd(pricing.sqlite.reads_per_100k_usd)} / 100k reads
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Writes</td>
                      <td>{formatInteger(pricing.sqlite.free_monthly_writes)} / month</td>
                      <td>
                        <span className="price-value">
                          {usd(pricing.sqlite.writes_per_50k_usd)} / 50k writes
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="pricing-bottom">
            <span className="pricing-bottom-note">
              Example pricing only. Update your rates before publishing.
            </span>
            <Button asChild className="button-mono" size="sm" variant="outline">
              <a href="#deploy">
                Back to deployment <ArrowUpRight aria-hidden="true" size={13} />
              </a>
            </Button>
          </div>
        </section>

        <section aria-labelledby="faq-title" className="section faq-section" id="faq">
          <div className="site-width faq-layout">
            <div>
              <div className="section-kicker mono-label">04 / BEFORE YOU DEPLOY</div>
              <h2 className="section-title" id="faq-title">
                A few useful answers.
              </h2>
              <p className="section-copy">
                Start small, connect your repo, and keep an eye on the minutes. There is no monthly
                minimum and no need to change your application architecture.
              </p>
            </div>
            <div className="faq-list">
              <details open>
                <summary>What happens when my app has no traffic?</summary>
                <p>
                  The compute instance scales to zero, so you stop paying for idle compute. Your
                  SQLite storage remains available separately.
                </p>
              </details>
              <details>
                <summary>What can I deploy?</summary>
                <p>
                  Deploy supported Node, Python, and containerized applications from GitHub,
                  including Next.js, SvelteKit, Django, Flask, Express, Nuxt, NestJS, and Gin.
                </p>
              </details>
              <details>
                <summary>How is the bill calculated?</summary>
                <p>
                  Compute is metered per CU-minute. SQLite is metered by GB-month, reads, and
                  writes. The free allowances and example rates above are kept in pricing.toml.
                </p>
              </details>
              <details>
                <summary>Do I need to use a new database?</summary>
                <p>
                  No. SQLite is a natural fit for many small and medium applications, and
                  Stackminute keeps the database layer separate from the sleeping app instance.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section aria-label="Start your deployment" className="closing-band site-width">
          <div>
            <h2 className="closing-title">Your repo has places to be.</h2>
            <p className="closing-copy">Your cloud bill doesn’t have to run while it’s away.</p>
          </div>
          <Button asChild className="button-mono" size="default">
            <a href="#deploy">
              See how deployment works <ArrowRight aria-hidden="true" size={14} />
            </a>
          </Button>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-width footer-inner">
          <Link aria-label="Stackminute home" className="brand-link" to="/">
            <span aria-hidden="true" className="brand-mark">
              <Activity size={14} />
            </span>
            <span>stackminute</span>
          </Link>
          <span>BUILT FOR THE MINUTES THAT MATTER.</span>
          <div className="footer-links">
            <a className="quiet-link" href="#faq">
              <Terminal aria-hidden="true" className="mr-1 inline" size={12} /> FAQ
            </a>
            <a className="quiet-link" href="#pricing">
              <Clock3 aria-hidden="true" className="mr-1 inline" size={12} /> Pricing
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
