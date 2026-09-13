import { BadRequestException, Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { RegisterDto } from './registration.dto';

@Injectable()
export class RegisterService {
  private users = new Map<string, any>();
  private challenges = new Map<string, string>();
  private provider = new ethers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545',
  );
  private contractAddress = process.env.CONTRACT_ADDRESS || '';
  private abi = [
    'function registerIdentity(bytes32 didHash)',
    'function isRegistered(address wallet) view returns (bool)',
  ];

  getChallenge(wallet: string) {
    const message = `TrustMesh registration challenge\\nWallet: ${wallet.toLowerCase()}\\nNonce: ${crypto.randomUUID()}`;
    this.challenges.set(wallet.toLowerCase(), message);
    return { message };
  }
  async register(dto: RegisterDto) {
    const wallet = dto.wallet.toLowerCase();
    const challenge = this.challenges.get(wallet);
    if (!challenge || challenge !== dto.message)
      throw new BadRequestException(
        'Invalid or expired registration challenge',
      );
    const recovered = ethers
      .verifyMessage(challenge, dto.signature)
      .toLowerCase();
    if (recovered !== wallet)
      throw new BadRequestException('Wallet signature verification failed');
    if (this.users.has(wallet))
      throw new BadRequestException('User already registered');
    if (!dto.did.startsWith('did:'))
      throw new BadRequestException('Invalid DID');
    const didHash = ethers.keccak256(ethers.toUtf8Bytes(dto.did));

    // The browser wallet sends the blockchain transaction. Backend only verifies the signature.
    const user = {
      id: crypto.randomUUID(),
      name: dto.name,
      email: dto.email,
      employeeId: dto.employeeId,
      department: dto.department,
      wallet,
      did: dto.did,
      didHash,
      role: 'USER',
      status: 'VERIFIED',
      createdAt: new Date().toISOString(),
    };
    this.users.set(wallet, user);
    this.challenges.delete(wallet);
    return {
      message:
        'Registration verified. Now submit the blockchain transaction from the wallet.',
      user,
    };
  }
  getUser(wallet: string) {
    return this.users.get(wallet.toLowerCase()) || null;
  }
}
