class Block {
    public head;
    public state: number;
    public blockNumber: number;
    constructor(block: any) {
        this.head = block.head;
        this.blockNumber = block.number;
        this.state = 0;
    }
    sayHi() {
        return `My name is ${this.head}`;
    }
}

class BridgeBlock {
    public blockNumber: number
    public block;
    constructor(blockNumber: number, block: Block) {
        this.blockNumber = blockNumber;
        this.block = block;
    }
}
const BLOCK_COUNT: number = 108;

let bridge_prove_action_index: any[];
let bridge_change_schedule_index: any[];
let bridge_blocks: BridgeBlock[];

function irreversible_block(block) {
    let block_index_max_size = 512
    if (bridge_prove_action_index.length >= block_index_max_size) {
        // if (prove_action_index.begin()->status == 2) prove_action_index.erase(prove_action_index.begin());
     }

     if (bridge_change_schedule_index.length >= block_index_max_size) {

     }

     if (bridge_blocks.length >= block_index_max_size) {

     }

     bridge_blocks.push(new BridgeBlock(block.head.number, block))
    

     if (block.head.number / 1200 == 0) {

     }

}
