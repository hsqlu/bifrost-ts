export const IOST_TYPES = {
    Address: "MultiAddress",
    LookupSource: "MultiAddress",
    TransactionStatus: {
        _enum: [
            "Initialized",
            "Created",
            "SignComplete",
            "Sent",
            "Succeeded",
            "Failed",
        ],
    },
    TokenType: {
        _enum: ["Native", "Stable", "Token", "VToken"],
    },
    Checksum256Array: "Vec<Checksum256>",
    IostMultiSigTx: {
        chain_id: "i32",
        raw_tx: "Vec<u8>",
        multi_sig: "MultiSig",
        action: "IostAction",
        from: "AccountId",
        asset_id: "AssetId",
    },
    IostProcessing: {
        tx_id: "Vec<u8>",
        multi_sig_tx: "IostMultiSigTx",
    },
    IostAction: {
        contract: "Vec<u8>",
        action_name: "Vec<u8>",
        data: "Vec<u8>",
    },
    BlockHead: {
        version: "i64",
        parent_hash: "Vec<u8>",
        tx_merkle_hash: "Vec<u8>",
        tx_receipt_merkle_hash: "Vec<u8>",
        info: "Vec<u8>",
        number: "i64",
        witness: "Vec<u8>",
        time: "i64",
        hash: "Vec<u8>",
        algorithm: "u8",
        sig: "Vec<u8>",
        pug_key: "Vec<u8>",
    },
    IostTxOut: {
        _enum: {
            Initial: "IostMultiSigTx",
            Generated: "IostMultiSigTx",
            Signed: "IostMultiSigTx",
            Processing: "IostProcessing",
            Success: "Vec<u8>",
            Fail: "Failed",
        },
    },
    RewardRecord: {
        account_id: "AccountId",
        record_amount: "Balance"
    },
    Token: {
        symbol: "Vec<u8>",
        precision: "u16",
        totalSupply: "u128"
    },
    VersionId: "u32",
    IostBlockNumber: "i64",
    Action: {
        account: "AccountName",
        name: "ActionName",
        authorization: "Vec<PermissionLevel>",
        data: "Vec<u8>",
    },
    PermissionLevel: { actor: "AccountName", permission: "PermissionName" },
    PermissionName: "u64",
    ActionReceipt: {
        receiver: "AccountName",
        act_digest: "Checksum256",
        global_sequence: "u64",
        recv_sequence: "u64",
        auth_sequence: "FlatMap<AccountName, u64>",
        code_sequence: "UnsignedInt",
        abi_sequence: "UnsignedInt",
    },
    Checksum256: "([u8;32])",
    BlockchainType: { _enum: ["BIFROST", "EOS"] },
    Precision: "u32",
    BridgeAssetSymbol: {
        blockchain: "BlockchainType",
        symbol: "Vec<u8>",
        precision: "Precision",
    },
    ProducerSchedule: { version: "u32", producers: "Vec<ProducerKey>" },
    ProducerKey: { producer_name: "AccountName", block_signing_key: "PublicKey" },
    AccountName: "u64",
    ActionName: "u64",
    PublicKey: { type_: "UnsignedInt", data: "[u8;33]" },
    UnsignedInt: "u32",
    Signature: { type_: "UnsignedInt", data: "[u8;65]" },
    SignedBlockHeader: {
        block_header: "BlockHeader",
        producer_signature: "Signature",
    },
    BlockHeader: {
        timestamp: "BlockTimestamp",
        producer: "AccountName",
        confirmed: "u16",
        previous: "Checksum256",
        transaction_mroot: "Checksum256",
        action_mroot: "Checksum256",
        schedule_version: "u32",
        new_producers: "Option<ProducerSchedule>",
        header_extensions: "Vec<Extension>",
    },
    BlockTimestamp: "(u32)",
    Extension: "(u16, Vec<u8>)",
    IncrementalMerkle: { _node_count: "u64", _active_nodes: "Vec<Checksum256>" },
    FlatMap: { map: "Vec<(ActionName, u64)>" },
    TxSig: { signature: "Vec<u8>", author: "AccountId" },
    MultiSig: { signatures: "Vec<TxSig>", threshold: "u8" },
    MultiSigTx: {
        chain_id: "Vec<u8>",
        raw_tx: "Vec<u8>",
        multi_sig: "MultiSig",
        action: "Action",
        from: "AccountId",
        token_symbol: "TokenSymbol",
    },
    Processing: { tx_id: "Vec<u8>", multi_sig_tx: "MultiSigTx" },
    Fail: { tx_id: "Vec<u8>", reason: "Vec<u8>", tx: "MultiSigTx" },
    TxOut: {
        _enum: {
            Initial: "MultiSigTx",
            Generated: "MultiSigTx",
            Signed: "MultiSigTx",
            Processing: "Processing",
            Success: "Vec<u8>",
            Fail: "Fail",
        },
    },
    ConvertPrice: "u128",
    RatePerBlock: "u64",
    Fee: "u64",
    PoolId: "u32",
    Nonce: "u32",
    PoolDetails: {
        "owner": "AccountId",
        "swap_fee_rate": "Fee",
        "active": "bool"
    },
    PoolCreateTokenDetails: {
        "token_id": "AssetId",
        "token_balance": "Balance",
        "token_weight": "PoolWeight"
    },
    TokenPool: "Balance",
    VTokenPool: "Balance",
    InVariantPool: "Balance",
    TokenSymbol: {
        _enum: [
            "aUSD",
            "DOT",
            "vDOT",
            "KSM",
            "vKSM",
            "EOS",
            "vEOS",
            "IOST",
            "vIOST",
        ],
    },
    TrxStatus: {
        _enum: ["Initial", "Generated", "Signed", "Processing", "Success", "Fail"],
    },
    Cost: "u128",
    Income: "u128",
    Price: "u64",
    AccountAsset: {
        balance: "Balance",
        locked: "Balance",
        available: "Balance",
        cost: "Cost",
        income: "Income",
    },
    SpecIndex: "u32",
    RequestIdentifier: "u64",
    DataVersion: "u64",
    ConvertPool: {
        token_pool: "Balance",
        vtoken_pool: "Balance",
        current_reward: "Balance",
        pending_reward: "Balance",
    },
    ProducerAuthoritySchedule: {
        version: "u32",
        producers: "Vec<ProducerAuthority>",
    },
    ProducerAuthority: {
        producer_name: "ActionName",
        authority: "BlockSigningAuthority",
    },
    BlockSigningAuthority: "(UnsignedInt, BlockSigningAuthorityV0)",
    BlockSigningAuthorityV0: { threshold: "u32", keys: "Vec<KeyWeight>" },
    KeyWeight: { key: "PublicKey", weight: "u16" },
    InvariantValue: "Balance",
    PoolWeight: "Balance",
    AssetConfig: {
        redeem_duration: "BlockNumber",
        min_reward_per_block: "Balance",
    },
    ProxyValidatorRegister: {
        last_block: "BlockNumber",
        deposit: "Balance",
        need: "Balance",
        staking: "Balance",
        reward_per_block: "Balance",
        validator_address: "Vec<u8>",
    },
    BlockNumber: "u32",
};

export const BRIDGE_IOST = {
    proveAction: {
        description: "Prove action: verify block",
        params: [
            {
                name: "action",
                type: "IostAction",
            },
            {
                name: "trx_id",
                type: "Vec<u8>",
            },
            {
                name: "block_header",
                type: "BlockHead",
            },
            {
                name: "block_headers",
                type: "Vec<BlockHead>",
            },
        ],
        // type: "u128",
        isSubscription: false,
        jsonrpc: "bridgeIost_proveAction",
        method: "proveAction",
        section: "bridgeIost",
    },

    changeSchedule: {
        description: "Update epoll producer list",
        params: [
            {
                name: "bh",
                type: "BlockHead",
            },
            {
                name: "witness_headers",
                type: "Vec<BlockHead>",
            },
            {
                name: "producers",
                type: "Vec<Vec<u8>>",
            },
        ],
        // type: "u128",
        isSubscription: false,
        jsonrpc: "bridgeIost_changeSchedule",
        method: "changeSchedule",
        section: "bridgeIost",
    },


    initSchedule: {
        description: "Initial IOST producer list",
        params: [
            {
                name: "bn",
                type: "IostBlockNumber",
            },
            {
                name: "producers",
                type: "Vec<Vec<u8>>",
            },
            // {
        ],
        // type: "u128",
        isSubscription: false,
        jsonrpc: "bridgeIost_initSchedule",
        method: "initSchedule",
        section: "bridgeIost",
    }

};