import boom from "./boomset";
import noboom from "./noboomset";

export default class Mine extends Laya.Script {

    static instance: Mine;

    /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
    public intType: number = 1000;
    /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
    public numType: number = 1000;
    /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
    public strType: string = "hello laya";
    /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
    public boolType: boolean = true;
    // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0


    /** @prop {name:noboom,tips:"空格",type:Prefab}*/
    noboom: Laya.Prefab;
    /** @prop {name:boom,tips:"炸彈",type:Prefab}*/
    boom: Laya.Prefab;

    private nobo: noboom;


    private _gameBox: Laya.Image;
    constructor() {
        super();
        Mine.instance = this;
    }

    /** @prop {name:howmany , tips:"要幾乘幾", type:Int, default:3}*/
    public howmany: number = 3;
    private m_x: number = 50
    private down_y = 1;
    private m_y: number = 30
    boomtotal: number = 1

    public isboom: number[] = [];
    private str: number = 0;
    public isover : boolean = false;

    /** @prop {name:howmanyboom, tips:"要幾顆炸彈", type:Int, default:5}*/
    public howmanyboom: number = 5;

    onEnable(): void {
       this.isover = false;
        //console.log(this);

        //this._gameBox = this.owner.getChildByName("gameBox") as Laya.Image;

        // for (let x = 0; x < this.howmany; x++) {
        //     this.isboom.push(Math.round(Math.random() * (this.howmany * this.howmany)));
        // }
        // 10個

        //var str='';
        //var arr=[];
        for (let x = 0; x < this.howmanyboom; x++) {
            this.str = Math.round(Math.random() * this.howmany * this.howmany);
            for (let y = 0; y < this.howmanyboom; y++) {
                if (this.isboom[y] == this.str) {
                    this.isboom.splice(y, 1);
                    x--;

                }

                
            }
            this.isboom.push(this.str);
        }




        for (let i = 0; i < this.howmany; i++) {

            for (let j = 0; j < this.howmany; j++) {

                    for(let q=0; q<this.howmanyboom;q++){

                        
                    }
                if (this.boomtotal === this.isboom[0] || this.boomtotal === this.isboom[1] || this.boomtotal === this.isboom[2] || this.boomtotal === this.isboom[3] || this.boomtotal === this.isboom[4]) {

                    let b: Laya.Image = Laya.Pool.getItemByCreateFun("boom+" + this.boomtotal, this.boom.create, this.boom);
                    b.pos(this.m_x, this.m_y);
                    b.name = 'boon' + this.boomtotal;
                    this.owner.addChild(b);

                    this.m_x += 28;
                    this.boomtotal += 1;

                } else {
                    let n: Laya.Image = Laya.Pool.getItemByCreateFun("noboom" + this.boomtotal, this.noboom.create, this.noboom);
                    n.pos(this.m_x, this.m_y);
                    n.name = 'boon' + this.boomtotal;
                    this.owner.addChild(n);

                    this.m_x += 28;
                    this.boomtotal += 1;
                }
            }
            this.m_y += 25
            this.m_x = 50;

        }
        // let box: Laya.Sprite = Laya.Pool.getItemByCreateFun("boom", this.boom.create, this.boom);
        // box.pos(Math.random() * (Laya.stage.width - 100), -100);
        // this._gameBox.addChild(box);      

    }

    onDisable(): void {
    }
    onMouseDown() {

    }

    openboom():void{
        this.isover = true;
        
    }
}