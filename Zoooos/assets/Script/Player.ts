
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { GameManagerRuntime, GameManager } from './GameManager';

@ccclass("PlayerRuntime")
export class PlayerRuntime
{
    public _position;
}

@ccclass("Player")
export class Player extends Component
{
    private _runtime: PlayerRuntime;

    getGameManagerRuntime(): GameManager
    {
        let root: Node = this.node;
        while (root.getParent() != null)
        {
            root = root.getParent();
        }
        return root.getChildByName("GameManager").getComponent("GameManager") as GameManager;
    }
}
