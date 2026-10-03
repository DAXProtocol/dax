# DAX Protocol — LAVA VC Investor Questionnaire & Deal Room

**Target Partner**: LAVA VC Team (Yoseph Ayele, Songyi Lee, See Eun Ha, Girum Gizachew)  
**Live Interactive Deck**: [https://daxprotocol.github.io/dax/](https://daxprotocol.github.io/dax/)  
**Live Mobile Client**: [Google Play Store (`com.dax.app`)](https://play.google.com/store/apps/details?id=com.dax.app)  
**GitHub Monorepo**: [https://github.com/DAXProtocol/dax](https://github.com/DAXProtocol/dax)  
**Founder & Contact**: Getasew Tilahun (`getasewbekahegn@gmail.com`) — Addis Ababa, Ethiopia  

---

## Direct Answers to LAVA VC Due Diligence Questions

### 1. What does your company do?
**DAX Protocol** is the decentralized, self-custodial trust layer for African and frontier commerce. We eliminate counterparty risk and centralized middlemen for cross-border trade, freelance payments, and stablecoin commercial settlement through:
1. **Deterministic Smart Escrows (`DAX_AgreementUpgradeable.sol`)**: Non-custodial, programmable escrow state machine running on Arbitrum One.
2. **Cryptographic Deliverable Proofs**: SHA-256 fingerprinting of invoices, code, or bills of lading committed as immutable Merkle roots on-chain.
3. **Decentralized Commit-Reveal Dispute Arbitration (`DAX_Court.sol`)**: Community-staked Schelling-point juror court that resolves commercial disagreements fairly without expensive lawyers or corruptible centralized support desks.
4. **Mobile-Native Consumer Experience**: Production Android client with hardware-backed biometrics (`BIOMETRIC_STRONG`) and zero-telemetry key management.

---

### 2. How big is the market? What geographies are your primary market(s)?
- **Target Segments & Use Cases**:
  - **Software Freelancers & Teams**: Cross-border payments for digital work and international clients.
  - **Stablecoin Commerce**: Trustless non-custodial settlement and escrow.
  - **Cross-Border Traders**: Physical deliveries and commercial trade agreements.
  - **Settlement Architecture**: Non-custodial escrow on Arbitrum One.
- **Two-Pronged Geographic Strategy**:
  - **Ethiopia — Product & Technology Beachhead**:
    - **Product & Engineering Base**: Built from Addis Ababa, with local developers and freelancers as an early user and testing base for permitted software milestone escrow, deliverable proofs, and commercial agreements.
    - **Regulatory Monitoring**: Monitoring NBE's evolving digital-asset and payment frameworks while avoiding premature claims about fiat on-ramp availability or licensing.
  - **Priority African Corridors**:
    - **Regulated Payment-Rail Expansion**: Priority African markets are evaluated for expansion by exploring partnerships with licensed payment providers and emerging virtual-asset infrastructure.
    - **Trust Layer Model**: DAX provides the non-custodial smart-agreement and dispute-arbitration layer, while appropriately licensed partners handle applicable payment and on/off-ramp services.
- **Strategic Core**: *"Ethiopia is our technical and product base; priority African corridors are our expansion path."*
- **Market Flexibility**: We start from Ethiopia as our product & engineering base, evaluating priority African corridors based on stablecoin activity, cross-border commercial friction, and regulatory readiness rather than locking into a single jurisdiction prematurely.
- **Architecture Distinction**: DAX's core product is the non-custodial **trust, agreement, and dispute resolution layer**, not necessarily the payment gateway itself. We eliminate counterparty risk and escrow funds trustlessly on Arbitrum One without needing to own every local fiat rail.

---

### 3. What is your traction?
- **Live Mobile App on Google Play**: Production Android client live on the Play Store (`com.dax.app`, v1.3.5+9) featuring self-custodial multi-token vault (ETH, USDC, USDT, ARB), Uniswap V3 swap integration, agreement escrow management, and dynamic screen security.
- **On-Chain Smart Contracts on Arbitrum One**: Deployed protocol suite (`DAX_AgreementUpgradeable`, `DAX_Court`, `DAX_OfferPool`).
- **619 Passing Automated Tests (Zero Compromise Engineering)**:
  - **532 Automated Tests** passing on the Flutter mobile client (`dax-app`).
  - **87 Invariant & Adversarial Tests** passing on Hardhat/Solidity smart contracts (`dax-contracts`), mathematically proving asset conservation invariants (INV-01 to INV-10) with 0 static analysis issues.
- **Target User Personas**: Software freelancers & agencies, stablecoin commerce participants, and cross-border physical merchants in East Africa.

---

### 4. What's your secret sauce?
1. **Client-Side Key Management & Hardware Security**:
   - Private keys are generated and derived via BIP-39/BIP-44 exclusively in isolated memory and stored in Android Keystore AES-GCM.
   - Hardware-backed biometric authentication (`BIOMETRIC_STRONG`) with 0 server-side key exposure.
   - Dynamic `FLAG_SECURE` screen privacy prevents task switcher caching and blocks OS-level screenshots. Zero telemetry on keys or seeds.
2. **Commit-Reveal Arbitration Court (`DAX_Court.sol`)**:
   - Two-phase commit-reveal voting (`keccak256(vote + salt)`) prevents bandwagoning and vote front-running. Jurors stake collateral to participate; malicious jurors forfeit staked tokens, and honest jurors earn dispute fees.
3. **Cryptographic Deliverable Proofs**:
   - Work deliverables or shipping documents are fingerprinted client-side with SHA-256 and committed on-chain via EIP-712 typed data signatures, establishing verifiable delivery records.
4. **Arbitrum One Execution**:
   - Sub-cent gas fees and ~250ms L2 finality enable micro-escrows ($20–$500) that are impractical on L1 or traditional escrow platforms.

---

### 5. What's your business model?
- **0.25% Protocol Escrow Fee**: Automatically deducted from released escrow upon successful agreement completion. Over 10x cheaper than centralized P2P platforms (1.5%–3.5%) and freelance marketplaces (10%–20%), driving organic volume migration while generating predictable protocol cash flow.
- **Dispute Resolution Fees**: Court filing fees and a portion of slashed stakes from outlier jurors contribute toward sustaining court liquidity and the protocol treasury.
- **B2B Escrow-as-a-Service API/SDK**: Future integration enabling regional freelance directories, job boards, and commercial marketplaces to embed DAX smart escrow natively.
- **Low Operational Overhead**: Non-custodial software architecture eliminates custodial balance sheet liabilities, third-party custody fees, and costly regulatory capital reserves.

---

### 6. Tell me about your team.
- **Founder & Lead Protocol Engineer: Getasew Tilahun**
  - **Proven Execution**: Architected and implemented the DAX monorepo, including 619 passing tests, client-side cryptographic key storage, EVM smart contracts, and the production Android application published on Google Play.
  - **Market Proximity**: Based in Addis Ababa, Ethiopia, with direct exposure to local FX, P2P commerce, freelance payments, and cross-border payment challenges.
  - **Technical Depth**: Backend and systems engineer with experience in Flutter Clean Architecture, Solidity smart contracts and invariants, cryptographic key management, and hardware-backed mobile security.
- **Community & Ecosystem**:
  - **Developer & Ecosystem Community**: Engagement with African Web3 developers, security researchers, and blockchain infrastructure communities.
  - **Merchant Testing**: Early testing and iterative feedback from freelance, software-export, and stablecoin commerce users in East Africa.
  - **Open Source**: DAX's codebase is publicly available for community review and verification.

---

### 7. What terms are you raising on?
- **Round Size**: **$200,000 – $300,000** Pre-Seed
- **Investment Instrument**: **Post-Money SAFE + Token Warrant**
- **Valuation Cap**: **$3.5M – $5.0M**
- **Target Runway**: 18 Months
- **Use of Funds**:
  - **40% Security & Formal Audits**: Tier-1 smart contract audit & formal proof prior to scaling protocol liquidity.
  - **30% Juror Staking**: Bootstrapping decentralized court pools.
  - **20% Local Payment Rails**: Regulated on-ramp/off-ramp integrations across priority African markets.
  - **10% Merchant Growth**: Freelancer & merchant corridor onboarding.

---

## Verified Materials & Links
- **Interactive Pitch Deck**: [https://daxprotocol.github.io/dax/](https://daxprotocol.github.io/dax/)
- **Live Google Play Store App**: [https://play.google.com/store/apps/details?id=com.dax.app](https://play.google.com/store/apps/details?id=com.dax.app)
- **Public GitHub Monorepo**: [https://github.com/DAXProtocol/dax](https://github.com/DAXProtocol/dax)
