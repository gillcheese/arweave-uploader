// components/ImageUpload.js
import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useUmi } from '../contexts/UmiContext';
import { createGenericFile } from '@metaplex-foundation/umi';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';

export default function ImageUpload() {
  const wallet = useWallet();
  const umi = useUmi();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  useEffect(() => {
    if (wallet.publicKey) {
      umi.use(walletAdapterIdentity(wallet));
    }
  }, [wallet.publicKey, umi]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadToArweave = async () => {
    if (!file || !umi || !wallet.publicKey) return;

    setUploading(true);
    try {
      const fileBuffer = await file.arrayBuffer();
      const genericFile = createGenericFile(fileBuffer, file.name, { contentType: file.type });

      const [uri] = await umi.uploader.upload([genericFile]);

      setUploadedUrl(uri);
      console.log('File uploaded to Arweave:', uri);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      <button 
        onClick={uploadToArweave} 
        disabled={!file || uploading || !wallet.publicKey}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        {uploading ? 'Uploading...' : 'Upload to Arweave'}
      </button>
      {uploadedUrl && (
        <div className="mt-4">
          <p>Uploaded URL:</p>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 break-all">
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  );
}