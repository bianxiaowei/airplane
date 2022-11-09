
import { _decorator, Component, Node } from 'cc';
import { Constant } from '../frameworker/Constant';
import { GameManager } from '../frameworker/GameManager';
const { ccclass, property } = _decorator;

const OUTOFRANGE = 50;
@ccclass('EnemyPlane')
export class EnemyPlane extends Component {
    // [1]
    // dummy = '';
    private _enemySpreed = 1;

    private _needBullet = false;

    @property
    public createBulletTime = 1;

    private  _gameManager:GameManager = null;

    private _currCreateBulletTime = 0;

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
    }

    update (deltaTime: number) {
        const pos = this.node.position;
        this.node.setPosition(pos.x,pos.y,pos.z+this._enemySpreed)
        if(this.node.position.z>OUTOFRANGE){
            this.node.destroy();
            //console.log("enemy destory");
        }
        this._currCreateBulletTime += deltaTime;
        if(this._currCreateBulletTime>this.createBulletTime&&this._needBullet == true){
            this._gameManager.createEnemyBullet(this.node.position);
            this._currCreateBulletTime = 0;
        }
    }
    
    public show(gameManager:GameManager,speed:number,needBullet:boolean){
        this._gameManager = gameManager;
        this._enemySpreed = speed;
        this._needBullet = needBullet;
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
