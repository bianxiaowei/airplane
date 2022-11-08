
import { _decorator, Component, Node, systemEvent, SystemEvent, EventTouch,Touch  } from 'cc';
import { GameManager } from '../frameworker/GameManager';
const { ccclass, property } = _decorator;

@ccclass('UiMain')
export class UiMain extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property
    private planeSpreed = 5;

    @property(Node)
    private playerPlane:Node = null

    @property(GameManager)
    private gameManager:GameManager = null;

    start () {
        // [3]
        this.node.on(SystemEvent.EventType.TOUCH_MOVE,this._touchMove,this)
        this.node.on(SystemEvent.EventType.TOUCH_START,this._touchStart,this)
        this.node.on(SystemEvent.EventType.TOUCH_END,this._touchEnd,this)
    }

    _touchMove(touch:Touch,event:EventTouch) {
        const delta = touch.getDelta();
        let pos = this.playerPlane.position;
        this.playerPlane.setPosition(pos.x + 0.01 * this.planeSpreed * delta.x, pos.y, pos.z - 0.01 * this.planeSpreed * delta.y);
    }

    _touchStart(touch:Touch,event:EventTouch) {
        this.gameManager.isShooting(true)
    }

    _touchEnd(touch:Touch,event:EventTouch) {
        this.gameManager.isShooting(false)
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
