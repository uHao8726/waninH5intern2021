import ColorFilter = Laya.ColorFilter;
export default class color2048 extends Laya.Script {
    /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
    public intType: number = 1000;
    /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
    public numType: number = 1000;
    /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
    public strType: string = "hello laya";
    /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
    public boolType: boolean = true;
    // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    
    constructor() { super(); }
    
    
    onEnable(): void {
        var redMat: Array<number> =
                [
                    1, 0, 0, 0, 0, //R
                    0, 0, 0, 0, 0, //G
                    0, 0, 0, 0, 0, //B
                    0, 0, 0, 1, 0, //A
                ];
        var grayscaleFilter: ColorFilter = new ColorFilter(redMat);
        var grayscaleMat: Array<number> = [0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0];

        var grayscaleFilter : ColorFilter = new ColorFilter(grayscaleMat);

    }
    onUpdate(){
        switch((this.owner as Laya.Button).label){
            case '0':
                (this.owner as Laya.Button).visible = false;
                break;
            case '2':
                this.color2(2,4,1);
                (this.owner as Laya.Button).visible = true;
                break;
            case '4':
                this.color2(8,1,4);
                (this.owner as Laya.Button).visible = true;
                break;
            case '8':
                    this.color2(1,1,3);
                    (this.owner as Laya.Button).visible = true;
                break;  
            case '16':
                    this.color2(1,3,1);
                    (this.owner as Laya.Button).visible = true;
                break;
            case '32':
                    this.color2(2,3,4);
                    (this.owner as Laya.Button).visible = true;
                break; 
            case '64':
                    this.color2(3,1,1);
                    (this.owner as Laya.Button).visible = true;
                break;   
            case '128':
                    this.color2(2.5,1.28,5.1);
                    (this.owner as Laya.Button).visible = true;
                break;
            case '512':
                this.color2(8,4,1);
                (this.owner as Laya.Button).visible = true;
                break;
            case '1024':
                this.color2(8,6,3);
                (this.owner as Laya.Button).visible = true;
                break;
            case '2048':
                this.color2(2,6,3);
                (this.owner as Laya.Button).visible = true;
                (this.owner.parent.getChildByName('win') as Laya.Button).visible = true;
                alert('you win');
                break;
        }

        // if((this.owner as Laya.Button).label === '2'){
        //     this.color2(192,192,192);
        // }

            
    }

    color2(r:number,g:number,b:number){
        
        var grayscaleMat: Array<number> = 
        [
            r, 0, 0, 0, 0, //R
            g, 0, 0, 0, 0, //G
            b, 0, 0, 0, 0, //B
            0, 0, 0, 1, 0, //A
        ];

        var grayscaleFilter : ColorFilter = new ColorFilter(grayscaleMat);
        (this.owner as Laya.Button).filters = [grayscaleFilter]
    }
    onDisable(): void {

    }
}