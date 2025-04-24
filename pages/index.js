import Head from 'next/head';
import Varebestilling from '../src/Varebestilling';

export default function Home() {
  return (
    <>
      <Head>
        <title>INPANO Varebestilling</title>
      </Head>
      <Varebestilling />
    </>
  );
}