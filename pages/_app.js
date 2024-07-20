// pages/_app.js
import { useMemo } from 'react';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
import { UmiContext } from '../contexts/UmiContext';
import dynamic from 'next/dynamic';
import getConfig from 'next/config';
import '../styles/globals.css';

const { publicRuntimeConfig } = getConfig();

const WalletConnectionProvider = dynamic(
  () => import('../components/WalletConnectionProvider'),
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  const umi = useMemo(() => {
    return createUmi(publicRuntimeConfig.RPC_URL)
      .use(irysUploader({ address: 'https://node1.irys.xyz' }));
  }, []);

  return (
    <UmiContext.Provider value={umi}>
      <WalletConnectionProvider rpcUrl={publicRuntimeConfig.RPC_URL}>
        <Component {...pageProps} />
      </WalletConnectionProvider>
    </UmiContext.Provider>
  );
}

export default MyApp;