// pages/index.js
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import ImageUpload from '../components/ImageUpload';

const WalletConnectButton = dynamic(
  () => import('../components/WalletConnectButton'),
  { ssr: false }
);

export default function Home() {
  const { publicKey } = useWallet();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Upload to Arweave</h1>
        <div className="bg-gray-900 shadow-lg rounded-lg p-6 border border-gray-800">
          <WalletConnectButton />
          {publicKey ? (
            <>
              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Upload Image to Arweave</h2>
                <ImageUpload />
              </section>
            </>
          ) : (
            <p className="mt-4 text-gray-400">Please connect your wallet to use the NFT tools.</p>
          )}
        </div>
      </div>
    </div>
  );
}