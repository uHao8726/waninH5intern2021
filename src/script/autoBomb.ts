export default class autoBomb extends Laya.Script {

    /** @prop {name:boxCount,tips:"乘數",type:number}*/
    private boxCount: number = 5;

    /** block 類型 0:空格 / 1:1顆 / 2:2顆 / 3:3顆 / 4:4顆 / 5:5顆 / 6:6顆 / 7:7顆 / 8:8顆 / 9:9顆 / 10:炸彈 */
    private arr_boxType: number[] = [];

    /** block 當前狀態 0:未點擊 / 1:已點擊 / 2:已插旗 / 4:已踩雷 */
    private arr_boxState: number[] = [];

    /** 圖檔資源 */
    private arr_boxImg: string[] = [
        "res/imgs/_0.png",
        "res/imgs/_1.png",
        "res/imgs/_2.png",
        "res/imgs/_3.png",
        "res/imgs/_4.png",
        "res/imgs/_5.png",
        "res/imgs/_6.png",
        "res/imgs/_7.png",
        "res/imgs/_8.png",
        "res/imgs/_9.png",
        "res/imgs/_10.png",
    ];

    /** 動態長寬分配(未使用) */
    private sceneSize: number[] = []

    onEnable() {
        this.createBlock();
        this.fun_randomBomb();
        this.sceneSize = [Laya.stage.width, Laya.stage.height];
    }

    /** 生成隨機炸彈 */
    private fun_randomBomb() {
        let currentBomb: number[] = [];
        this.arr_boxType = new Array<number>(this.boxCount * this.boxCount).fill(0);
        this.arr_boxState = Array.from(this.arr_boxType);

        // 回傳不重複的隨機數
        let setRandom = (): number => {
            let resault: number;
            let _num: number = Math.floor(Math.random() * ((this.boxCount * this.boxCount) + 1));
            resault = currentBomb.find(n => n === _num) === undefined ? _num : setRandom();
            return resault;
        }

        // 創建隨機炸彈
        for (let i = 0; i < this.boxCount; i++) {
            currentBomb.push(setRandom());
            this.arr_boxType[currentBomb[i]] = 10;
        }
        this.fun_numAroundBomb(currentBomb);
    }

    /** 處理炸彈旁的數字 */
    private fun_numAroundBomb(arrBomb: number[]) {
        // 左 / 左上 / 上 / 右上 / 右 / 右下 / 下 / 左下
        const _numDefault: number[] = [-1, -(this.boxCount + 1), -(this.boxCount), -(this.boxCount - 1), 1, (this.boxCount + 1), (this.boxCount), (this.boxCount - 1)];
        let _num: number[] = [];

        for (let i = 0; i < arrBomb.length; i++) {

            // 如果炸彈在最右邊
            if (((arrBomb[i] + 1) / this.boxCount) % 1 === 0)
                _num = [-1, -(this.boxCount + 1), -(this.boxCount), (this.boxCount), (this.boxCount - 1)];

            // 如果炸彈在最左邊
            else if ((arrBomb[i] / this.boxCount) % 1 === 0)
                _num = [-(this.boxCount), -(this.boxCount - 1), 1, (this.boxCount + 1), (this.boxCount),];

            // 如果炸彈在最上面
            else if (arrBomb[i] / this.boxCount < 0)
                _num = [-1, 1, (this.boxCount + 1), (this.boxCount), (this.boxCount - 1)];

            // 如果炸彈在最下面
            else if (Math.floor(arrBomb[i] / this.boxCount) === this.boxCount - 1)
                _num = [-1, -(this.boxCount + 1), -(this.boxCount), -(this.boxCount - 1), 1];

            // 正常位置的炸彈
            else _num = Array.from(_numDefault);

            for (let y = 0; y < _num.length; y++)
                if (this.arr_boxType[arrBomb[i] + (_num[y])] >= 0)
                    this.arr_boxType[arrBomb[i] + (_num[y])] += this.arr_boxType[arrBomb[i] + (_num[y])] === 10 ? 0 : 1;
        }
    }

    /** 創建方塊 */
    private createBlock(): void {
        const startAt_CX: number = this.boxCount % 2 === 0 ? (-65) + (-130) * ((this.boxCount / 2) - 1) : (-130) * Math.floor(this.boxCount / 2);
        let currentCX: number = startAt_CX;
        let currentCY: number = startAt_CX;

        for (let i = 0; i < this.boxCount * this.boxCount; i++) {
            let _item: Laya.Image = new Laya.Image("res/imgs/img1.jpg");

            // 調配方塊大小、位置
            _item.width = this.boxCount <= 5 ? 100 : 5 / this.boxCount * 100;
            _item.height = this.boxCount <= 5 ? 100 : 5 / this.boxCount * 100;
            _item.centerX = currentCX * (_item.width / 100);
            _item.centerY = currentCY * (_item.height / 100);
            this.owner.addChild(_item)

            currentCX = currentCX === Math.abs(startAt_CX) ? startAt_CX : currentCX + 130;
            currentCY = i !== 0 && (((i + 1) / this.boxCount) % 1) === 0 ? currentCY + 130 : currentCY;

            // 創建事件監聽
            _item.once(Laya.Event.CLICK, this, () => { this.itemOnClick(_item) });
            _item.once(Laya.Event.RIGHT_CLICK, this, () => { });
        }
    }

    /** 方塊被點擊時 */
    private itemOnClick(_item: Laya.Node) {
        _item.offAll();
        let _num: number = this.arr_boxType[this.owner.getChildIndex(_item)];
        this.arr_boxState[_num] = 1;
        (_item as Laya.Image).skin = this.arr_boxImg[_num];
        this.fun_checkIsEmptyBlock(_num);
    }

    /** 空白方塊自動攤開 */
    private fun_checkIsEmptyBlock(_num: number) {

    }

    /** 右鍵立旗 */
    private fun_setFlag(){

    }
}