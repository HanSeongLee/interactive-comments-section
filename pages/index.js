import Head from 'next/head';
import styles from './style.module.scss';
import data from '../data/data.json';
import Comments from "../containers/Comments";
import {findAll} from "../api/comments";
import {SWRConfig} from "swr";

export default function Home({ fallback }) {

  return (
      <SWRConfig value={{ fallback }}>
        <Head>
          <meta charSet="UTF-8"/>
          <meta name="viewport"
                content="width=device-width, initial-scale=1.0"
          />

          <title>{process.env.NEXT_PUBLIC_TITLE}</title>
          <meta name="description"
                content={process.env.NEXT_PUBLIC_DESCRIPTION}
          />

          <meta name="description"
                content={process.env.NEXT_PUBLIC_DESCRIPTION}
          />

          <meta property="og:url"
                content={process.env.NEXT_PUBLIC_URL}
          />
          <meta property="og:type"
                content="website"
          />
          <meta property="og:title"
                content={process.env.NEXT_PUBLIC_TITLE}
          />
          <meta property="og:description"
                content={process.env.NEXT_PUBLIC_DESCRIPTION}
          />
          <meta property="og:image"
                content={process.env.NEXT_PUBLIC_OG_IMAGE}
          />

          <meta name="twitter:card"
                content="summary_large_image"
          />
          <meta property="twitter:url"
                content={process.env.NEXT_PUBLIC_URL}
          />
          <meta name="twitter:title"
                content={process.env.NEXT_PUBLIC_TITLE}
          />
          <meta name="twitter:description"
                content={process.env.NEXT_PUBLIC_DESCRIPTION}
          />
          <meta name="twitter:image"
                content={process.env.NEXT_PUBLIC_OG_IMAGE}
          />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png"/>
        </Head>

        <main>
          <h1 className={styles.hidden}>
            Interactive Comments Section
          </h1>
          <section className={styles.container}>
            <Comments currentUser={data.currentUser} />
          </section>
        </main>
      </SWRConfig>
  );
};

export const getServerSideProps = async (context) => {
  const comments = await findAll();

  if (!comments) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      fallback: {
        '/api/comments': comments
      },
    },
  }
};
