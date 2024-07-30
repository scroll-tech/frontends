import { Interface } from "ethers"

const abi = [
  "error Unauthorized()",
  "error CannotUpgrade(bytes32 uid)",

  // attestation errors
  "error BadgeNotAllowed(address badge)",
  "error BadgeNotFound(address badge)",
  "error ExpirationDisabled()",
  "error MissingPayload()",
  "error ResolverPaymentsDisabled()",
  "error RevocationDisabled()",
  "error SingletonBadge()",
  "error UnknownSchema()",

  // query errors
  "error AttestationBadgeMismatch(bytes32 uid)",
  "error AttestationExpired(bytes32 uid)",
  "error AttestationNotFound(bytes32 uid)",
  "error AttestationOwnerMismatch(bytes32 uid)",
  "error AttestationRevoked(bytes32 uid)",
  "error AttestationSchemaMismatch(bytes32 uid)",

  // profile errors
  "error BadgeCountReached()",
  "error LengthMismatch()",
  "error TokenNotOwnedByUser(address token, uint256 tokenId)",

  // profile registry errors
  "error CallerIsNotUserProfile()",
  "error DuplicatedUsername()",
  "error ExpiredSignature()",
  "error ImplementationNotContract()",
  "error InvalidReferrer()",
  "error InvalidSignature()",
  "error InvalidUsername()",
  "error MsgValueMismatchWithMintFee()",
  "error ProfileAlreadyMinted()",

  "error AccessDenied()",

  // EAS error
  "error DeadlineExpired()",
  "error InvalidEAS()",
  "error InvalidLength()",
  "error NotFound()",
]

const IDENTIFIED_ERROR_MAP = {
  AccessDenied: issuer => `Minting failed. Please reach out to ${issuer}’s community channels for help`,
  SingletonBadge: "You have already minted this badge. Please wait for a while for Canvas to be updated",
  ExpiredSignature: "Something went wrong. Please try again later",
  InvalidSignature: issuer => `Minting failed. Please reach out to ${issuer}’s community channels for help`,
  DeadlineExpired: "Something went wrong. Please try again later",
  ProfileAlreadyMinted: "You have already minted your Canvas. Please wait for a while for Canvas to be updated",
}

export const decodeErrorData = errSelector => {
  const contract = new Interface(abi)
  const parsedError = contract.parseError(errSelector)
  return parsedError?.name
}

// AccessDenied / InvalidSignature only for minting a badge
export const recognizeError = (error, issuerName?) => {
  if (error.code === "INSUFFICIENT_FUNDS") {
    return "Transaction failed due to insufficient funds. Please ensure your wallet has enough ETH"
  }
  if (error.code === "CALL_EXCEPTION") {
    const unrecognized = "Something went wrong. Please try again later"
    // execution reverted
    if (error.data) {
      const type = decodeErrorData(error.data)
      if (type) {
        if (IDENTIFIED_ERROR_MAP[type]) {
          return typeof IDENTIFIED_ERROR_MAP[type] === "function" ? IDENTIFIED_ERROR_MAP[type](issuerName) : IDENTIFIED_ERROR_MAP[type]
        }
        return "Execution reverted due to " + type
      }
      return unrecognized
    }
    return unrecognized
  }
  if (error.code === "UNKNOWN_ERROR" && error.message.startsWith("could not coalesce error")) {
    return error.error?.message || error.error?.data?.error?.message || "RPC service is busy. Please try again later"
  }
  return error.message
}
