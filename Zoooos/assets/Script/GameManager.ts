
import { _decorator, Component, Node, log, game, director } from 'cc';
const { ccclass, property } = _decorator;

import { Player } from "./Player";

@ccclass("GameManagerRuntime")
export class GameManagerRuntime
{
    private _players: Map<string, Player>;

    addPlayer(playerName: string, player: Player)
    {
        this._players.set(playerName, player);
    }

    removePlayer(playerName: string)
    {
        this._players.delete(playerName);
    }

    getPlayer(playerName: string): Player
    {
        return this._players[playerName];
    }

    clearPlayers()
    {
        this._players.clear();
    }
}

@ccclass("GameManager")
export class GameManager extends Component
{
    private _runtime : GameManagerRuntime;

    onLoad()
    {
        log("GameManagerComponent onLoad().");
    }

    start()
    {
        log("GameManagerComponent start().");
        game.addPersistRootNode(this.node);
        director.loadScene("Login");
    }

    update(deltaTime: number)
    {
        log("GameManagerComponent update().");
    }

    getGameRuntime() : GameManagerRuntime
    {
        return this._runtime;
    }

    updateScene()
    {
        
    }
}
