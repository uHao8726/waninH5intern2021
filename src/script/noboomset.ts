import Sprite = Laya.Sprite;

import Mine from "./Mine";
import GameControl from "./GameControl";

export default class noboomset extends Laya.Script {
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
    private texture2: string = "res/777/Space2.png";
    private texture3: string = "res/777/Flag.png";

    private t1: string = "res/777/1.png"
    private t2: string = "res/777/2.png";
    private t3: string = "res/777/3.png"
    private t4: string = "res/777/4.png"
    private t5: string = "res/777/5.png"
    private t6: string = "res/777/6.png"
    private t7: string = "res/777/7.png"
    private t8: string = "res/777/8.png"

    private Minnnne: Mine;
    public mynum: number = 3;
    constructor() { super(); }
    private isopen: boolean;

    onStart() {
        // console.log(this.owner);

    }

    onEnable(): void {
        this.Minnnne = this.owner.parent.getComponent(Mine);
        this.mynum = this.count();
        this.isopen = false;
    }

    onDisable(): void {
    }


    onMouseDown() {
        // this.owner.removeSelf();
        // this.owner.getComponent(Laya.loader.getRes("Space2"));

        if (this.count() === 0) {
            (this.owner as Laya.Image).skin = this.texture2;

            this.hayhay();

        } else if (this.count() === 1) {
            (this.owner as Laya.Image).skin = this.t1;
        } else if (this.count() === 2) {
            (this.owner as Laya.Image).skin = this.t2;
        } else if (this.count() === 3) {
            (this.owner as Laya.Image).skin = this.t3;
        } else if (this.count() === 4) {
            (this.owner as Laya.Image).skin = this.t4;
        } else if (this.count() === 5) {
            (this.owner as Laya.Image).skin = this.t5;
        } else if (this.count() === 6) {
            (this.owner as Laya.Image).skin = this.t6;
        } else if (this.count() === 7) {
            (this.owner as Laya.Image).skin = this.t7;
        } else if (this.count() === 8) {
            (this.owner as Laya.Image).skin = this.t8;
        }
        this.isopen = true

        // spread();

    }


    public tnnn(): String {
        return (this.owner as Laya.Image).skin.toString();
    }
    //Event.RIGHT_CLICK(){}

    onRightClick() {
        (this.owner as Laya.Image).skin = this.texture3;
    }

    pppp(_node: Laya.Node): void {
        this.spread(_node as Laya.Image);

    }


    spread(_node: Laya.Image): void {

        if (_node == null)
            console.log("error");
        let _nodeScript: noboomset = _node.getComponent(noboomset);


        if (_nodeScript.count() === 0) {
            _node.skin = this.texture2//_nodeScript.tnnn().toString();
            //_nodeScript.hayhay();
            this.isopen = true
            _nodeScript.hayhay();
            console.log('123');


        } else if (_nodeScript.count() === 1) {
            _node.skin = this.t1;
            this.isopen = true
        } else if (_nodeScript.count() === 2) {
            _node.skin = this.t2;
            this.isopen = true
        } else if (_nodeScript.count() === 3) {
            _node.skin = this.t3;
            this.isopen = true
        } else if (_nodeScript.count() === 4) {
            _node.skin = this.t4;
            this.isopen = true
        } else if (_nodeScript.count() === 5) {
            _node.skin = this.t5;
            this.isopen = true
        } else if (_nodeScript.count() === 6) {
            _node.skin = this.t6;
            this.isopen = true
        } else if (_nodeScript.count() === 7) {
            _node.skin = this.t7;
            this.isopen = true
        } else if (_nodeScript.count() === 8) {
            _node.skin = this.t8;
            this.isopen = true
        }


    }

    public lll(): void {
        console.log('loolool');

    }
    public hayhay(): void {

        // 29 : 28 30 / 18 19 20 / 38 39 40
        console.log('hyhy');

        let _parent: Laya.Node = this.owner.parent;
        let indexOfthisOwner: number = this.owner.parent.getChildIndex(this.owner);
        let i = _parent.numChildren;
        let iii: number = indexOfthisOwner + 1; //30

        let arr_1: number[] = [1, -1, -this.Minnnne.howmany, -(this.Minnnne.howmany + 1), -(this.Minnnne.howmany - 1), this.Minnnne.howmany, this.Minnnne.howmany + 1, this.Minnnne.howmany - 1]//正常的
        let arr_for_1: number[] = [1, this.Minnnne.howmany, this.Minnnne.howmany + 1]//1的
        let arr_2: number[] = [1, -1, this.Minnnne.howmany, (this.Minnnne.howmany + 1), (this.Minnnne.howmany - 1)]//第一排的
        let arr_1_right: number[] = [-1, this.Minnnne.howmany, this.Minnnne.howmany - 1]//第一排最右邊的
        let arr_left: number[] = [1, -this.Minnnne.howmany, -(this.Minnnne.howmany - 1), this.Minnnne.howmany, this.Minnnne.howmany + 1]//最右邊的
        let arr_right: number[] = [-1, -this.Minnnne.howmany, -(this.Minnnne.howmany + 1), this.Minnnne.howmany, this.Minnnne.howmany - 1]//最左邊的
        //const boomIndex : number[]=[11,21,31,41,51];

        if (this.isopen === false) {
            if (indexOfthisOwner === 0) {
                for (let i = 0; i < arr_for_1.length; i++) {
                    //let item = this.Minnnne.isboom.find(e => e - 1 === indexOfthisOwner + arr_for_1[i]);

                    this.pppp(this.owner.parent.getChildAt(indexOfthisOwner + arr_for_1[i]));
                    continue;
                }
            } else if (indexOfthisOwner === this.Minnnne.howmany) {
                for (let i = 0; i < arr_left.length; i++) {
                    //let item = this.Minnnne.isboom.find(e => e - 1 === indexOfthisOwner + arr_left[i]);

                    this.pppp(this.owner.parent.getChildAt(indexOfthisOwner + arr_left[i]));

                }


            } else if (indexOfthisOwner >= 1 && indexOfthisOwner < this.Minnnne.howmany - 1) {
                for (let i = 0; i < arr_2.length; i++) {
                    //let item = this.Minnnne.isboom.find(e => e - 1 === indexOfthisOwner + arr_2[i]);

                    this.pppp(this.owner.parent.getChildAt(indexOfthisOwner + arr_2[i]));

                }
            } else if (indexOfthisOwner === this.Minnnne.howmany - 1) {
                for (let i = 0; i < arr_1_right.length; i++) {
                    // let item = this.Minnnne.isboom.find(e => e - 1 === indexOfthisOwner + arr_1_right[i]);


                    this.pppp(this.owner.parent.getChildAt(indexOfthisOwner + arr_1_right[i]));

                }
            } else if (indexOfthisOwner % this.Minnnne.howmany === 0 && indexOfthisOwner !== 1) {
                for (let i = 0; i < arr_left.length; i++) {
                    //let item = this.Minnnne.isboom.find(e => e - 1 === indexOfthisOwner + arr_left[i]);//第二航

                    if ((indexOfthisOwner + arr_left[i]) < this.Minnnne.howmany*this.Minnnne.howmany)
                        this.pppp(this.owner.parent.getChildAt(indexOfthisOwner + arr_left[i]));

                }

            } else if (indexOfthisOwner % this.Minnnne.howmany === this.Minnnne.howmany - 1 && indexOfthisOwner !== this.Minnnne.howmany) {//最又
                for (let i = 0; i < arr_right.length; i++) {
                    //let item = this.Minnnne.isboom.find(e => e - 1 === indexOfthisOwner + arr_right[i]);
                    if ((indexOfthisOwner + arr_right[i]) < this.Minnnne.howmany*this.Minnnne.howmany)
                        this.pppp(this.owner.parent.getChildAt(indexOfthisOwner + arr_right[i]));

                }

            } else {
                for (let i = 0; i < arr_1.length; i++) {
                    //let item = this.Minnnne.isboom.find(e => e - 1 === indexOfthisOwner + arr_1[i]);
                    if ((indexOfthisOwner + arr_1[i]) <this.Minnnne.howmany*this.Minnnne.howmany )
                        this.pppp(this.owner.parent.getChildAt(indexOfthisOwner + arr_1[i]));

                }
            }
        }




        //this.pppp(this.owner.parent.getChildAt(iii));
    }
    public count(): number {

        // 29 : 28 30 / 18 19 20 / 38 39 40

        let _parent: Laya.Node = this.owner.parent;
        let xxx: number = this.owner.parent.getChildIndex(this.owner);
        //let i = _parent.numChildren;
        let iii: number = xxx + 1; //30
        let total: number = 0;
        let arr_1: number[] = [1, -1, -this.Minnnne.howmany, -(this.Minnnne.howmany + 1), -(this.Minnnne.howmany - 1), this.Minnnne.howmany, this.Minnnne.howmany + 1, this.Minnnne.howmany - 1]//正常的
        let arr_for_1: number[] = [1, this.Minnnne.howmany, this.Minnnne.howmany + 1]//1的
        let arr_2: number[] = [1, -1, this.Minnnne.howmany, (this.Minnnne.howmany + 1), (this.Minnnne.howmany - 1)]//第一排的
        let arr_1_right: number[] = [-1, this.Minnnne.howmany, this.Minnnne.howmany - 1]//第一排最右邊的
        let arr_left: number[] = [1, -this.Minnnne.howmany, -(this.Minnnne.howmany - 1), this.Minnnne.howmany, this.Minnnne.howmany + 1]//最右邊的
        let arr_right: number[] = [-1, -this.Minnnne.howmany, -(this.Minnnne.howmany + 1), this.Minnnne.howmany, this.Minnnne.howmany - 1]//最左邊的
        //const boomIndex : number[]=[11,21,31,41,51];

        if (xxx === 0) {
            for (let i = 0; i < arr_for_1.length; i++) {
                let item = this.Minnnne.isboom.find(e => e - 1 === xxx + arr_for_1[i]);

                if (item === undefined) {
                    total += 0;
                } else {
                    total += 1;
                }
            }
        } else if (xxx === this.Minnnne.howmany) {
            for (let i = 0; i < arr_left.length; i++) {
                let item = this.Minnnne.isboom.find(e => e - 1 === xxx + arr_left[i]);

                if (item === undefined) {
                    total += 0;
                } else {
                    total += 1;
                }
            }


        } else if (xxx > 1 && xxx < this.Minnnne.howmany - 1) {
            for (let i = 0; i < arr_2.length; i++) {
                let item = this.Minnnne.isboom.find(e => e - 1 === xxx + arr_2[i]);

                if (item === undefined) {
                    total += 0;
                } else {
                    total += 1;
                }
            }
        } else if (xxx === this.Minnnne.howmany - 1) {
            for (let i = 0; i < arr_1_right.length; i++) {
                let item = this.Minnnne.isboom.find(e => e - 1 === xxx + arr_1_right[i]);

                if (item === undefined) {
                    total += 0;
                } else {
                    total += 1;
                }
            }
        } else if (xxx % this.Minnnne.howmany === 0 && xxx !== 1) {
            for (let i = 0; i < arr_left.length; i++) {
                let item = this.Minnnne.isboom.find(e => e - 1 === xxx + arr_left[i]);//第二航

                if (item === undefined) {
                    total += 0;
                } else {
                    total += 1;
                }
            }

        } else if (xxx % this.Minnnne.howmany === this.Minnnne.howmany - 1 && xxx !== this.Minnnne.howmany) {//最又
            for (let i = 0; i < arr_right.length; i++) {
                let item = this.Minnnne.isboom.find(e => e - 1 === xxx + arr_right[i]);

                if (item === undefined) {
                    total += 0;
                } else {
                    total += 1;
                }
            }

        } else {
            for (let i = 0; i < arr_1.length; i++) {
                let item = this.Minnnne.isboom.find(e => e - 1 === xxx + arr_1[i]);

                if (item === undefined) {
                    total += 0;
                } else {
                    total += 1;
                }
            }
        }






        return total;
    }

}