
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

const OUTOFRANGE = 50;
@ccclass('Bullet')
export class Bullet extends Component {
    // [1]
    // dummy = '';

    // [2]
    private _bulletSpeed = 0;

    private _isEnemyBullet = false;

    start () {
        // [3]
    }

    update (deltaTime: number) {
        // [4]
        const pos = this.node.position;
        let movePos = 0;
        if(this._isEnemyBullet){
            movePos = pos.z + this._bulletSpeed;
            this.node.setPosition(pos.x,pos.y,movePos)
            if(movePos>OUTOFRANGE){
                this.node.destroy();
                //console.log("bullet destory");
            }
        }else{
            movePos = pos.z - this._bulletSpeed;
            this.node.setPosition(pos.x,pos.y,movePos)
            if(movePos<-OUTOFRANGE){
                this.node.destroy();
                //console.log("bullet destory");
            }
        }
         
        
    }

    public show(bulletSpeed:number,isEnemyBullet:boolean){
        //console.log("bulletSpeed "+bulletSpeed);
        this._bulletSpeed = bulletSpeed;
        this._isEnemyBullet = isEnemyBullet;
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
