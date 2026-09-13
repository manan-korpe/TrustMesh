import { Log } from "@/types/log";

export const generateHash = (length = 40) => '0x' + Array.from({length}, () => Math.floor(Math.random()*16).toString(16)).join('');
export const generateDID = (wallet:string) => `did:ethr:sepolia:${wallet}`;

const NAMES_POOL = ['Tushar',];
const DEPTS = ['IT', 'Operations', 'Security', 'Finance', 'HR', 'Administration'];
const ROLES = ['Admin', 'Manager', 'Auditor', 'User'];

export const generateInitialData = () => {
  let availableNames = [...NAMES_POOL].sort(() => 0.5 - Math.random());
  
  const users = [
    { id: 'EMP-001', name: availableNames.pop(), dept: 'IT', role: 'Admin', status: 'Verified', wallet: generateHash(40), active: true },
  ].map(u => ({
    ...u,
    email: `${u.name?.toLowerCase()}@TrustMesh.com`,
    did: u.wallet ? generateDID(u.wallet) : null,
    registeredAt: u.wallet ? new Date(Date.now() - Math.random() * 10000000000).toISOString() : null
  }));

  const categories = ['Laptop', 'Mobile', 'Security Token', 'Vehicle', 'Digital License', 'Office Equipment'];
  const assets = Array.from({ length: 12 }).map((_, i) => {
    const owner = Math.random() > 0.2 ? users[Math.floor(Math.random() * users.length)] : null;
    return {
      id: `AST-0${(i + 1).toString().padStart(2, '0')}`,
      name: `${categories[Math.floor(Math.random() * categories.length)]} ${Math.floor(Math.random() * 1000)}`,
      type: categories[Math.floor(Math.random() * categories.length)],
      ownerId: owner?.id || null,
      tokenId: `#10${i.toString().padStart(2, '0')}`,
      status: owner ? 'Assigned' : 'Unassigned',
      date: new Date(Date.now() - Math.random() * 5000000000).toISOString(),
      metadataCid: `bafybeig${generateHash(10).substring(2)}`,
      txHash: generateHash(64)
    };
  });

  const auditLogs:Log[] = [];

  return { users, assets, auditLogs };
};
