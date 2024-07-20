// utils/umiConnection.js
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';

export function initializeUmi() {
  return createUmi('https://api.mainnet-beta.solana.com');
}