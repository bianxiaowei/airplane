
import { _decorator, Component, Node, systemEvent, SystemEvent, EventTouch,Touch, Collider, ITriggerEvent } from 'cc';
import { Constant } from '../frameworker/Constant';
const { ccclass, property } = _decorator;

@ccclass('SelfPlane')
export class SelfPlane extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
   

    start () {
        // [3]
       
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
        const collisionGroup = event.otherCollider.getGroup();
        if(collisionGroup === Constant.CollisionType.ENEMY_PLANE|| collisionGroup === Constant.CollisionType.ENEMY_BULLET){
            console.log("掉血");
        }
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
