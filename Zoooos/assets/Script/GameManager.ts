
import { _decorator, Component, Node, log, game, director, Scene, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

import { Player, PlayerRuntime } from "./Player";
import { PlayerBuilder } from './PlayerBuilder';

@ccclass("GameManagerRuntime")
export class GameManagerRuntime
{
    private _playerBuilder: PlayerBuilder = new PlayerBuilder();
    private _firstPlayer: PlayerRuntime | null;
    private _players: Map<string, PlayerRuntime> = new Map<string, PlayerRuntime>();

    add_player(playerName: string, player: PlayerRuntime)
    {
        this._players.set(playerName, player);
    }

    assign_first_player(player: PlayerRuntime)
    {
        this._firstPlayer = player;
    }

    remove_player(playerName: string)
    {
        this._players.delete(playerName);
    }

    get_player(playerName: string): PlayerRuntime
    {
        return this._players[playerName];
    }

    get_first_player(): PlayerRuntime
    {
        return this._firstPlayer;
    }

    clear_players()
    {
        this._players.clear();
    }
}

@ccclass("GameManager")
export class GameManager extends Component
{
    private _player_builder: PlayerBuilder = null!;
    private _runtime: GameManagerRuntime = new GameManagerRuntime();

    getGameRuntime(): GameManagerRuntime
    {
        return this._runtime;
    }

    login_to_gamemap(player: PlayerRuntime): void
    {
        this._runtime.clear_players();
        this._runtime.add_player("player", player);
        this._runtime.assign_first_player(player);
        director.loadScene("GameMap",
            function(err, scene: Scene)
            {
                scene.getChildByName("GameManager").getComponent(GameManager).build_player(
                    player,
                    function(node: Node)
                    {
                        scene.getChildByName("Canvas").getChildByName("Background").addChild(node);
                        node.setPosition(new Vec3(100, 100, 0));
                    });
            });
    }

    build_player(player: PlayerRuntime, cb: (node: Node) => void): void
    {
        this._player_builder.build_player(player, cb);
    }

    input_first_player_direction(x_delta: number, y_delta: number)
    {
        this._runtime.get_first_player()._player_component.input_direction(x_delta, y_delta);
    }

    onLoad()
    {
        log("GameManagerComponent onLoad().");
        this._player_builder = this.node.getComponent(PlayerBuilder);
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
}
