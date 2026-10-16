# System architecture — Milestone 3

```mermaid
flowchart TD
 U[User in browser] --> R[React + MUI]
 R --> W[MetaMask wallet]
 R --> C[Web Crypto: AES-GCM]
 R --> A[Express API]
 R --> E[Ethers.js]
 A --> K[Local IPFS Kubo]
 A --> M[(MongoDB local - later)]
 E --> H[Hardhat local EVM]
 H --> S[Solidity file registry - later]
```

## Data placement
- Browser: plaintext file transiently, AES key during encryption/decryption; future protected client key material.
- IPFS: encrypted file bytes only; CID identifies ciphertext.
- Blockchain: owner, CID reference, authorized wallet addresses and events (all public).
- MongoDB: non-secret indexes, encrypted per-recipient key envelopes; signed-wallet session checks required before delivery.

## Trust boundaries
- Wallet signature authenticates identity; it does not decrypt data.
- A blockchain access entry does not keep a public IPFS CID secret. Encryption protects content.
- Revocation does not undo past downloads. Re-key/re-encrypt future versions.
- Kubo RPC should bind to loopback; never expose it to the internet.
