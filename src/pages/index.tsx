import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

/**
 * The hero background echoes the icon's "b": translucent rings that drift
 * slightly out of register and back, like the layered bowls of the letter.
 */
function Rings(): ReactNode {
  return (
    <div className={styles.rings} aria-hidden="true">
      <span className={clsx(styles.ring, styles.ringA)} />
      <span className={clsx(styles.ring, styles.ringB)} />
      <span className={clsx(styles.ring, styles.ringC)} />
    </div>
  );
}

type Tile = {name: string; initials: string; tint: string; selected?: boolean};

const orgs: Tile[] = [
  {name: 'Acme', initials: 'A', tint: '#fde3c8', selected: true},
  {name: 'Globex', initials: 'G', tint: '#d9ecf7'},
  {name: 'MPOWR IT', initials: 'MI', tint: '#e5e0f8'},
];

const brands: Tile[] = [
  {name: 'Shine', initials: 'S', tint: '#dff3e4'},
  {name: 'Sparkle', initials: 'S', tint: '#fbe0e8', selected: true},
];

type Asset = {name: string; detail: string; preview: ReactNode; selected?: boolean};

function TileRow({tile}: {tile: Tile}): ReactNode {
  return (
    <div className={clsx(styles.row, tile.selected && styles.rowSelected)}>
      <span className={styles.tile} style={{background: tile.tint}}>
        {tile.initials}
      </span>
      {tile.name}
    </div>
  );
}

/** A static rendering of the real three-column popover, filled with example data. */
function Popover(): ReactNode {
  const icon = useBaseUrl('/img/logo.png');
  const assets: Asset[] = [
    {
      name: 'Primary Blue',
      detail: '#0A14C8 · 12 Sep 2026',
      preview: <span className={styles.swatch} style={{background: '#0a14c8'}} />,
      selected: true,
    },
    {
      name: 'Warm Sand',
      detail: '20:40:60:10 · 12 Sep 2026',
      preview: <span className={styles.swatch} style={{background: '#cc9966'}} />,
    },
    {
      name: 'Logo',
      detail: '4.2 KB · image/svg+xml · SVG · 18 Sep 2026',
      preview: <img className={styles.assetImg} src={icon} alt="" />,
    },
    {
      name: 'Brand Font',
      detail: '182 KB · font/ttf · TTF · 18 Sep 2026',
      preview: <span className={clsx(styles.swatch, styles.fontSample)}>Aa</span>,
    },
    {
      name: 'Guidelines',
      detail: '2.1 MB · application/pdf · PDF · 2 Oct 2026',
      preview: <span className={clsx(styles.swatch, styles.pdfSample)} />,
    },
  ];

  return (
    <figure className={styles.popover}>
      <figcaption className="sr-only">
        The Branda popover: organizations, the brands of the selected organization, and that
        brand's assets.
      </figcaption>
      <div className={styles.popoverInner} aria-hidden="true">
        <div className={styles.popHeader}>
          <img src={icon} alt="" className={styles.popIcon} />
          <span className={styles.search}>Lookup org, brand or asset...</span>
        </div>
        <div className={styles.columns}>
          <div className={clsx(styles.column, styles.colOrgs)}>
            <div className={styles.colHead}>
              Organizations <span className={styles.badge}>{orgs.length}</span>
            </div>
            {orgs.map((o) => (
              <TileRow key={o.name} tile={o} />
            ))}
          </div>
          <div className={clsx(styles.column, styles.colBrands)}>
            <div className={styles.colHead}>
              Brands <span className={styles.badge}>{brands.length}</span>
            </div>
            {brands.map((b) => (
              <TileRow key={b.name} tile={b} />
            ))}
          </div>
          <div className={styles.column}>
            <div className={styles.colHead}>
              Assets <span className={styles.badge}>{assets.length}</span>
            </div>
            {assets.map((a) => (
              <div
                key={a.name}
                className={clsx(styles.row, styles.assetRow, a.selected && styles.rowSelected)}>
                {a.preview}
                <span className={styles.assetText}>
                  <strong>{a.name}</strong>
                  <span className={styles.assetDetail}>{a.detail}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}

function Hero(): ReactNode {
  return (
    <header className={styles.hero}>
      <Rings />
      <div className={clsx('container', styles.heroGrid)}>
        <div className={styles.heroCopy}>
          <Heading as="h1" className={styles.heroTitle}>
            Your brand,
            <br />
            one shortcut away.
          </Heading>
          <p className={styles.heroLead}>
            Branda keeps colors, fonts, logos, and guidelines in your Mac's menu bar — and hands
            the same data to your scripts and AI agents through <code>branda-cli</code>.
          </p>
          <div className={styles.heroActions}>
            <Link className={clsx('button button--lg', styles.primaryButton)} to="/docs/installation">
              Install Branda
            </Link>
            <Link className={clsx('button button--lg', styles.ghostButton)} to="/docs/quickstart">
              Read the quickstart
            </Link>
          </div>
          <p className={styles.heroNote}>For macOS 13 or later. Free for personal use.</p>
        </div>
        <Popover />
      </div>
    </header>
  );
}

function Features(): ReactNode {
  return (
    <section className={styles.features}>
      <div className={clsx('container', styles.featureGrid)}>
        <div>
          <div className={styles.featureDemo}>
            <kbd>⌘</kbd>
            <kbd>⌥</kbd>
            <kbd>B</kbd>
          </div>
          <Heading as="h2" className={styles.featureTitle}>
            Open it from any app
          </Heading>
          <p className={styles.featureText}>
            Type a few letters to jump to any organization, brand, or asset. Double-click a color
            to copy its hex value, drag a logo into Keynote or Figma, press Space for Quick Look.
          </p>
          <Link to="/docs/menu">The branda Menu</Link>
        </div>
        <div>
          <pre className={styles.featureCode}>
            <code>
              {'$ branda-cli asset create "#0A14C8" \\\n    --name "Primary Blue" \\\n    --brand Sparkle --org Acme'}
            </code>
          </pre>
          <Heading as="h2" className={styles.featureTitle}>
            Set it up from the terminal
          </Heading>
          <p className={styles.featureText}>
            Every action in the app is a <code>branda-cli</code> command too. Import a whole
            palette in one script; the open menu picks up the changes within seconds.
          </p>
          <Link to="/docs/cli">The branda-cli reference</Link>
        </div>
        <div>
          <pre className={styles.featureCode}>
            <code>
              {'{\n  "displayName": "Primary Blue",\n  "type": "color_rgb",\n  "payload": {\n    "red": 10, "green": 20, "blue": 200\n  }\n}'}
            </code>
          </pre>
          <Heading as="h2" className={styles.featureTitle}>
            Give your AI agent the real colors
          </Heading>
          <p className={styles.featureText}>
            JSON output, non-interactive mode, and stable exit codes let coding agents read your
            brand instead of guessing it.
          </p>
          <Link to="/docs/ai-agents">Usage with AI agents</Link>
        </div>
      </div>
    </section>
  );
}

function Closing(): ReactNode {
  return (
    <section className={styles.closing}>
      <div className={clsx('container', styles.closingInner)}>
        <Heading as="h2" className={styles.closingTitle}>
          Your data stays on your Mac.
        </Heading>
        <p>
          No account, no cloud. Branda stores everything as readable JSON files in your Library
          folder, so backing up your brands means copying one folder.
        </p>
        <Link className="button button--primary button--lg" to="/docs">
          What is branda?
        </Link>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Brand assets at your fingertips"
      description="Branda keeps brand colors, fonts, logos, and documents one click away in the macOS status bar, and exposes them to scripts and AI agents via branda-cli.">
      <Hero />
      <main>
        <Features />
        <Closing />
      </main>
    </Layout>
  );
}
