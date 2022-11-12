
import { _decorator, Component, Node, Prefab, instantiate, math, Vec3, macro } from 'cc';
import { Bullet } from '../bullet/Bullet';
import { BulletProp } from '../bullet/BulletProp';
import { EnemyPlane } from '../plane/EnemyPlane';
import { SelfPlane } from '../plane/SelfPlane';
import { Constant } from './Constant';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(SelfPlane)
    public playerPlane:SelfPlane = null;

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

    @property(Prefab)
    public enemy01:Prefab = null;

    @property(Prefab)
    public enemy02:Prefab = null;

    @property(Prefab)
    public bulletPropH:Prefab = null;

    @property(Prefab)
    public bulletPropS:Prefab = null;

    @property(Prefab)
    public bulletPropM:Prefab = null;

    @property
    public bulletSpeed = 0.5;

    @property
    public shootTime = 0.3;

    @property
    public createEnemyTime = 5;

    @property
    public enemy01Speed = 0.1;

    @property
    public enemy02Speed = 0.1;
    
    @property(Node)
    public bulletRoot:Node = null;

    @property 
    public propSpeed = 0.3;

    private _currShootTime = 0;
    private _isShooting = false;
    private _currentCreateEnemyTime = 0;
    private _combinationInterval = Constant.Combination.PLAN1;
    private _bulletType = Constant.BulletPropType.BULLET_M;

    start () {
        this._init();
    }

    private _init(){
        this._currShootTime = this.shootTime;
        //console.log(this._combinationInterval);
        this.schedule(this._modeChange,10,macro.REPEAT_FOREVER);
    }

    private _modeChange(){
        this._combinationInterval ++ ;
        this._createBulletProp();
        //console.log(this._combinationInterval);
    }

    private _createBulletProp(){
        const typeRandom = math.randomRangeInt(1,4);
        //this._bulletType = typeRandom;
        let prefab:Prefab = null;
        if(typeRandom === Constant.BulletPropType.BULLET_H){
            prefab = this.bulletPropH;
        }else if(typeRandom === Constant.BulletPropType.BULLET_S){
            prefab = this.bulletPropS;
        }else{
            prefab = this.bulletPropM;
        }
        const prop = instantiate(prefab);
        prop.setParent(this.node);
        const propCom = prop.getComponent(BulletProp);
        propCom.show(this,this.propSpeed);
        prop.setPosition(15,0,-50);
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                
    update (deltaTime: number) {
        //console.log(this._combinationInterval);
        //console.log(this._currShootTime);
        //console.log(this._isShooting);
        this._currShootTime += deltaTime;
        this._currentCreateEnemyTime += deltaTime;
        if(this._currShootTime>this.shootTime&&this._isShooting){
            if(this._bulletType === Constant.BulletPropType.BULLET_H){
                this.createPlayerBulletH();
            }else if(this._bulletType === Constant.BulletPropType.BULLET_S){
                this.createPlayerBulletS();
            }else{
                this.createPlayerBulletM();
            }
           
            this._currShootTime = 0;
        }
        if(this._combinationInterval === Constant.Combination.PLAN1){
            this._currentCreateEnemyTime += deltaTime;
            if(this._currentCreateEnemyTime>this.createEnemyTime){
                this._createEnemyPlan();
                this._currentCreateEnemyTime = 0;
            }
        }else if(this._combinationInterval === Constant.Combination.PLAN2){
            if(this._currentCreateEnemyTime>this.createEnemyTime){
                const planConst = math.randomRangeInt(1,3);
                console.log("planConst" +planConst);
                if(planConst == Constant.Combination.PLAN2){
                    this._createEnemyPlan2();
                }else{
                    this._createEnemyPlan();
                }
                this._currentCreateEnemyTime = 0;
            }
        }else if(this._combinationInterval >= Constant.Combination.PLAN3){
            if(this._currentCreateEnemyTime>this.createEnemyTime){
                const planConst = math.randomRangeInt(1,4);
                console.log("planConst" +planConst);
                if(planConst == Constant.Combination.PLAN2){
                    this._createEnemyPlan2();
                }else if(planConst == Constant.Combination.PLAN3){
                    this._createEnemyPlan3();
                }else{
                    this._createEnemyPlan();
                }
                this._currentCreateEnemyTime = 0;
            }
        }
    }

    private _createEnemyPlan(){
        const whichEnemy = math.randomRangeInt(1,3);
        let prefab:Prefab = null;
        let speed = 0;
        if(whichEnemy == Constant.EnemyType.TYPE1){
            prefab = this.enemy01;
            speed = this.enemy01Speed
        }else{
            prefab = this.enemy02;
            speed = this.enemy02Speed
        }
        const enemy = instantiate(prefab);
        enemy.setParent(this.node);
        const enemyCom = enemy.getComponent(EnemyPlane);
        enemyCom.show(this,speed,true);
        const randomPos = math.randomRangeInt(-25,25);
        enemy.setPosition(randomPos,0,-50);
    }

    private _createEnemyPlan2(){
        const enemyArray = new Array<Node>(5);
        for (let index = 0; index < enemyArray.length; index++) {
            const element = enemyArray[index];
            const enemy = instantiate(this.enemy01);
            enemy.setParent(this.node);
            const enemyCom = enemy.getComponent(EnemyPlane);
            enemyCom.show(this,this.enemy01Speed*0.6,false);
            enemy.setPosition(-20+index*10,0,-50);
        }
    }

    private _createEnemyPlan3(){
        const posArray = [
            -21,0,-60,
            -14,0,-55,
            -7,0,-50,
            0,0,-45,
            7,0,-50,
            14,0,-55,
            21,0,-60
        ]
        const enemyArray = new Array<Node>(7);
        for (let index = 0; index < enemyArray.length; index++) {
            const element = enemyArray[index];
            const enemy = instantiate(this.enemy02);
            enemy.setParent(this.node);
            const enemyCom = enemy.getComponent(EnemyPlane);
            enemyCom.show(this,this.enemy02Speed*0.5,false);
            const startIndex = index*3;
            enemy.setPosition(posArray[startIndex],posArray[startIndex+1],posArray[startIndex+2]);
        }
    }

    public isShooting(value:boolean){
        this._isShooting = value;
    }

    public createPlayerBulletM(){
        //console.log("create");
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this.bulletRoot);
        const pos = this.playerPlane.node.position;
        //console.log(pos);
        bullet.setPosition(pos.x, pos.y, pos.z - 7);
        const bulletCom = bullet.getComponent(Bullet);
        bulletCom.show(this.bulletSpeed,false);
    }

    public createPlayerBulletH(){
        const pos = this.playerPlane.node.position;
        //console.log("create");
        const bullet = instantiate(this.bullet03);
        bullet.setParent(this.bulletRoot);
        //console.log(pos);
        bullet.setPosition(pos.x+2.5, pos.y, pos.z - 7);
        const bulletCom = bullet.getComponent(Bullet);
        bulletCom.show(this.bulletSpeed,false);

        const bullet2 = instantiate(this.bullet03);
        bullet2.setParent(this.bulletRoot);
        //console.log(pos);
        bullet2.setPosition(pos.x-2.5, pos.y, pos.z - 7);
        const bulletCom2 = bullet2.getComponent(Bullet);
        bulletCom2.show(this.bulletSpeed,false);
    }

    public createPlayerBulletS(){
        const pos = this.playerPlane.node.position;
        //console.log("create");
        const bullet1 = instantiate(this.bullet05);
        bullet1.setParent(this.bulletRoot);
        //console.log(pos);
        bullet1.setPosition(pos.x, pos.y, pos.z - 7);
        const bulletCom1 = bullet1.getComponent(Bullet);
        bulletCom1.show(this.bulletSpeed,false);

        const bullet2 = instantiate(this.bullet05);
        bullet2.setParent(this.bulletRoot);
        //console.log(pos);
        bullet2.setPosition(pos.x+4, pos.y, pos.z - 7);
        const bulletCom2 = bullet2.getComponent(Bullet);
        bulletCom2.show(this.bulletSpeed,false,Constant.Direction.RIGHT);

        const bullet3 = instantiate(this.bullet05);
        bullet3.setParent(this.bulletRoot);
        //console.log(pos);
        bullet3.setPosition(pos.x-4, pos.y, pos.z - 7);
        const bulletCom3 = bullet3.getComponent(Bullet);
        bulletCom3.show(this.bulletSpeed,false,Constant.Direction.LEFT);
    }

    public createEnemyBullet(targetPosition:Vec3){
        const bullet = instantiate(this.bullet02);
        bullet.setParent(this.bulletRoot);
        bullet.setPosition(targetPosition.x, targetPosition.y, targetPosition.z + 1);
        const bulletCom = bullet.getComponent(Bullet);
        bulletCom.show(0.5,true);
    }

    public changeBulletType(type:number){
        this._bulletType = type;
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
