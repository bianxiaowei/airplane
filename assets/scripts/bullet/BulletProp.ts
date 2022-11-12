
import { _decorator, Component, Node, Collider, ITriggerEvent } from 'cc';
import { Constant } from '../frameworker/Constant';
import { GameManager } from '../frameworker/GameManager';
const { ccclass, property } = _decorator;

const OUTOFRANGE = 50;
@ccclass('BulletProp')
export class BulletProp extends Component {
    private _propSpeed = 0.3;

    private _propXSpeed = 0.3;

    private _gameManage:GameManager = null;

    start () {
        // [3]
    }

    update (deltaTime: number) {
        // [4]
        let pos = this.node.position;
        if(pos.x>15){
            this._propXSpeed = -this._propSpeed;
        } else if(pos.x<-15){
            this._propXSpeed = this._propSpeed;
        }
        this.node.setPosition(pos.x+this._propXSpeed,pos.y,pos.z+this._propSpeed);
        pos = this.node.position;
        if(pos.z>OUTOFRANGE){
            this.node.destroy();
            console.log("bulletProp destory");
        }
        
    }

    public show(gameManager:GameManager,propSpeed:number){
        this._gameManage = gameManager;
        this._propSpeed = propSpeed;
    }

    onEnable(){
        const collider = this.getComponent(Collider);
        collider.on("onTriggerEnter",this._onTriggerEnter,this);
    }

    onDisable(){
        const collider = this.getComponent(Collider);
        collider.off("onTriggerEnter",this._onTriggerEnter,this);
    }

    private _onTriggerEnter(event:ITriggerEvent) {
        const propName = event.selfCollider.node.name
        if(propName === "bulletS"){
            this._gameManage.changeBulletType(Constant.BulletPropType.BULLET_S)
        } else if(propName === "bulletH"){
            this._gameManage.changeBulletType(Constant.BulletPropType.BULLET_H)
        }else{
            this._gameManage.changeBulletType(Constant.BulletPropType.BULLET_M)
        }
        this.node.destroy();
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
