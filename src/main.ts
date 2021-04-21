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

    const keyring = new Keyring({ type: "sr25519" });
    const alice = keyring.addFromUri("//Alice", { name: "Alice default" });
    
    const reader = new IostActionReader({
        startAtBlock: 0,
        onlyIrreversible: false,
        iostEndpoint: "https://api.iost.io",
    });

    let init_block: number = 102492000;

    let raw = await getIOSTRawBlock(reader, init_block);
    let p = parse_producers(raw);
    await initSchedule(api, alice, init_block, p);


    let start_block_number = init_block + 1200;
    let raw_block = await getIOSTRawBlock(reader, start_block_number);
    let producers = parse_producers(raw_block);

    // let raw_block_verify = await getIOSTRawBlock(reader, start_block_number + 1);
    let block = parse_block_head(raw_block);
    
    let block_headers: any[] = []
    
    for (let i = 1; i < 109; i++) { 
        let raw_b = await getIOSTRawBlock(reader, start_block_number + i);
        block_headers.push(parse_block_head(raw_b));
    }

    await changeSchedule(api, alice, block, block_headers, producers);
    
    let trx_id = "9aWt5TqPo22wXLY1t5RRQgn3ZiCM7k1pSrMYqQ2EC3mg";
    // let trx_id = "2";

    await proveAction(api, alice, {
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

async function initSchedule(api, alice, blockNumber: number, producers: string[]) {
    // console.log(producers)

    // const keyring = new Keyring({ type: "sr25519" });
    // const alice = keyring.addFromUri("//Alice", { name: "Alice default" });
    const result = await api.tx.bridgeIost
        .initSchedule(blockNumber, producers)
        .signAndSend(alice);
    console.log("Execute initSchedule result:", u8aToHex(result))
}

async function changeSchedule(api, alice: any, block: any, block_headers: any[],  producers: string[]) {
    // console.log("Calling changeSchedule:")
    
    const result = await api.tx.bridgeIost
        .changeSchedule(block, block_headers, producers)
        .signAndSend(alice);
    
    console.log("Execute changeSchedule result:", u8aToHex(result))
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

function parse_producers(raw_block: any) {
    let producers: string[] = [];
    for (const tx_receipt of raw_block.receipts) {
        for (const receipt of tx_receipt.receipts) {
            if (receipt.funcName == "vote_producer.iost/stat") {
                let content = JSON.parse(receipt.content);
                for (const producer of content.pendingList) {
                    // console.log(stringToHex(producer));
                    producers.push(String(producer));

                }
            }   
        }
    }
    return producers;
}

async function proveAction(api, alice, iostAction: any, trx_id: string, head: any, headers: any[]) {
    console.log(headers.length)
    console.log(headers[1])

    // const keyring = new Keyring({ type: "sr25519" });
    // const alice = keyring.addFromUri("//Alice", { name: "Alice default" });

    const result = await api.tx.bridgeIost
        .proveAction(iostAction, trx_id, head, headers)
        .signAndSend(alice);
    
    console.log("Execute proveAction result:", u8aToHex(result))
}

main()
    .catch(e => {
        throw e;
    })
