import Mine from "./Mine";

export default class boomset extends Laya.Script {
    /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
    public intType: number = 1000;
    /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
    public numType: number = 1000;
    /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
    public strType: string = "hello laya";
    /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
    public boolType: boolean = true;
    // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    
    private texture1: string = "res/777/Space1.png";
    private texture2: string = "res/777/Bomb.png";
    private texture3: string = "res/777/Flag.png";

    private Minnnne: Mine;
    private boo : boolean ;
    constructor() { super(); }
    
    onEnable(): void {
        this.boo = false;
        this.Minnnne = this.owner.parent.getComponent(Mine);
    }

    onDisable(): void {
    }

    onMouseDown() {
        // this.owner.removeSelf();
        // this.owner.getComponent(Laya.loader.getRes("Space2"));
        (this.owner as Laya.Image).skin = this.texture2
        if(this.boo === false)
        this.Minnnne.openboom();


    }
    onUpdate(){
        if(this.Minnnne.isover===true )
        (this.owner as Laya.Image).skin = this.texture2
    }

    
    onRightClick(){
        (this.owner as Laya.Image).skin = this.texture3
    }

    
 
}