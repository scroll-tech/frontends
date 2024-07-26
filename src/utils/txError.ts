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
  AccessDenied: "Access Denied. Please contact the badge issuer for assistance",
  SingletonBadge: "You have minted this badge before. Please wait for EAS to sync the data",
  ExpiredSignature: "Invitation code signature has expired. Please refresh the page and try again",
  InvalidSignature: "Invalid signature. Please contact the badge issuer for assistance",
  DeadlineExpired: "The signature has expired. Please try again",
  ProfileAlreadyMinted: "You have minted Canvas before. Please refresh the page to sync the latest data.",
}

export const decodeErrorData = errSelector => {
  const contract = new Interface(abi)
  const parsedError = contract.parseError(errSelector)
  return parsedError?.name
}

export const recognizeError = error => {
  if (error.code === "INSUFFICIENT_FUNDS") {
    return "Transaction failed due to insufficient funds. Please ensure your account has enough balance."
  }
  if (error.code === "CALL_EXCEPTION") {
    const unrecognized = "Transaction failed due to an unknown error. Please try again later."
    // execution reverted
    if (error.data) {
      const type = decodeErrorData(error.data)
      return type ? `${IDENTIFIED_ERROR_MAP[type] ? IDENTIFIED_ERROR_MAP[type] : "Execution reverted due to " + type}` : unrecognized
    }
    return unrecognized
  }
  if (error.code === "UNKNOWN_ERROR" && error.message.startsWith("could not coalesce error")) {
    return error.error?.message || error.error?.data?.error?.message || "The PRC is busy, please try again later."
  }
  return error.message
}
