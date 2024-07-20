// components/WalletConnectButton.js
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';

const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export default function WalletConnectButton() {
  const { publicKey } = useWallet();

  return (
    <div>
      <WalletMultiButton />
      {publicKey && (
        <p className="mt-2">
          Connected: {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
        </p>
      )}
    </div>
  );
}