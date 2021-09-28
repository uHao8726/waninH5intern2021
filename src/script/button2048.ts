import Tween = Laya.Tween;
import Button = Laya.Button;
import Control_2048 from "../Control_2048";
export default class button2048 extends Laya.Script {

    // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    
    constructor() { super(); }
    public my_x :number = 88;
    public my_y :number = -8;
    public my_num :number = 2;
    private Control2048:Control_2048;
     
    onEnable(): void {
       this.my_x = (this.owner as Laya.Button).x;
       this.my_y = (this.owner as Laya.Button).y;
       this.my_num =parseInt((this.owner as Laya.Button).label);
       this.Control2048 = this.owner.parent.getComponent(Control_2048);
       //console.log(this.checkmy());
       
       //this.checkmy()

    }


    onUpdate():void{
        
    }
    onDisable(): void {
    }



    

    onKeyDown(e){
       // console.log(e.keyCode + "按下");//識別鍵值   // 37左,38上,39右,40下
       this.Control2048.total[this.checkmy(this.my_x,this.my_y)] = undefined;
       
        if(e.keyCode === 39){  
                 //右鍵
            //
            this.right();
            // this.Control2048.total[this.checkmy(this.my_x,this.my_y)] = this.my_num;
            this.Control2048.addcube();
        }
        if(e.keyCode === 37){       //左鍵
            // this.Control2048.total[this.checkmy(this.my_x,this.my_y)] = undefined;
            this.left();
            // this.Control2048.total[this.checkmy(this.my_x,this.my_y)] = this.my_num;
            this.Control2048.addcube();
        }
        if(e.keyCode === 40){       //下鍵
            
              
            // this.Control2048.total[this.checkmy(this.my_x,this.my_y)] = undefined;   
               
               
            this.down();
            // this.Control2048.total[this.checkmy(this.my_x,this.my_y)] = this.my_num;
           // console.log(this.Control2048.total[this.checkmy(this.my_x,this.my_y)]);
            
            
            this.Control2048.addcube();
        }
        if(e.keyCode === 38){       //上鍵
            // this.Control2048.total[this.checkmy(this.my_x,this.my_y)] = undefined;
            this.up();
            // this.Control2048.total[this.checkmy(this.my_x,this.my_y)] = this.my_num;
            this.Control2048.addcube();
        }
            this.Control2048.total[this.checkmy(this.my_x,this.my_y)] = this.my_num;
    }
    
    right():void{     
        if(this.my_x !== 220){
            
            this.my_x += 44;
            
            Tween.to(this.owner as Laya.Button, { x: this.my_x},100);
            

        }  
    }
    
    left():void{     
        if(this.my_x !==88 ){
            
            this.my_x -= 44;
            
            Tween.to(this.owner as Laya.Button, { x: this.my_x},100);
            
        }  
    }
    down():void{
        if(this.my_y !==124 ){
            
            
           // console.log(this.my_y);
            this.my_y += 44;
            //console.log(this.my_y);
            //console.log(this.checkmy(this.my_x,this.my_y));
            
            Tween.to(this.owner as Laya.Button, { y: this.my_y},100);

            
        }
    }
    up():void{
        if(this.my_y !== -8 ){
            
            this.my_y -= 44;   
            Tween.to(this.owner as Laya.Button, { y: this.my_y},100);
            
        }
    }

    onLateUpdate(){
        this.Control2048.total[this.checkmy(this.my_x,this.my_y)] = this.my_num;
    }

    public checkmy(checkx:number,checky:number):number{

        let check  = 0;
        if(checkx === 88){
            check += 0;
        }else if(checkx ===132){
            check +=1;
        }else if(checkx === 176){
            check +=2;
        }else if(checkx  === 220 ){
            check +=3;
        }

        if(checky === -8){
            check += 0;
        }else if(checky === 36){
            check +=4;
        }else if(checky === 80){
            check +=8;
        }else if(checky === 124){
            check +=12;
        }
        return check;
    }

}