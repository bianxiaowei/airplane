
import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Bullet } from '../bullet/Bullet';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(Node)
    public playerPlane:Node = null;

    @property(Prefab)
    public bullet01:Prefab = null;

    @property(Prefab)
    public bullet02:Prefab = null;

    @property(Prefab)
    public bullet03:Prefab = null;

    @property(Prefab)
    public bullet04:Prefab = null;

    @property(Prefab)
    public bullet05:Prefab = null;

    @property
    public bulletSpeed = 1;

    @property
    public shootTime = 0.3;
    
    @property(Node)
    public bulletRoot:Node = null;

    private _currShootTime = 0;
    private _isShooting = false;

    start () {
        this._init();
    }

    private _init(){
        this._currShootTime = this.shootTime;
    }

    update (deltaTime: number) {
        //console.log(this._currShootTime);
        //console.log(this._isShooting);
        this._currShootTime += deltaTime;
        if(this._currShootTime>this.shootTime&&this._isShooting){
            this.createPlayerBullet();
            this._currShootTime = 0;
        }
    }

    public isShooting(value:boolean){
        this._isShooting = value;
    }

    public createPlayerBullet(){
        //console.log("create");
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this.bulletRoot);
        const pos = this.playerPlane.position;
        //console.log(pos);
        bullet.setPosition(pos.x, pos.y, pos.z - 7);
        const bulletCom = bullet.getComponent(Bullet);
        bulletCom.bulletSpeed = this.bulletSpeed;
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
