import { Client, Account, Databases, Users, Storage } from "node-appwrite";
import { cookies } from "next/headers";
import { APPWRITE_CONFIG } from "./config";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(APPWRITE_CONFIG.endpoint)
    .setProject(APPWRITE_CONFIG.projectId);

  const cookieStore = await cookies();
  const session = cookieStore.get("appwrite-session");

  if (session && session.value) {
    client.setSession(session.value);
  }

  return {
    client,
    account: new Account(client),
    databases: new Databases(client),
    storage: new Storage(client),
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(APPWRITE_CONFIG.endpoint)
    .setProject(APPWRITE_CONFIG.projectId);

  if (APPWRITE_CONFIG.apiKey) {
    client.setKey(APPWRITE_CONFIG.apiKey);
  }

  return {
    client,
    account: new Account(client),
    databases: new Databases(client),
    users: new Users(client),
    storage: new Storage(client),
  };
}
