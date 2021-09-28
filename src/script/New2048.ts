import DropBox from "./DropBox";
import Tween = Laya.Tween;
import Button = Laya.Button;

export default class New2048 extends Laya.Script {


    constructor() { super(); }
//1233211234567
    /** @prop {name:howMany , tips:"要幾乘幾", type:Int, default:4}*/
        public howMany:number = 4

    /** @prop {name:Cube,tips:"空格",type:Prefab}*/
    Cube: Laya.Prefab;
    isaction: boolean;
    private m_x: number = 100
    private m_y: number = 0
    private m_total:number = 0;
    private arr_Button: Laya.Button[] = [];
    private m_NumStrArr: string[] = [];
    onEnable(): void {
        for (var i = 0; i < this.howMany; i++) {    //////////  建起儲存陣列

            var varname = "var" + i;
            this[varname] = new Array<number>(this.howMany).fill(0);

        }
        let bgBox: Laya.Box = new Laya.Box();   //////////   背景格子
        bgBox.size((this.owner as Laya.UIComponent).width,(this.owner as Laya.UIComponent).height);
        this.owner.addChild(bgBox);

        for (let i = 0; i < this.howMany; i++) {     /////////////////生成所有格子
            for (let j = 0; j < this.howMany; j++) {
                    let b: Laya.Image = Laya.Pool.getItemByCreateFun(""+this.m_total, this.Cube.create, this.Cube);
                    b.pos(this.m_x, this.m_y);
                    b.name = ""+this.m_total;
                    this.owner.addChild(b);

                    let bgImg: Laya.Image = new Laya.Image("777/Space2.png");
                    bgImg.size(b.width, b.height)
                    bgImg.pos(this.m_x, this.m_y);                    
                    bgBox.addChild(bgImg);

                    this.m_x += 30;
                    this.m_total += 1;      
            }
            this.m_y += 30
            this.m_x = 100;
        }
         this.addNewCube();    ////  初始新增兩格
         this.addNewCube();
         this.changeImg();
         this.isaction = false;
         (this.owner.getChildByName('lose') as Laya.Button).visible = false;
    }

    onKeyUp(e) {    //  鍵盤按下發生事件

         if (e.keyCode === 39) {  //右鍵
             this.RightCalculation();      
        }
        if (e.keyCode === 37) {       //左鍵
            this.LeftCalculation();
        }
        if (e.keyCode === 40) {       //下鍵
            this.DownCalculation();
        }
        if (e.keyCode === 38) {       //上鍵
            this.UpCalculation();
        }
        if (this.isaction === true) {
            this.addNewCube();
            this.changeImg();
            this.isaction = false;
        }
        this.checkLose();
    }

    checkLose(): void {    ////    判定輸
        let cheak = true;
        for (let i = 0; i < this.howMany-1; i++) {
            for(let m = 0 ;m < this.howMany-1 ;m++){
                if (this['var'+m][i] === this['var'+m][i + 1] || this['var'+m][i] === 0 || this['var'+m][i + 1] === 0) {
                    cheak = false;
                }
            }     
        }
        for (let j = 0; j < this.howMany; j++) {
            for(let m = 0 ;m < this.howMany-1 ;m++)
            if (this['var'+m][j] === this['var'+(m+1)][j] || this['var'+m][j] === 0 || this['var'+(m+1)][j] === 0) {
                cheak = false;
            }
        }
        if (cheak === true) {
            (this.owner.getChildByName('lose') as Laya.Button).visible = true;
            console.log('123');
        }
    }
    /** 右鍵計算 */
    RightCalculation(): void {  
        for (let x = this.howMany-1 ; x >= 0; x--) {   ////排列第一次
            for (let y = x - 1; y >= 0; y--) {
                for(let m = 0 ;m < this.howMany ;m++){   
                    if (this['var'+m][x] === 0 && this['var'+m][y] > 0) {
                        this['var'+m][x] = this['var'+m][y];
                        this['var'+m][y] = 0;
                        this.start_RightLeftAni(m, x, y);
                        this.isaction = true;
                    }
                }
            }
        }
        for (let i = this.howMany-1; i > 0; i--) {  /////////////////////加法
            for(let m = 0 ;m < this.howMany ;m++){
                if (this['var'+m][i] === this['var'+m][i - 1]) {
                    if (this['var'+m][i] === this['var'+m][i - 1] && this['var'+m][i] !== 0) {
                        this.start_RightLeftAni(m, i, i - 1);
                        this.isaction = true;
                    }
                    this['var'+m][i] += this['var'+m][i - 1];
                    this['var'+m] [i - 1] = 0;
                }
            }   
        }
        for (let x = this.howMany-1 ; x >= 0; x--) {     ////排列第二次
            for (let y = x - 1; y >= 0; y--) {
                for(let m = 0 ;m < this.howMany ;m++){
                    
                    if (this['var'+m][x] === 0 && this['var'+m][y] > 0) {
                        this['var'+m][x] = this['var'+m][y];
                        this['var'+m][y] = 0;
                        this.start_RightLeftAni(m, x, y);
                        this.isaction = true;
                    }
                }
            }
        }
    }
    /** 左鍵計算 */
    LeftCalculation(): void {   
        for (let x = 0; x <= this.howMany-1; x++) {     ////排列第一次
            for (let y = x + 1; y < this.howMany; y++) {
                for(let m = 0 ;m < this.howMany ;m++){
                    if (this['var'+m][x] === 0 && this['var'+m][y] > 0) {
                        this['var'+m][x] = this['var'+m][y];
                        this['var'+m][y] = 0;
                        this.start_RightLeftAni(m, x, y);
                        this.isaction = true;
                    }
                }
            }
        }
        for (let i = 0; i < this.howMany-1; i++) {  /////////////////////加法
            for(let m = 0 ;m < this.howMany ;m++){
                if (this['var'+m][i] === this['var'+m][i + 1]) {
                    if (this['var'+m][i] === this['var'+m][i + 1] && this['var'+m][i] !== 0) {
                        this.start_RightLeftAni(m, i, i + 1);
                        this.isaction = true;
                    }
                    this['var'+m][i] += this['var'+m][i + 1];
                    this['var'+m][i + 1] = 0;
                }
            }
        }
        for (let x = 0; x <= this.howMany-1; x++) {       ////排列第二次
            for (let y = x + 1; y <= this.howMany-1; y++) {
                for(let m = 0 ;m < this.howMany ;m++){
                    if (this['var'+m][x] === 0 && this['var'+m][y] > 0) {
                        this['var'+m][x] = this['var'+m][y];
                        this['var'+m][y] = 0;
                        this.start_RightLeftAni(m, x, y);
                        this.isaction = true;
                    }
                }
            }
        }
    }
    /** 下鍵計算 */
    DownCalculation(): void {  
        for (let x = this.howMany-1; x >= 0; x--) {     ////排列第一次
            for(let m = this.howMany-1 ; m > 0 ;m-- ){
                for(let n = m-1;n >= 0;n--){
                    if (this['var'+m][x] === 0 && this['var'+n][x] > 0) {
                        this['var'+m][x] = this['var'+n][x]
                        this['var'+n][x] = 0;
                        this.start_UpDownAni(m, x, n, x);
                        this.isaction = true;
                    }
                }
            }   
        }
        for (let i = this.howMany-1 ; i >= 0; i--) {      /////加法
            for(let m = this.howMany-1 ;m > 0 ;m--){
                if (this['var'+m][i] === this['var'+(m-1)][i]) {
                    if (this['var'+m][i] === this['var'+(m-1)][i] && this['var'+m][i] !== 0) {
                        this.start_UpDownAni(m, i, (m-1), i);
                        this.isaction = true;
                    }
                this['var'+m][i] += this['var'+(m-1)][i]
                this['var'+(m-1)][i] = 0;
                }
            }
        }
        for (let x = this.howMany-1; x >= 0; x--) {     ////排列第二次
            for(let m = this.howMany-1 ; m > 0 ;m-- ){
                for(let n = m-1;n >= 0;n--){
                    if (this['var'+m][x] === 0 && this['var'+n][x] > 0) {
                        this['var'+m][x] = this['var'+n][x]
                        this['var'+n][x] = 0;
                        this.start_UpDownAni(m, x, n, x);
                        this.isaction = true;
                    }
                }
            }   
        }
    }
    /** 上鍵計算 */
    UpCalculation(): void {  
        for (let x = this.howMany-1; x >= 0; x--) {     ////排列第一次
            for(let m = 0 ;m < this.howMany-1 ;m++){
                for(let n = m+1 ;n < this.howMany ;n++){
                    if (this['var'+m][x] === 0 && this['var'+n][x] > 0) {
                        this['var'+m][x] = this['var'+n][x]
                        this['var'+n][x] = 0;
                        this.start_UpDownAni(m, x, n, x);
                        this.isaction = true;
                    }
                }
            }
        }
        for (let i = this.howMany-1; i >= 0; i--) {     /////加法
            for(let m = 0 ;m < this.howMany-1 ;m++){
                if (this['var'+m][i] === this['var'+(m+1)][i]) {
                    if (this['var'+m][i] === this['var'+(m+1)][i] && this['var'+m][i] !== 0) {
                        this.start_UpDownAni(m, i, (m+1), i);
                        this.isaction = true;
                    }
                    this['var'+m][i] += this['var'+(m+1)][i]
                    this['var'+(m+1)][i] = 0;
                }
            }
        }
        for (let x = this.howMany-1; x >= 0; x--) {     ////排列第二次
            for(let m = 0 ;m < this.howMany-1 ;m++){
                for(let n = m+1 ;n < this.howMany ;n++){
                    if (this['var'+m][x] === 0 && this['var'+n][x] > 0) {
                        this['var'+m][x] = this['var'+n][x]
                        this['var'+n][x] = 0;
                        this.start_UpDownAni(m, x, n, x);
                        this.isaction = true;
                    }
                }
            }
        }

    }
    /** 上下動畫 */
    start_UpDownAni(rankgo: number, go: number, rankto: number, to: number): void {  

        go = go+(this.howMany*rankgo);
        to = to+(this.howMany*rankto);
        let original_go: string = this.owner.getChildByName("" + go).name;  //2
        let original_to: string = this.owner.getChildByName("" + to).name; //1
        let original_go_node: number = this.owner.getChildIndex(this.owner.getChildByName("" + go))
        let original_to_node: number = this.owner.getChildIndex(this.owner.getChildByName("" + to))
        this.owner.getChildAt(original_go_node).name = original_to;
        this.owner.getChildAt(original_to_node).name = original_go;
        let original_position_go = (this.owner.getChildByName("" + go) as Laya.Button).y;
        let original_position_to = (this.owner.getChildByName("" + to) as Laya.Button).y;
        Tween.to(this.owner.getChildByName("" + go) as Laya.Button, { y: original_position_to }, 30, undefined,
            new Laya.Handler(this, () => {
                (this.owner.getChildByName("" + go) as Laya.UIComponent).y = original_position_to;
            }));
        (this.owner.getChildByName("" + to) as Laya.UIComponent).y = original_position_go;
        (this.owner.getChildByName("" + go) as Laya.UIComponent).y = original_position_to;
    }
    /** 左右動畫 */
    start_RightLeftAni(Rank: number, go: number, to: number): void {  

        go = go+(this.howMany*Rank);
        to = to+(this.howMany*Rank);
        let original_go: string = this.owner.getChildByName("" + go).name;  //2
        let original_to: string = this.owner.getChildByName("" + to).name; //1
        let original_go_node: number = this.owner.getChildIndex(this.owner.getChildByName("" + go))
        let original_to_node: number = this.owner.getChildIndex(this.owner.getChildByName("" + to))
        this.owner.getChildAt(original_go_node).name = original_to;
        this.owner.getChildAt(original_to_node).name = original_go;
        let original_position_go = (this.owner.getChildByName("" + go) as Laya.Button).x;
        let original_position_to = (this.owner.getChildByName("" + to) as Laya.Button).x;
        Tween.to(this.owner.getChildByName("" + go) as Laya.Button, { x: original_position_to }, 30, undefined,
            new Laya.Handler(this, () => {
                (this.owner.getChildByName("" + go) as Laya.UIComponent).x = original_position_to;
            }));
        (this.owner.getChildByName("" + to) as Laya.UIComponent).x = original_position_go;
        (this.owner.getChildByName("" + go) as Laya.UIComponent).x = original_position_to;
    }

    init() {
        this.m_NumStrArr = []
        for(let i = 0 ; i < this.howMany ; i++){
            for(let j = 0 ; j < this.howMany ; j++){
                this.m_NumStrArr.push(this['var'+i][j].toString());
            }
        }
    }
    private init_Button(): void {
        this.arr_Button = [];
        for (let i = 0; i < this.howMany * this.howMany; i++) {
            this.arr_Button.push((this.owner.getChildByName(i.toString()) as Laya.Button));
        }
    }
    /** 換圖 */
    changeImg(): void {
        this.init();
        this.init_Button();
        for (let i = 0; i < this.arr_Button.length; i++) {
            this.arr_Button[i].label = this.m_NumStrArr[i];
        }  
    }
     /** 新增格子 */
    addNewCube(): void {
        console.log('gg');
        let str = Math.round(Math.random() * ((this.howMany*this.howMany)-1));
        console.log(str)
        let a = Math.floor(str / this.howMany);
        let b = str % this.howMany

        if(this['var'+a][b] > 0){
            this.addNewCube();
            return;
        }else if(this['var'+a][b] === 0){
            this['var'+a][b] =this.random_CubeNum();
        }
    }
    /** 隨機產生數字 2 or 4 */
    random_CubeNum(): number {
        let num = Math.round(Math.random() * 10)
        return (num == 9 ? 4 : 2);
    }
}
