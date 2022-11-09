
import { _decorator, Component, Node, Prefab, instantiate, math, Vec3 } from 'cc';
import { Bullet } from '../bullet/Bullet';
import { EnemyPlane } from '../plane/EnemyPlane';
import { Constant } from './Constant';
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

    @property(Prefab)
    public enemy01:Prefab = null;

    @property(Prefab)
    public enemy02:Prefab = null;

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

    private _currShootTime = 0;
    private _isShooting = false;
    private _currentCreateEnemyTime = 0;
    private _combinationInterval = Constant.Combination.PLAN1;

    start () {
        this._init();
    }

    private _init(){
        this._currShootTime = this.shootTime;
        //console.log(this._combinationInterval);
        this.schedule(this._modeChange,10,3);
    }

    private _modeChange(){
        this._combinationInterval ++ ;
        //console.log(this._combinationInterval);
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                
    update (deltaTime: number) {
        //console.log(this._combinationInterval);
        //console.log(this._currShootTime);
        //console.log(this._isShooting);
        this._currShootTime += deltaTime;
        this._currentCreateEnemyTime += deltaTime;
        if(this._currShootTime>this.shootTime&&this._isShooting){
            this.createPlayerBullet();
            this._currShootTime = 0;
        }
        if(this._combinationInterval === Constant.Combination.PLAN1){
            this._currentCreateEnemyTime += deltaTime;
            if(this._currentCreateEnemyTime>this.createEnemyTime){
                this._createEnemyPlan();
                this._currentCreateEnemyTime = 0;
            }
        }else if(this._combinationInterval === Constant.Combination.PLAN2){
            if(this._currentCreateEnemyTime>this.createEnemyTime*2){
                const planConst = math.randomRangeInt(1,3);
                if(planConst == Constant.Combination.PLAN2){
                    this._createEnemyPlan2();
                }else{
                    this._createEnemyPlan();
                }
                this._currentCreateEnemyTime = 0;
            }
        }else if(this._combinationInterval === Constant.Combination.PLAN3){
            if(this._currentCreateEnemyTime>this.createEnemyTime*2){
                const planConst = math.randomRangeInt(1,4);
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

    public createPlayerBullet(){
        //console.log("create");
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this.bulletRoot);
        const pos = this.playerPlane.position;
        //console.log(pos);
        bullet.setPosition(pos.x, pos.y, pos.z - 7);
        const bulletCom = bullet.getComponent(Bullet);
        bulletCom.show(this.bulletSpeed,false);
    }

    public createEnemyBullet(targetPosition:Vec3){
        const bullet = instantiate(this.bullet02);
        bullet.setParent(this.bulletRoot);
        bullet.setPosition(targetPosition.x, targetPosition.y, targetPosition.z + 1);
        const bulletCom = bullet.getComponent(Bullet);
        bulletCom.show(0.5,true);
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
