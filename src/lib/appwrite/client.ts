import { Client, Account, Databases, Storage } from "appwrite";
import { APPWRITE_CONFIG } from "./config";

export function getBrowserAppwriteClient() {
  const client = new Client();

  if (APPWRITE_CONFIG.endpoint) {
    client.setEndpoint(APPWRITE_CONFIG.endpoint);
  }
  if (APPWRITE_CONFIG.projectId) {
    client.setProject(APPWRITE_CONFIG.projectId);
  }

  return {
    client,
    account: new Account(client),
    databases: new Databases(client),
    storage: new Storage(client),
  };
}
