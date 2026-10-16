# Preliminary data model

**On-chain FileRecord:** fileId, ownerAddress, encryptedCid, registeredAt, active.
**On-chain Permissions:** fileId -> walletAddress -> boolean.
**Off-chain file index:** fileId, filenameCiphertext, fileType, encryptedFileSize, ownerAddress, createdAt.
**Off-chain key envelope:** fileId, recipientAddress, encryptionScheme, wrappedAesKey, nonce, keyVersion.
**Wallet challenge:** walletAddress, randomNonce, expiresAt, usedAt.

Never store plaintext AES keys or raw file bytes in this metadata DB.
