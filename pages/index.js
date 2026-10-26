import Head from "next/head";
import { Header, Container, Title, Footer } from "../componets";
import SelectedWork from "../componets/SelectedWork";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lucas Del Pozzi — Principal &amp; Domain Lead, Agentic Engineering</title>
        <meta name="description" content="Lucas Del Pozzi — Principal & Domain Lead, Agentic Engineering. Building agent-driven engineering workflows and helping teams adopt them at SecurityScorecard." />
        <meta name="theme-color" content="#181a17" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </Head>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Container>
        <Header />
        <main id="main-content">
          <Title />
          <SelectedWork />
        </main>
        <Footer />
      </Container>
    </>
  );
}
