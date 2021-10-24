
import { _decorator, Component, Node, ccenum, log, Vec3, animation, math } from 'cc';
const { ccclass, property } = _decorator;

import { GameManagerRuntime, GameManager } from './GameManager';

export enum PlayerType
{
    Elephant,
    Monkey,
    Fox,
    Dear,
    Dog
}

@ccclass("PlayerRuntime")
export class PlayerRuntime
{
    public _player_name: string = "myname";
    public _player_type: PlayerType;
    public _player_speed: number;

    public _player_node: Node | null = null;
    public _player_component: Player | null = null;
    public _current_position: Vec3 = new Vec3();
    public _target_position: Vec3 = new Vec3();
}

@ccclass("Player")
export class Player extends Component
{
    protected _runtime: PlayerRuntime;
    private _game_manager: GameManager | null;

    set_runtime(runtime: PlayerRuntime)
    {
        this._runtime = runtime;
    }

    get_game_manager(): GameManager
    {
        if (this._game_manager != null)
        {
            return this._game_manager;
        }
        let root: Node = this.node;
        while (root.getParent() != null)
        {
            root = root.getParent();
        }
        this._game_manager = root.getChildByName("GameManager").getComponent("GameManager") as GameManager;
        return this._game_manager;
    }

    login_to_gamemap()
    {
        this.get_game_manager().login_to_gamemap(this._runtime);
    }

    input_direction(x_delta: number, y_delta: number)
    {
        log("Player input direction, x_delta: ", x_delta, " y_delta: ", y_delta);
        let sq: number = x_delta * x_delta + y_delta * y_delta;
        let sqrt: number = Math.sqrt(sq);
        let factor: number = this._runtime._player_speed * 0.2 / sqrt;
        Vec3.add(this._runtime._target_position, this._runtime._current_position, new Vec3(x_delta * factor, y_delta * factor, 0));
    }

    update(dt: number)
    {
        this._runtime._current_position = this.node.getPosition();
        let delta_vec: Vec3 = new Vec3(0, 0, 0);
        Vec3.subtract(delta_vec, this._runtime._target_position, this._runtime._current_position);
        if (delta_vec != new Vec3(0, 0, 0))
        {
            let max_move_distance = dt * this._runtime._player_speed;
            let sq: number = delta_vec.x * delta_vec.x + delta_vec.y * delta_vec.y;
            let sqrt: number = Math.sqrt(sq);
            let move: number = Math.min(sqrt, max_move_distance);
            let x_move: number = delta_vec.x * move / sqrt;
            let y_move: number = delta_vec.y * move / sqrt;
            Vec3.add(this._runtime._current_position, this._runtime._current_position, new Vec3(x_move, y_move, 0));
            this.node.setPosition(this._runtime._current_position);
        }
    }
}
