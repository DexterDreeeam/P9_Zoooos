
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { Player, PlayerRuntime, PlayerType } from "../Player";

@ccclass("Elepphant")
export class Elepphant extends Player
{
    onLoad()
    {
        this._runtime = new PlayerRuntime();

        this._runtime._player_name = "player";
        this._runtime._player_speed = 40;
        this._runtime._player_type = PlayerType.Elephant;
    }
}
