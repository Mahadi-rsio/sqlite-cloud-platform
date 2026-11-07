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
  Menu,
  Rocket,
  X,
  Server,
  Terminal,
  Zap,
} from "lucide-react";
import {
  SiDjango,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiGin,
  SiGithub,
  SiHono,
  SiKoa,
  SiNestjs,
  SiNextdotjs,
  SiNuxt,
  SiPython,
  SiSqlite,
  SiSvelte,
} from "@icons-pack/react-simple-icons";
import { Link, createFileRoute } from "@tanstack/react-router";
import { type ComponentProps, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { pricing } from "@/lib/pricing";
const usd = (amount: number, maximumFractionDigits = 4) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits,
  }).format(amount);

const frameworks = [
  { name: "Express", icon: SiExpress },
  { name: "NestJS", icon: SiNestjs },
  { name: "Fastify", icon: SiNodeMark },
  { name: "Hono", icon: SiHono },
  { name: "Koa", icon: SiKoa },
  { name: "AdonisJS", icon: SiNodeMark },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Nuxt", icon: SiNuxt },
  { name: "Flask", icon: SiFlask },
  { name: "Django", icon: SiDjango },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Starlette", icon: SiPython },
  { name: "Sanic", icon: SiPython },
  { name: "Tornado", icon: SiPython },
  { name: "Gin", icon: SiGin },
  { name: "SvelteKit", icon: SiSvelte },
  { name: "SQLite", icon: SiSqlite },
  { name: "Docker", icon: SiDocker },
];

function SiNodeMark(props: ComponentProps<"svg">) {
  return <Server {...props} />;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Cloudisy — On-demand app hosting, billed by the minute",
      },
      {
        name: "description",
        content:
          "Cloudisy is the developer-friendly cloud platform from Bangladesh for GitHub app deployments and managed SQLite databases. Start free with no credit card.",
      },
      {
        property: "og:title",
        content: "Cloudisy — Deploy apps and create SQLite databases in seconds.",
      },
      {
        property: "og:description",
        content:
          "Deploy from GitHub and create managed SQLite databases in seconds. Start free with no credit card.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const [servingTraffic, setServingTraffic] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("features");
  const [isScrolled, setIsScrolled] = useState(false);
  const [flowVisible, setFlowVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const activeComputeCost = pricing.instance.rate_per_cu_minute_usd * 1.5;
  const formatInteger = (value: number) => new Intl.NumberFormat("en-US").format(value);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 24);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    const sections = ["features", "database", "pricing", "faq"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.3, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const flow = document.getElementById("flow");
    if (!flow) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFlowVisible(true);
      },
      { threshold: 0.25 },
    );
    observer.observe(flow);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOnOutsideTap = (event: PointerEvent) => {
      if (mobileMenuOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOnOutsideTap);
    return () => document.removeEventListener("pointerdown", closeOnOutsideTap);
  }, [mobileMenuOpen]);

  const navItems = [
    { href: "#features", label: "Features", id: "features" },
    { href: "#database", label: "Database", id: "database" },
    { href: "#pricing", label: "Pricing", id: "pricing" },
    { href: "#faq", label: "FAQ", id: "faq" },
  ];

  return (
    <>
      <header
        ref={navRef}
        className={`site-width topbar topbar-floating${isScrolled ? " is-scrolled" : ""}`}
      >
        <Link aria-label="Cloudisy home" className="brand-link" to="/">
          <span aria-hidden="true" className="brand-mark">
            <Activity size={15} strokeWidth={1.8} />
          </span>
          <span>cloudisy</span>
        </Link>
        <nav aria-label="Main navigation" className="topbar-links">
          {navItems.map((item) => (
            <a
              className={activeSection === item.id ? "is-active" : undefined}
              href={item.href}
              key={item.id}
            >
              {item.label}
            </a>
          ))}
          <a className="nav-login" href="#">
            Log in
          </a>
          <Button asChild className="topbar-cta button-mono" size="sm">
            <a href="#deploy">
              Start free <ArrowUpRight aria-hidden="true" size={13} />
            </a>
          </Button>
        </nav>
        <Button
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen((open) => !open)}
          size="icon"
          variant="ghost"
        >
          {mobileMenuOpen ? (
            <X aria-hidden="true" size={20} />
          ) : (
            <Menu aria-hidden="true" size={20} />
          )}
        </Button>
        {mobileMenuOpen && (
          <nav aria-label="Mobile navigation" className="mobile-nav">
            {navItems.map((item) => (
              <a
                className={activeSection === item.id ? "is-active" : undefined}
                href={item.href}
                key={item.id}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="#deploy" onClick={() => setMobileMenuOpen(false)}>
              Start free <ArrowUpRight aria-hidden="true" size={13} />
            </a>
          </nav>
        )}
      </header>

      <main>
        <section aria-labelledby="hero-title" className="hero">
          <img
            alt="Abstract glowing SQLite database inside a cloud server environment"
            className="hero-art"
            decoding="async"
            fetchPriority="high"
            height={1024}
            src="/hero-sqlite-cloud.png"
            width={1536}
          />
          <div aria-hidden="true" className="hero-grid-overlay" />
          <div className="site-width hero-layout">
            <div className="hero-content">
              <div className="hero-kicker mono-label">
                <span aria-hidden="true" className="live-dot" />
                THE CLOUD FOR BUILDERS
              </div>
              <h1 className="hero-title" id="hero-title">
                Deploy your app.
                <br />
                <span className="hero-title-accent">Create your database.</span>
              </h1>
              <p className="hero-copy">
                Deploy your app. Create a SQLite database. In seconds. No manual setup, no credit
                card, no infrastructure busywork.
              </p>
              <div className="hero-actions">
                <Button asChild className="button-mono" size="lg">
                  <a href="#deploy">
                    Start free <ArrowRight aria-hidden="true" size={15} />
                  </a>
                </Button>
                <Button asChild className="button-mono" size="lg" variant="outline">
                  <a href="#pricing">
                    <span aria-hidden="true">▶</span> Watch demo
                  </a>
                </Button>
              </div>
              <p className="hero-fineprint">
                No credit card required. Start free with {pricing.instance.free_cu_hours} compute
                unit-hours.
              </p>
            </div>
            <div aria-hidden="true" className="hero-visual">
              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />
              <div className="hero-terminal">
                <div className="terminal-topbar">
                  <span className="terminal-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="mono-label">stackminute / deploy</span>
                  <span className="terminal-live">LIVE</span>
                </div>
                <div className="terminal-body">
                  <div className="terminal-command">
                    <span>❯</span> stackminute deploy --prod
                  </div>
                  <div className="terminal-line">
                    <span className="line-check">✓</span> Detecting SQLite runtime
                  </div>
                  <div className="terminal-line">
                    <span className="line-check">✓</span> Building from main
                  </div>
                  <div className="terminal-line muted">↳ Sleeping until traffic arrives</div>
                  <div className="terminal-progress">
                    <span />
                  </div>
                </div>
              </div>
              <div className="hero-stat hero-stat-top">
                <span className="stat-pulse" /> <strong>0.00</strong>
                <small>idle cost / min</small>
              </div>
              <div className="hero-stat hero-stat-bottom">
                <DatabaseZap size={14} />
                <strong>SQLite ready</strong>
                <small>1 GB included</small>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="flow-title"
          className={`deployment-flow site-width${flowVisible ? " is-visible" : ""}`}
          id="flow"
        >
          <div className="flow-heading">
            <div>
              <span className="mono-label">THE FLOW</span>
              <h2 id="flow-title">From GitHub push to a live app.</h2>
            </div>
            <span className="flow-heading-note">A calmer path to production.</span>
          </div>
          <div className="flow-diagram">
            {[
              {
                icon: Github,
                title: "GitHub Push",
                caption: "Push to main",
              },
              {
                icon: Terminal,
                title: "Cloud Build",
                caption: "Built in ~12s",
              },
              {
                icon: DatabaseZap,
                title: "SQLite Persist",
                caption: "1 GB SQLite included",
              },
              {
                icon: Zap,
                title: "Sleep / Wake",
                caption: "Wakes on first request, 0.00 idle cost",
              },
            ].map(({ icon: Icon, title, caption }, index) => (
              <div className="flow-step-wrap" key={title}>
                <article className={`flow-step${index === 3 ? " flow-step-live" : ""}`}>
                  <span className="flow-step-icon">
                    <Icon aria-hidden="true" size={25} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{caption}</p>
                  </div>
                  {index === 3 && <span className="flow-live-badge">LIVE</span>}
                </article>
                {index < 3 && <span aria-hidden="true" className="flow-connector" />}
              </div>
            ))}
          </div>
        </section>

        <section aria-label="Cloudisy platform stats" className="site-width stats-strip">
          <div className="stat-block">
            <strong>12s</strong>
            <span>average deploy</span>
          </div>
          <div className="stat-block">
            <strong>99.99%</strong>
            <span>platform uptime</span>
          </div>
          <div className="stat-block">
            <strong>1,240+</strong>
            <span>apps deployed</span>
          </div>
          <div className="stat-block">
            <strong>3,800+</strong>
            <span>databases created</span>
          </div>
        </section>

        <section
          aria-label="Supported app frameworks and database"
          className="site-width ecosystem"
        >
          <div className="mono-label ecosystem-title">Bring the stack you already use</div>
          <div className="ecosystem-marquee" aria-label="Supported frameworks">
            {[frameworks.slice(0, 9), frameworks.slice(9)].map((row, rowIndex) => (
              <div className={`ecosystem-track ecosystem-track-${rowIndex + 1}`} key={rowIndex}>
                {[...row, ...row].map(({ name, icon: Icon }, index) => (
                  <div aria-label={name} className="ecosystem-item" key={`${name}-${index}`}>
                    <Icon aria-hidden="true" className="ecosystem-icon" />
                  </div>
                ))}
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
              always-on servers. Cloudisy keeps the operational pieces small and predictable.
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

        <section
          aria-labelledby="database-title"
          className="section database-spotlight"
          id="database"
        >
          <div className="site-width spotlight-grid">
            <div>
              <div className="section-kicker mono-label">03 / MANAGED SQLITE</div>
              <h2 className="section-title" id="database-title">
                Your database, ready before your coffee.
              </h2>
              <p className="section-copy">
                Create a production-ready SQLite database alongside your app. Query it in the
                browser, ship with an SDK, and let backups happen automatically.
              </p>
              <div className="spotlight-list">
                <div>
                  <span>01</span>
                  <strong>Instant create</strong>
                  <p>One click, zero provisioning scripts.</p>
                </div>
                <div>
                  <span>02</span>
                  <strong>Web SQL console</strong>
                  <p>Inspect and edit data without leaving Cloudisy.</p>
                </div>
                <div>
                  <span>03</span>
                  <strong>Backups included</strong>
                  <p>Restore a clean snapshot whenever you need it.</p>
                </div>
              </div>
            </div>
            <div className="sql-console" aria-label="SQL console preview">
              <div className="console-bar">
                <span>cloudisy / studio</span>
                <span className="console-live">CONNECTED</span>
              </div>
              <div className="console-code">
                <span className="code-muted">-- recent users</span>
                <br />
                <span className="code-keyword">SELECT</span> id, email, plan
                <br />
                <span className="code-keyword">FROM</span> users
                <br />
                <span className="code-keyword">ORDER BY</span> created_at{" "}
                <span className="code-keyword">DESC</span>
                <br />
                <span className="code-keyword">LIMIT</span> 3;
              </div>
              <div className="sql-result">
                <span>id</span>
                <span>email</span>
                <span>plan</span>
                <b>1042</b>
                <b>nabila@dev.bd</b>
                <b>pro</b>
                <b>1041</b>
                <b>rahim@cloudisy.dev</b>
                <b>free</b>
                <b>1040</b>
                <b>tania@start.app</b>
                <b>pro</b>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="developer-title" className="section developer-section">
          <div className="site-width developer-grid">
            <div>
              <div className="section-kicker mono-label">04 / BUILT FOR DEVELOPERS</div>
              <h2 className="section-title" id="developer-title">
                Push code. Watch it ship.
              </h2>
              <p className="section-copy">
                Use GitHub, the Cloudisy CLI, or our API. Same workflow, whichever way you like to
                work.
              </p>
            </div>
            <div className="dev-snippet">
              <div className="snippet-tabs">
                <span className="is-active">Git push</span>
                <span>CLI</span>
                <span>API</span>
              </div>
              <pre>
                <code>
                  <span className="code-muted"># deploy from your terminal</span>
                  {"\n"}
                  <span className="code-keyword">cloudisy</span> deploy --prod{"\n"}
                  <span className="code-success">✓ Detecting Next.js</span>
                  {"\n"}
                  <span className="code-success">✓ Creating SQLite database</span>
                  {"\n"}
                  <span className="code-success">✓ Live in 12s</span>
                </code>
              </pre>
            </div>
          </div>
        </section>

        <section aria-labelledby="use-cases-title" className="section use-cases-section">
          <div className="site-width">
            <div className="section-kicker mono-label">05 / SHIP ANYTHING</div>
            <h2 className="section-title" id="use-cases-title">
              A calm place for your next idea.
            </h2>
            <div className="use-case-grid">
              <article>
                <span>01</span>
                <h3>SaaS products</h3>
                <p>Ship the MVP and the production app on the same platform.</p>
              </article>
              <article>
                <span>02</span>
                <h3>APIs & backends</h3>
                <p>Deploy fast services with logs, HTTPS, and predictable pricing.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Student projects</h3>
                <p>Learn the real deployment workflow without a credit card.</p>
              </article>
              <article>
                <span>04</span>
                <h3>Startups</h3>
                <p>Move from first customer to scale without platform rewrites.</p>
              </article>
            </div>
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
                  No. SQLite is a natural fit for many small and medium applications, and Cloudisy
                  keeps the database layer separate from the sleeping app instance.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <section aria-label="Start your deployment" className="site-width footer-cta" id="cta">
          <div>
            <span className="mono-label">READY TO SHIP?</span>
            <h2>Your app is one push away.</h2>
            <p>No credit card required.</p>
          </div>
          <div className="footer-cta-actions">
            <Button asChild className="button-mono" size="default">
              <a href="#deploy">
                Start free <ArrowRight aria-hidden="true" size={14} />
              </a>
            </Button>
            <Button asChild className="button-mono" size="default" variant="outline">
              <a href="#flow">
                See how deployment works <ArrowRight aria-hidden="true" size={14} />
              </a>
            </Button>
          </div>
          <div className="cta-trust-row">
            <span>Free tier</span>
            <span>Deploy in ~12s</span>
            <span>SQLite included</span>
          </div>
        </section>
        <div className="site-width footer-grid">
          <div className="footer-brand">
            <Link aria-label="Cloudisy home" className="brand-link" to="/">
              <span aria-hidden="true" className="brand-mark">
                <Activity size={14} />
              </span>
              <span>cloudisy</span>
            </Link>
            <p>Deploy applications. Create databases. Pay only for what you use.</p>
            <span>Made with care in Bangladesh.</span>
          </div>
          <div>
            <h3>Product</h3>
            <a href="#features">Features</a>
            <a href="#deploy">Deployments</a>
            <a href="#database">SQLite databases</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div>
            <h3>Resources</h3>
            <a href="#faq">FAQ</a>
            <a href="#deploy">How it works</a>
            <a href="#features">Supported stacks</a>
          </div>
          <div>
            <h3>Company</h3>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Status</a>
          </div>
        </div>
        <div className="site-width footer-bottom">
          <span>© 2026 Cloudisy</span>
          <span>Privacy · Terms · Security</span>
          <a href="#hero-title">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
