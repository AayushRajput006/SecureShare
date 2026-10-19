
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract FileSharing {
    struct FileRecord {
        address owner;
        string cid;
        uint256 uploadedAt;
        bool active;
    }

    uint256 public fileCount;

    mapping(uint256 => FileRecord) private files;
    mapping(uint256 => mapping(address => bool)) private permissions;

    event FileRegistered(
        uint256 indexed fileId,
        address indexed owner,
        string cid
    );

    event AccessGranted(
        uint256 indexed fileId,
        address indexed recipient
    );

    event AccessRevoked(
        uint256 indexed fileId,
        address indexed recipient
    );

    modifier onlyOwner(uint256 fileId) {
        require(files[fileId].owner == msg.sender, "Not file owner");
        _;
    }

    modifier validFile(uint256 fileId) {
        require(
            fileId > 0 &&
            fileId <= fileCount &&
            files[fileId].active,
            "Invalid file"
        );
        _;
    }

    function registerFile(string calldata cid) external {
        require(bytes(cid).length > 0, "CID required");

        fileCount++;

        files[fileCount] = FileRecord({
            owner: msg.sender,
            cid: cid,
            uploadedAt: block.timestamp,
            active: true
        });

        emit FileRegistered(fileCount, msg.sender, cid);
    }

    function grantAccess(
        uint256 fileId,
        address recipient
    ) external validFile(fileId) onlyOwner(fileId) {
        require(recipient != address(0), "Invalid recipient");
        require(recipient != msg.sender, "Owner already has access");

        permissions[fileId][recipient] = true;

        emit AccessGranted(fileId, recipient);
    }

    function revokeAccess(
        uint256 fileId,
        address recipient
    ) external validFile(fileId) onlyOwner(fileId) {
        require(recipient != address(0), "Invalid recipient");

        permissions[fileId][recipient] = false;

        emit AccessRevoked(fileId, recipient);
    }

    function hasAccess(
        uint256 fileId,
        address user
    ) public view returns (bool) {
        if (
            fileId == 0 ||
            fileId > fileCount ||
            !files[fileId].active
        ) {
            return false;
        }

        return (
            files[fileId].owner == user ||
            permissions[fileId][user]
        );
    }

    function getFile(
        uint256 fileId
    )
        external
        view
        validFile(fileId)
        returns (FileRecord memory)
    {
        require(
            hasAccess(fileId, msg.sender),
            "Access denied"
        );

        return files[fileId];
    }
}
