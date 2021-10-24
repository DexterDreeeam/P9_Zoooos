
import { _decorator, Component, Node, resources, Prefab, log, loader, assetManager } from 'cc';
const { ccclass, property } = _decorator;

import { PlayerRuntime, Player, PlayerType } from './Player';

@ccclass("PlayerBuilder")
export class PlayerBuilder extends Component
{
    @property(
        { type: Prefab }
    )
    elephant_prefab: Prefab = null!;

    @property(
        { type: Prefab }
    )
    monkey_prefab: Prefab = null!;

    @property(
        { type: Prefab }
    )
    fox_prefab: Prefab = null!;

    build_player(playerRuntime: PlayerRuntime, cb: (node: Node) => void): void
    {
        let prefab: Prefab = null!;
        switch (playerRuntime._player_type)
        {
        case PlayerType.Elephant:
            prefab = this.elephant_prefab;
            break;
        case PlayerType.Monkey:
            prefab = this.monkey_prefab;
            break;
        case PlayerType.Fox:
            prefab = this.fox_prefab;
            break;
        }

        prefab.createNode(
            function(err, nod): void
            {
                log(err);
                nod.addComponent(Player);
                let player = nod.getComponent(Player) as Player;
                player.set_runtime(playerRuntime);

                playerRuntime._player_node = nod;
                playerRuntime._player_component = player;
                cb(nod);
            }
        );
    }
}
