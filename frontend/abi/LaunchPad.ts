export const LaunchPadABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_defaultAdmin",
        type: "address",
      },
      {
        internalType: "address",
        name: "__shapeNFTBeacon",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    type: "error",
    name: "AccessControlBadConfirmation",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32",
      },
    ],
    type: "error",
    name: "AccessControlUnauthorizedAccount",
  },
  { inputs: [], type: "error", name: "FailedDeployment" },
  {
    inputs: [
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    type: "error",
    name: "InsufficientBalance",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
        indexed: true,
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
        indexed: true,
      },
    ],
    type: "event",
    name: "CollectionCreated",
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
        indexed: true,
      },
      {
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
        indexed: true,
      },
      {
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
        indexed: true,
      },
    ],
    type: "event",
    name: "RoleAdminChanged",
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
        indexed: true,
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
        indexed: true,
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
        indexed: true,
      },
    ],
    type: "event",
    name: "RoleGranted",
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
        indexed: true,
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
        indexed: true,
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
        indexed: true,
      },
    ],
    type: "event",
    name: "RoleRevoked",
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
        indexed: true,
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
        indexed: false,
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
        indexed: true,
      },
      {
        internalType: "address",
        name: "tbaAddress",
        type: "address",
        indexed: true,
      },
    ],
    type: "event",
    name: "TokenMinted",
    anonymous: false,
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "MINTER_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_imageUri", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "createCollection",
    outputs: [
      {
        internalType: "address",
        name: "collection_",
        type: "address",
      },
    ],
  },
  {
    inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
    name: "getRoleAdmin",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "getShapeNFTBeacon",
    outputs: [{ internalType: "address", name: "", type: "address" }],
  },
  {
    inputs: [],
    stateMutability: "view",
    type: "function",
    name: "getShapeNFTs",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
  },
  {
    inputs: [{ internalType: "address", name: "_owner", type: "address" }],
    stateMutability: "view",
    type: "function",
    name: "getShapeNFTsByOwner",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "grantRole",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
    name: "hasRole",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_collection",
        type: "address",
      },
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "string", name: "_imageUri", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "mintToCollection",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tbaAddress_",
        type: "address",
      },
    ],
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "renounceRole",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "revokeRole",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
  },
];
