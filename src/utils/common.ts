import find from "lodash/find"
import { DependencyList } from "react"

export const shallowEquals = (a?: DependencyList, b?: DependencyList) => {
  if (a?.length !== b?.length) return false;
  if (a === undefined && b === undefined) return true;
  if (a === undefined || b === undefined) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
};

export function findNetworkBySlug(slug: string, networks: any[]) {
  return find(networks, ["slug", slug]);
}

export function requireEnv(entry) {
  if (process.env[entry]) {
    return process.env[entry]!;
  } else {
    throw new Error(`${entry} not defined in .env`);
  }
}

export const generateExploreLink = (explorer, hash) => {
  return `${explorer}/tx/${hash}`;
};
