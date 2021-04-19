// import IOST = require('iost')
import { IOST_TYPES, BRIDGE_IOST } from './type';

const { ApiPromise } = require("@polkadot/api");
const { WsProvider } = require("@polkadot/rpc-provider");
const { Keyring } = require("@polkadot/keyring");
const { stringToU8a, u8aToHex, stringToHex } = require("@polkadot/util");

const { IostActionReader } = require("/Users/qiannan/workspace/blockchain/demux-js-iost/dist/readers");



async function main() {
    
    const provider = new WsProvider("ws://127.0.0.1:9944");
    // const api = await new ApiPromise(options({ provider }));
    const api = await ApiPromise.create({
        provider: provider,
        types: IOST_TYPES,
        rpc: {
            bridgeIost: BRIDGE_IOST,
        },
    });
    await api.isReady;

    
    const reader = new IostActionReader({
        startAtBlock: 0,
        onlyIrreversible: false,
        iostEndpoint: "https://api.iost.io",
    });

    let start_block_number: number = 102492000
    // let producers: string[] = [];
    // let raw_block = await getIOSTRawBlock(reader, start_block_number);
    // // console.log(parse_block_head(raw_block))
    // for (const tx_receipt of raw_block.receipts) {
    //     for (const receipt of tx_receipt.receipts) {
    //         if (receipt.funcName == "vote_producer.iost/stat") {
    //             let content = JSON.parse(receipt.content);
    //             for (const producer of content.pendingList) {
    //                 console.log(stringToHex(producer));
    //                 producers.push(String(producer));

    //             }
    //         }   
    //     }
    // }

    // await initSchedule(api, start_block_number, producers);

    let raw_block_verify = await getIOSTRawBlock(reader, start_block_number + 1);
    let block = parse_block_head(raw_block_verify);
    
    let block_headers: any[] = []
    
    for (let i = 2; i < 10; i++) { 
        let raw_b = await getIOSTRawBlock(reader, start_block_number + i);
        block_headers.push(parse_block_head(raw_b));
    }

    // console.log(api.genesisHash.toHex());
    // let trx_id = "9aWt5TqPo22wXLY1t5RRQgn3ZiCM7k1pSrMYqQ2EC3mg";
    let trx_id = "2";

    await proveAction(api, {
        contract: "token.iost",

        action_name: "transfer",
        data:
            '["iost","lispczz5","bifrost","1","5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY@bifrost:IOST"]',
    }, trx_id, block, block_headers);
}

async function getIOSTRawBlock(reader: any, blockNumber: number) {
    let blockInfo = await reader.getRawBlock(blockNumber);
    return blockInfo.data.block;
}

async function initSchedule(api, blockNumber: number, producers: string[]) {
    // console.log(producers)

    const keyring = new Keyring({ type: "sr25519" });
    const alice = keyring.addFromUri("//Alice", { name: "Alice default" });
    const result = await api.tx.bridgeIost
        .initSchedule(blockNumber, producers)
        .signAndSend(alice);
    console.log("Execute initSchedule result:", u8aToHex(result))
}

function parse_block_head(block: any) {
    let b = {
        version: Number(block.head.version),
        parent_hash: block.head.parentHash,
        tx_merkle_hash: block.head.txMerkleHash,
        tx_receipt_merkle_hash: block.head.txReceiptMerkleHash,
        info: block.head.info,
        number: Number(block.head.number),
        witness: block.head.witness,
        time: block.head.time,
        algorithm: Number(block.sign.algorithm),
        sig: block.sign.sig,
        pug_key: block.sign.pubKey,
        hash: ''
    }

    // console.log(b)
    return b
}

async function proveAction(api, iostAction: any, trx_id: string, head: any, headers: any[]) {
    console.log(headers.length)
    console.log(headers[1])

    const keyring = new Keyring({ type: "sr25519" });
    // const keyring = new Keyring({ type: 'ed25519' });
    const alice = keyring.addFromUri("//Alice", { name: "Alice default" });

    const result = await api.tx.bridgeIost
        .proveAction(iostAction, trx_id, head, headers)
        .signAndSend(alice);
    
    console.log("Execute proveAction result:", u8aToHex(result))
}

main()
    .catch(e => {
        throw e;
    })
