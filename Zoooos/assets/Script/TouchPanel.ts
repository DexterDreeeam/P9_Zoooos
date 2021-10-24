
import { _decorator, Component, Node, Event, Touch, EventTouch, math } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;
 
@ccclass('TouchPanel')
export class TouchPanel extends Component
{
    private _game_manager: GameManager | null;
    private _x_origin: number;
    private _y_origin: number;

    on_touch_start(event: EventTouch)
    {
        this._x_origin = event.getLocationX();
        this._y_origin = event.getLocationY();
    }

    on_touch_move(event: EventTouch)
    {
        let x: number = event.getLocationX();
        let y: number = event.getLocationY();
        let x_delta = x - this._x_origin;
        let y_delta = y - this._y_origin;
        let squre_sum = x_delta * x_delta + y_delta * y_delta;
        if (squre_sum > 150)
        {
            this._game_manager.input_first_player_direction(x_delta, y_delta);
        }
    }

    onLoad()
    {
        let root: Node = this.node;
        while (root.getParent() != null)
        {
            root = root.getParent();
        }
        this._game_manager = root.getChildByName("GameManager").getComponent("GameManager") as GameManager;
    }

    start()
    {
        this.node.on(Node.EventType.TOUCH_START, this.on_touch_start, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
    }
}
