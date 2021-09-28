import button2048 from "./script/button2048";

export default class Control_2048 extends Laya.Script {
    /** @prop {name:Cube,tips:"方塊",type:Prefab}*/
    Cube: Laya.Prefab;   

    constructor() { super();
        
    }
    
    
    
    public total : number[]= [,,,,,,,,,,,,,,,];
    // Array<Array<number>> =  new Array<Array<number>>();
    private str:number = 0;

    addokay:boolean = false;
    
    onEnable(): void {
        this.str = Math.round(Math.random() * 15);
        this.total[this.str] = 2;
        let b: Laya.Image = Laya.Pool.getItemByCreateFun("Cube" , this.Cube.create, this.Cube);
        b.pos(this.position_x(this.str),this.position_y(this.str)); 
        this.owner.addChild(b);    
    }
    onDisable(): void {

    }
    public addcube():void{
        this.addokay = true;
    }
    public goadd(){
        this.str = Math.round(Math.random() * 15);
        console.log(this.total);
        console.log(this.str);
        
        if(this.total[this.str] !== undefined && this.total[this.str] !== null){
            
            // console.log(this.str);
            this.goadd();
            return;
        }else if(this.total[this.str] === undefined||this.total[this.str] === null ){
            console.log('born'+this.str);
            
            this.total[this.str] = 2;
            let b: Laya.Image = Laya.Pool.getItemByCreateFun("Cube" , this.Cube.create, this.Cube);
            b.pos(this.position_x(this.str),this.position_y(this.str)); 
            this.owner.addChild(b); 
            this.addokay =false;
            // set false
        }
    }

    // onUpdate(){
    //     console.log(this.total);
        
    // }
    onLateUpdate(){
        if(this.addokay == true){
            
            // set true
            this.goadd();
        }
        
    }






























    public position_y(num:number):number{
        if(num === 0){
            return -8;
        }
        if(num === 1){
            return -8;
        }
        if(num === 2){
            return -8;
        }
        if(num === 3){
            return -8;
        }
        if(num === 4){
            return 36;
        }
        if(num === 5){
            return 36;
        }
        if(num === 6){
            return 36;
        }
        if(num === 7){
            return 36;
        }
        if(num === 8){
            return 80;
        }
        if(num === 9){
            return 80;
        }
        if(num === 10){
            return 80;
        }
        if(num === 11){
            return 80;
        }
        if(num === 12){
            return 124;
        }
        if(num === 13){
            return 124;
        }
        if(num === 14){
            return 124;
        }
        if(num === 15){
            return 124;
        }
        
    }
    public position_x(num:number):number{
        if(num === 0){
            return 88;
        }
        if(num === 1){
            return 132;
        }
        if(num === 2){
            return 176;
        }
        if(num === 3){
            return 220;
        }
        if(num === 4){
            return 88;
        }
        if(num === 5){
            return 132;
        }
        if(num === 6){
            return 176;
        }
        if(num === 7){
            return 220;
        }
        if(num === 8){
            return 88;
        }
        if(num === 9){
            return 132;
        }
        if(num === 10){
            return 176;
        }
        if(num === 11){
            return 220;
        }
        if(num === 12){
            return 88;
        }
        if(num === 13){
            return 132;
        }
        if(num === 14){
            return 176;
        }
        if(num === 15){
            return 220;
        }
        
    }

    

}