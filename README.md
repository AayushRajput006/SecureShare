# SecureShare — Blockchain File Sharing (Milestone 3)

**Scope:** free local university development; scaffold only. Full encryption, smart contract registry and secure sharing are planned in later milestones.

## Requirements
Node.js **22.13+**, npm, VS Code, Git; optional local Kubo and MongoDB Community Edition. A browser wallet is needed later.

## 1. Extract and open project
Open `blockchain-file-sharing` folder in VS Code. Use three terminals.

## 2. Install project packages (requires internet the first time)
```bash
npm --prefix frontend install
npm --prefix backend install
```

## 3. Start services (in separate terminals)
```bash
npm run dev:backend
npm run dev:frontend
```
- Web: http://127.0.0.1:5173
- Health API: http://127.0.0.1:5000/api/health
- Dashboard should show `Backend status: ok`.

## 4. Backend smoke test
```bash
npm run test:backend
```

## 5. Initialize Hardhat (inside blockchain/)
```bash
cd blockchain
npx hardhat --init
npx hardhat test
```
Accept the default Hardhat 3 TypeScript starter. This starter is *deliberately not pre-initialized*, to avoid mismatching Hardhat plugin versions. See https://hardhat.org/docs/getting-started .

## 6. Set up local IPFS
Install Kubo using https://docs.ipfs.tech/install/command-line/ . Then:
```bash
ipfs --version
ipfs init
ipfs daemon
```
`ipfs init` is a one-time operation; don't run it again on an existing repository. Run `ipfs daemon` in another terminal.

## 7. Optional local MongoDB
Install MongoDB Community Edition and verify `mongosh`. It is not required to run the Milestone 3 health check.

## 8. Security
- Never commit `.env`, private keys, wallet secrets, or plaintext file contents.
- `VITE_` variables are public in browser builds and must not contain secrets.
- Kubo RPC runs on local loopback only.
- Use development wallets only.

## Architecture and tracker
See `docs/architecture.md`, `docs/data-model.md`, `docs/use-cases.md`, and `docs/milestone-3-validation.md`. Next: Milestone 4 Solidity file registry.
