
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MovingBg')
export class MovingBg extends Component {
    @property(Node)
    bg01:Node = null;
    @property(Node)
    bg02:Node = null;

    private _bgSpeed = 10;
    private _bgMovingRange = 90;
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    private _init(){
        this.bg01.setPosition(0,0,0);
        this.bg02.setPosition(0,0,-this._bgMovingRange);
    }

    start () {
        // [3]
        this._init();
    }

    update (deltaTime: number) {
        // [4]
        this._MovingBackgroud(deltaTime);
    }

    private _MovingBackgroud(deltaTime: number){
        this.bg01.setPosition(0,0,this.bg01.position.z+deltaTime*this._bgSpeed)
        this.bg02.setPosition(0,0,this.bg02.position.z+deltaTime*this._bgSpeed)
        if(this.bg01.position.z > this._bgMovingRange){
            this.bg01.setPosition(0,0,this.bg02.position.z-this._bgMovingRange);
        }else if(this.bg02.position.z > this._bgMovingRange){
            this.bg02.setPosition(0,0,this.bg01.position.z-this._bgMovingRange);
        }
    }
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
