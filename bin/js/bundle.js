(function () {
    'use strict';

    var ColorFilter = Laya.ColorFilter;
    class color2048 extends Laya.Script {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
        }
        onEnable() {
            var redMat = [
                1, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 1, 0,
            ];
            var grayscaleFilter = new ColorFilter(redMat);
            var grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0];
            var grayscaleFilter = new ColorFilter(grayscaleMat);
        }
        onUpdate() {
            switch (this.owner.label) {
                case '0':
                    this.owner.visible = false;
                    break;
                case '2':
                    this.color2(2, 4, 1);
                    this.owner.visible = true;
                    break;
                case '4':
                    this.color2(8, 1, 4);
                    this.owner.visible = true;
                    break;
                case '8':
                    this.color2(1, 1, 3);
                    this.owner.visible = true;
                    break;
                case '16':
                    this.color2(1, 3, 1);
                    this.owner.visible = true;
                    break;
                case '32':
                    this.color2(2, 3, 4);
                    this.owner.visible = true;
                    break;
                case '64':
                    this.color2(3, 1, 1);
                    this.owner.visible = true;
                    break;
                case '128':
                    this.color2(2.5, 1.28, 5.1);
                    this.owner.visible = true;
                    break;
                case '512':
                    this.color2(8, 4, 1);
                    this.owner.visible = true;
                    break;
                case '1024':
                    this.color2(8, 6, 3);
                    this.owner.visible = true;
                    break;
                case '2048':
                    this.color2(2, 6, 3);
                    this.owner.visible = true;
                    this.owner.parent.getChildByName('win').visible = true;
                    alert('you win');
                    break;
            }
        }
        color2(r, g, b) {
            var grayscaleMat = [
                r, 0, 0, 0, 0,
                g, 0, 0, 0, 0,
                b, 0, 0, 0, 0,
                0, 0, 0, 1, 0,
            ];
            var grayscaleFilter = new ColorFilter(grayscaleMat);
            this.owner.filters = [grayscaleFilter];
        }
        onDisable() {
        }
    }

    var Tween = Laya.Tween;
    class New2048 extends Laya.Script {
        constructor() {
            super();
            this.howMany = 4;
            this.m_x = 100;
            this.m_y = 0;
            this.m_total = 0;
            this.arr_Button = [];
            this.m_NumStrArr = [];
        }
        onEnable() {
            for (var i = 0; i < this.howMany; i++) {
                var varname = "var" + i;
                this[varname] = new Array(this.howMany).fill(0);
            }
            let bgBox = new Laya.Box();
            bgBox.size(this.owner.width, this.owner.height);
            this.owner.addChild(bgBox);
            for (let i = 0; i < this.howMany; i++) {
                for (let j = 0; j < this.howMany; j++) {
                    let b = Laya.Pool.getItemByCreateFun("" + this.m_total, this.Cube.create, this.Cube);
                    b.pos(this.m_x, this.m_y);
                    b.name = "" + this.m_total;
                    this.owner.addChild(b);
                    let bgImg = new Laya.Image("777/Space2.png");
                    bgImg.size(b.width, b.height);
                    bgImg.pos(this.m_x, this.m_y);
                    bgBox.addChild(bgImg);
                    this.m_x += 30;
                    this.m_total += 1;
                }
                this.m_y += 30;
                this.m_x = 100;
            }
            this.addNewCube();
            this.addNewCube();
            this.changeImg();
            this.isaction = false;
            this.owner.getChildByName('lose').visible = false;
        }
        onKeyUp(e) {
            if (e.keyCode === 39) {
                this.RightCalculation();
            }
            if (e.keyCode === 37) {
                this.LeftCalculation();
            }
            if (e.keyCode === 40) {
                this.DownCalculation();
            }
            if (e.keyCode === 38) {
                this.UpCalculation();
            }
            if (this.isaction === true) {
                this.addNewCube();
                this.changeImg();
                this.isaction = false;
            }
            this.checkLose();
        }
        checkLose() {
            let cheak = true;
            for (let i = 0; i < this.howMany - 1; i++) {
                for (let m = 0; m < this.howMany - 1; m++) {
                    if (this['var' + m][i] === this['var' + m][i + 1] || this['var' + m][i] === 0 || this['var' + m][i + 1] === 0) {
                        cheak = false;
                    }
                }
            }
            for (let j = 0; j < this.howMany; j++) {
                for (let m = 0; m < this.howMany - 1; m++)
                    if (this['var' + m][j] === this['var' + (m + 1)][j] || this['var' + m][j] === 0 || this['var' + (m + 1)][j] === 0) {
                        cheak = false;
                    }
            }
            if (cheak === true) {
                this.owner.getChildByName('lose').visible = true;
                console.log('123');
            }
        }
        RightCalculation() {
            for (let x = this.howMany - 1; x >= 0; x--) {
                for (let y = x - 1; y >= 0; y--) {
                    for (let m = 0; m < this.howMany; m++) {
                        if (this['var' + m][x] === 0 && this['var' + m][y] > 0) {
                            this['var' + m][x] = this['var' + m][y];
                            this['var' + m][y] = 0;
                            this.start_RightLeftAni(m, x, y);
                            this.isaction = true;
                        }
                    }
                }
            }
            for (let i = this.howMany - 1; i > 0; i--) {
                for (let m = 0; m < this.howMany; m++) {
                    if (this['var' + m][i] === this['var' + m][i - 1]) {
                        if (this['var' + m][i] === this['var' + m][i - 1] && this['var' + m][i] !== 0) {
                            this.start_RightLeftAni(m, i, i - 1);
                            this.isaction = true;
                        }
                        this['var' + m][i] += this['var' + m][i - 1];
                        this['var' + m][i - 1] = 0;
                    }
                }
            }
            for (let x = this.howMany - 1; x >= 0; x--) {
                for (let y = x - 1; y >= 0; y--) {
                    for (let m = 0; m < this.howMany; m++) {
                        if (this['var' + m][x] === 0 && this['var' + m][y] > 0) {
                            this['var' + m][x] = this['var' + m][y];
                            this['var' + m][y] = 0;
                            this.start_RightLeftAni(m, x, y);
                            this.isaction = true;
                        }
                    }
                }
            }
        }
        LeftCalculation() {
            for (let x = 0; x <= this.howMany - 1; x++) {
                for (let y = x + 1; y < this.howMany; y++) {
                    for (let m = 0; m < this.howMany; m++) {
                        if (this['var' + m][x] === 0 && this['var' + m][y] > 0) {
                            this['var' + m][x] = this['var' + m][y];
                            this['var' + m][y] = 0;
                            this.start_RightLeftAni(m, x, y);
                            this.isaction = true;
                        }
                    }
                }
            }
            for (let i = 0; i < this.howMany - 1; i++) {
                for (let m = 0; m < this.howMany; m++) {
                    if (this['var' + m][i] === this['var' + m][i + 1]) {
                        if (this['var' + m][i] === this['var' + m][i + 1] && this['var' + m][i] !== 0) {
                            this.start_RightLeftAni(m, i, i + 1);
                            this.isaction = true;
                        }
                        this['var' + m][i] += this['var' + m][i + 1];
                        this['var' + m][i + 1] = 0;
                    }
                }
            }
            for (let x = 0; x <= this.howMany - 1; x++) {
                for (let y = x + 1; y <= this.howMany - 1; y++) {
                    for (let m = 0; m < this.howMany; m++) {
                        if (this['var' + m][x] === 0 && this['var' + m][y] > 0) {
                            this['var' + m][x] = this['var' + m][y];
                            this['var' + m][y] = 0;
                            this.start_RightLeftAni(m, x, y);
                            this.isaction = true;
                        }
                    }
                }
            }
        }
        DownCalculation() {
            for (let x = this.howMany - 1; x >= 0; x--) {
                for (let m = this.howMany - 1; m > 0; m--) {
                    for (let n = m - 1; n >= 0; n--) {
                        if (this['var' + m][x] === 0 && this['var' + n][x] > 0) {
                            this['var' + m][x] = this['var' + n][x];
                            this['var' + n][x] = 0;
                            this.start_UpDownAni(m, x, n, x);
                            this.isaction = true;
                        }
                    }
                }
            }
            for (let i = this.howMany - 1; i >= 0; i--) {
                for (let m = this.howMany - 1; m > 0; m--) {
                    if (this['var' + m][i] === this['var' + (m - 1)][i]) {
                        if (this['var' + m][i] === this['var' + (m - 1)][i] && this['var' + m][i] !== 0) {
                            this.start_UpDownAni(m, i, (m - 1), i);
                            this.isaction = true;
                        }
                        this['var' + m][i] += this['var' + (m - 1)][i];
                        this['var' + (m - 1)][i] = 0;
                    }
                }
            }
            for (let x = this.howMany - 1; x >= 0; x--) {
                for (let m = this.howMany - 1; m > 0; m--) {
                    for (let n = m - 1; n >= 0; n--) {
                        if (this['var' + m][x] === 0 && this['var' + n][x] > 0) {
                            this['var' + m][x] = this['var' + n][x];
                            this['var' + n][x] = 0;
                            this.start_UpDownAni(m, x, n, x);
                            this.isaction = true;
                        }
                    }
                }
            }
        }
        UpCalculation() {
            for (let x = this.howMany - 1; x >= 0; x--) {
                for (let m = 0; m < this.howMany - 1; m++) {
                    for (let n = m + 1; n < this.howMany; n++) {
                        if (this['var' + m][x] === 0 && this['var' + n][x] > 0) {
                            this['var' + m][x] = this['var' + n][x];
                            this['var' + n][x] = 0;
                            this.start_UpDownAni(m, x, n, x);
                            this.isaction = true;
                        }
                    }
                }
            }
            for (let i = this.howMany - 1; i >= 0; i--) {
                for (let m = 0; m < this.howMany - 1; m++) {
                    if (this['var' + m][i] === this['var' + (m + 1)][i]) {
                        if (this['var' + m][i] === this['var' + (m + 1)][i] && this['var' + m][i] !== 0) {
                            this.start_UpDownAni(m, i, (m + 1), i);
                            this.isaction = true;
                        }
                        this['var' + m][i] += this['var' + (m + 1)][i];
                        this['var' + (m + 1)][i] = 0;
                    }
                }
            }
            for (let x = this.howMany - 1; x >= 0; x--) {
                for (let m = 0; m < this.howMany - 1; m++) {
                    for (let n = m + 1; n < this.howMany; n++) {
                        if (this['var' + m][x] === 0 && this['var' + n][x] > 0) {
                            this['var' + m][x] = this['var' + n][x];
                            this['var' + n][x] = 0;
                            this.start_UpDownAni(m, x, n, x);
                            this.isaction = true;
                        }
                    }
                }
            }
        }
        start_UpDownAni(rankgo, go, rankto, to) {
            go = go + (this.howMany * rankgo);
            to = to + (this.howMany * rankto);
            let original_go = this.owner.getChildByName("" + go).name;
            let original_to = this.owner.getChildByName("" + to).name;
            let original_go_node = this.owner.getChildIndex(this.owner.getChildByName("" + go));
            let original_to_node = this.owner.getChildIndex(this.owner.getChildByName("" + to));
            this.owner.getChildAt(original_go_node).name = original_to;
            this.owner.getChildAt(original_to_node).name = original_go;
            let original_position_go = this.owner.getChildByName("" + go).y;
            let original_position_to = this.owner.getChildByName("" + to).y;
            Tween.to(this.owner.getChildByName("" + go), { y: original_position_to }, 30, undefined, new Laya.Handler(this, () => {
                this.owner.getChildByName("" + go).y = original_position_to;
            }));
            this.owner.getChildByName("" + to).y = original_position_go;
            this.owner.getChildByName("" + go).y = original_position_to;
        }
        start_RightLeftAni(Rank, go, to) {
            go = go + (this.howMany * Rank);
            to = to + (this.howMany * Rank);
            let original_go = this.owner.getChildByName("" + go).name;
            let original_to = this.owner.getChildByName("" + to).name;
            let original_go_node = this.owner.getChildIndex(this.owner.getChildByName("" + go));
            let original_to_node = this.owner.getChildIndex(this.owner.getChildByName("" + to));
            this.owner.getChildAt(original_go_node).name = original_to;
            this.owner.getChildAt(original_to_node).name = original_go;
            let original_position_go = this.owner.getChildByName("" + go).x;
            let original_position_to = this.owner.getChildByName("" + to).x;
            Tween.to(this.owner.getChildByName("" + go), { x: original_position_to }, 30, undefined, new Laya.Handler(this, () => {
                this.owner.getChildByName("" + go).x = original_position_to;
            }));
            this.owner.getChildByName("" + to).x = original_position_go;
            this.owner.getChildByName("" + go).x = original_position_to;
        }
        init() {
            this.m_NumStrArr = [];
            for (let i = 0; i < this.howMany; i++) {
                for (let j = 0; j < this.howMany; j++) {
                    this.m_NumStrArr.push(this['var' + i][j].toString());
                }
            }
        }
        init_Button() {
            this.arr_Button = [];
            for (let i = 0; i < this.howMany * this.howMany; i++) {
                this.arr_Button.push(this.owner.getChildByName(i.toString()));
            }
        }
        changeImg() {
            this.init();
            this.init_Button();
            for (let i = 0; i < this.arr_Button.length; i++) {
                this.arr_Button[i].label = this.m_NumStrArr[i];
            }
        }
        addNewCube() {
            console.log('gg');
            let str = Math.round(Math.random() * ((this.howMany * this.howMany) - 1));
            console.log(str);
            let a = Math.floor(str / this.howMany);
            let b = str % this.howMany;
            if (this['var' + a][b] > 0) {
                this.addNewCube();
                return;
            }
            else if (this['var' + a][b] === 0) {
                this['var' + a][b] = this.random_CubeNum();
            }
        }
        random_CubeNum() {
            let num = Math.round(Math.random() * 10);
            return (num == 9 ? 4 : 2);
        }
    }

    class Mine extends Laya.Script {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
            this.howmany = 3;
            this.m_x = 50;
            this.down_y = 1;
            this.m_y = 30;
            this.boomtotal = 1;
            this.isboom = [];
            this.str = 0;
            this.isover = false;
            this.howmanyboom = 5;
            Mine.instance = this;
        }
        onEnable() {
            this.isover = false;
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
                    for (let q = 0; q < this.howmanyboom; q++) {
                    }
                    if (this.boomtotal === this.isboom[0] || this.boomtotal === this.isboom[1] || this.boomtotal === this.isboom[2] || this.boomtotal === this.isboom[3] || this.boomtotal === this.isboom[4]) {
                        let b = Laya.Pool.getItemByCreateFun("boom+" + this.boomtotal, this.boom.create, this.boom);
                        b.pos(this.m_x, this.m_y);
                        b.name = 'boon' + this.boomtotal;
                        this.owner.addChild(b);
                        this.m_x += 28;
                        this.boomtotal += 1;
                    }
                    else {
                        let n = Laya.Pool.getItemByCreateFun("noboom" + this.boomtotal, this.noboom.create, this.noboom);
                        n.pos(this.m_x, this.m_y);
                        n.name = 'boon' + this.boomtotal;
                        this.owner.addChild(n);
                        this.m_x += 28;
                        this.boomtotal += 1;
                    }
                }
                this.m_y += 25;
                this.m_x = 50;
            }
        }
        onDisable() {
        }
        onMouseDown() {
        }
        openboom() {
            this.isover = true;
        }
    }

    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var test;
        (function (test) {
            class TestSceneUI extends Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("test/TestScene");
                }
            }
            test.TestSceneUI = TestSceneUI;
            REG("ui.test.TestSceneUI", TestSceneUI);
        })(test = ui.test || (ui.test = {}));
    })(ui || (ui = {}));

    class GameControl extends Laya.Script {
        constructor() {
            super();
            this.createBoxInterval = 1000;
            this._time = 0;
            this._started = false;
        }
        onEnable() {
            this._time = Date.now();
            this._gameBox = this.owner.getChildByName("gameBox");
        }
        onUpdate() {
            let now = Date.now();
            if (now - this._time > this.createBoxInterval && this._started) {
                this._time = now;
                this.createBox();
            }
        }
        createBox() {
            let box = Laya.Pool.getItemByCreateFun("dropBox", this.dropBox.create, this.dropBox);
            box.pos(Math.random() * (Laya.stage.width - 100), -100);
            this._gameBox.addChild(box);
        }
        onStageClick(e) {
            e.stopPropagation();
            let flyer = Laya.Pool.getItemByCreateFun("bullet", this.bullet.create, this.bullet);
            flyer.pos(Laya.stage.mouseX, Laya.stage.mouseY);
            this._gameBox.addChild(flyer);
        }
        startGame() {
            if (!this._started) {
                this._started = true;
                this.enabled = true;
            }
        }
        stopGame() {
            this._started = false;
            this.enabled = false;
            this.createBoxInterval = 1000;
            this._gameBox.removeChildren();
        }
    }

    class GameUI extends ui.test.TestSceneUI {
        constructor() {
            super();
            GameUI.instance = this;
            Laya.MouseManager.multiTouchEnabled = false;
        }
        onEnable() {
            this._control = this.getComponent(GameControl);
            this.tipLbll.on(Laya.Event.CLICK, this, this.onTipClick);
        }
        onTipClick(e) {
            this.tipLbll.visible = false;
            this._score = 0;
            this.scoreLbl.text = "";
            this._control.startGame();
        }
        addScore(value = 1) {
            this._score += value;
            this.scoreLbl.changeText("分数：" + this._score);
            if (this._control.createBoxInterval > 600 && this._score % 20 == 0)
                this._control.createBoxInterval -= 20;
        }
        stopGame() {
            this.tipLbll.visible = true;
            this.tipLbll.text = "游戏结束了，点击屏幕重新开始";
            this._control.stopGame();
        }
    }

    class boomset extends Laya.Script {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
            this.texture1 = "res/777/Space1.png";
            this.texture2 = "res/777/Bomb.png";
            this.texture3 = "res/777/Flag.png";
        }
        onEnable() {
            this.boo = false;
            this.Minnnne = this.owner.parent.getComponent(Mine);
        }
        onDisable() {
        }
        onMouseDown() {
            this.owner.skin = this.texture2;
            if (this.boo === false)
                this.Minnnne.openboom();
        }
        onUpdate() {
            if (this.Minnnne.isover === true)
                this.owner.skin = this.texture2;
        }
        onRightClick() {
            this.owner.skin = this.texture3;
        }
    }

    class Bullet extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            var rig = this.owner.getComponent(Laya.RigidBody);
            rig.setVelocity({ x: 0, y: -10 });
        }
        onTriggerEnter(other, self, contact) {
            this.owner.removeSelf();
        }
        onUpdate() {
            if (this.owner.y < -10) {
                this.owner.removeSelf();
            }
        }
        onDisable() {
            Laya.Pool.recover("bullet", this.owner);
        }
    }

    class DropBox extends Laya.Script {
        constructor() {
            super();
            this.level = 1;
        }
        onEnable() {
            this._rig = this.owner.getComponent(Laya.RigidBody);
            this.level = Math.round(Math.random() * 5) + 1;
            this._text = this.owner.getChildByName("levelTxt");
            this._text.text = this.level + "";
        }
        onUpdate() {
            this.owner.rotation++;
        }
        onTriggerEnter(other, self, contact) {
            var owner = this.owner;
            if (other.label === "buttle") {
                if (this.level > 1) {
                    this.level--;
                    this._text.changeText(this.level + "");
                    owner.getComponent(Laya.RigidBody).setVelocity({ x: 0, y: -10 });
                    Laya.SoundManager.playSound("sound/hit.wav");
                }
                else {
                    if (owner.parent) {
                        let effect = Laya.Pool.getItemByCreateFun("effect", this.createEffect, this);
                        effect.pos(owner.x, owner.y);
                        owner.parent.addChild(effect);
                        effect.play(0, true);
                        owner.removeSelf();
                        Laya.SoundManager.playSound("sound/destroy.wav");
                    }
                }
                GameUI.instance.addScore(1);
            }
            else if (other.label === "ground") {
                owner.removeSelf();
                GameUI.instance.stopGame();
            }
        }
        createEffect() {
            let ani = new Laya.Animation();
            ani.loadAnimation("test/TestAni.ani");
            ani.on(Laya.Event.COMPLETE, null, recover);
            function recover() {
                ani.removeSelf();
                Laya.Pool.recover("effect", ani);
            }
            return ani;
        }
        onDisable() {
            Laya.Pool.recover("dropBox", this.owner);
        }
    }

    class noboomset extends Laya.Script {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
            this.texture1 = "res/777/Space1.png";
            this.texture2 = "res/777/Space2.png";
            this.texture3 = "res/777/Flag.png";
            this.t1 = "res/777/1.png";
            this.t2 = "res/777/2.png";
            this.t3 = "res/777/3.png";
            this.t4 = "res/777/4.png";
            this.t5 = "res/777/5.png";
            this.t6 = "res/777/6.png";
            this.t7 = "res/777/7.png";
            this.t8 = "res/777/8.png";
            this.mynum = 3;
        }
        onStart() {
        }
        onEnable() {
            this.Minnnne = this.owner.parent.getComponent(Mine);
            this.mynum = this.count();
            this.isopen = false;
        }
        onDisable() {
        }
        onMouseDown() {
            if (this.count() === 0) {
                this.owner.skin = this.texture2;
                this.hayhay();
            }
            else if (this.count() === 1) {
                this.owner.skin = this.t1;
            }
            else if (this.count() === 2) {
                this.owner.skin = this.t2;
            }
            else if (this.count() === 3) {
                this.owner.skin = this.t3;
            }
            else if (this.count() === 4) {
                this.owner.skin = this.t4;
            }
            else if (this.count() === 5) {
                this.owner.skin = this.t5;
            }
            else if (this.count() === 6) {
                this.owner.skin = this.t6;
            }
            else if (this.count() === 7) {
                this.owner.skin = this.t7;
            }
            else if (this.count() === 8) {
                this.owner.skin = this.t8;
            }
            this.isopen = true;
        }
        tnnn() {
            return this.owner.skin.toString();
        }
        onRightClick() {
            this.owner.skin = this.texture3;
        }
        pppp(_node) {
            this.spread(_node);
        }
        spread(_node) {
            if (_node == null)
                console.log("error");
            let _nodeScript = _node.getComponent(noboomset);
            if (_nodeScript.count() === 0) {
                _node.skin = this.texture2;
                this.isopen = true;
                _nodeScript.hayhay();
                console.log('123');
            }
            else if (_nodeScript.count() === 1) {
                _node.skin = this.t1;
                this.isopen = true;
            }
            else if (_nodeScript.count() === 2) {
                _node.skin = this.t2;
                this.isopen = true;
            }
            else if (_nodeScript.count() === 3) {
                _node.skin = this.t3;
                this.isopen = true;
            }
            else if (_nodeScript.count() === 4) {
                _node.skin = this.t4;
                this.isopen = true;
            }
            else if (_nodeScript.count() === 5) {
                _node.skin = this.t5;
                this.isopen = true;
            }
            else if (_nodeScript.count() === 6) {
                _node.skin = this.t6;
                this.isopen = true;
            }
            else if (_nodeScript.count() === 7) {
                _node.skin = this.t7;
                this.isopen = true;
            }
            else if (_nodeScript.count() === 8) {
                _node.skin = this.t8;
                this.isopen = true;
            }
        }
        lll() {
            console.log('loolool');
        }
        hayhay() {
            console.log('hyhy');
            let _parent = this.owner.parent;
            let indexOfthisOwner = this.owner.parent.getChildIndex(this.owner);
            let i = _parent.numChildren;
            let iii = indexOfthisOwner + 1;
            let arr_1 = [1, -1, -this.Minnnne.howmany, -(this.Minnnne.howmany + 1), -(this.Minnnne.howmany - 1), this.Minnnne.howmany, this.Minnnne.howmany + 1, this.Minnnne.howmany - 1];
            let arr_for_1 = [1, this.Minnnne.howmany, this.Minnnne.howmany + 1];
            let arr_2 = [1, -1, this.Minnnne.howmany, (this.Minnnne.howmany + 1), (this.Minnnne.howmany - 1)];
            let arr_1_right = [-1, this.Minnnne.howmany, this.Minnnne.howmany - 1];
            let arr_left = [1, -this.Minnnne.howmany, -(this.Minnnne.howmany - 1), this.Minnnne.howmany, this.Minnnne.howmany + 1];
            let arr_right = [-1, -this.Minnnne.howmany, -(this.Minnnne.howmany + 1), this.Minnnne.howmany, this.Minnnne.howmany - 1];
            if (this.isopen === false) {
                if (indexOfthisOwner === 0) {
                    for (let i = 0; i < arr_for_1.length; i++) {
                        this.pppp(this.owner.parent.getChildAt(indexOfthisOwner + arr_for_1[i]));
                        continue;
                    }
                }
                else if (indexOfthisOwner === this.Minnnne.howmany) {
                    for (let i = 0; i < arr_left.length; i++) {
                        this.pppp(this.owner.parent.getChildAt(indexOfthisOwner + arr_left[i]));
                    }
                }
                else if (indexOfthisOwner >= 1 && indexOfthisOwner < this.Minnnne.howmany - 1) {
                    for (let i = 0; i < arr_2.length; i++) {
                        this.pppp(this.owner.parent.getChildAt(indexOfthisOwner + arr_2[i]));
                    }
                }
                else if (indexOfthisOwner === this.Minnnne.howmany - 1) {
                    for (let i = 0; i < arr_1_right.length; i++) {
                        this.pppp(this.owner.parent.getChildAt(indexOfthisOwner + arr_1_right[i]));
                    }
                }
                else if (indexOfthisOwner % this.Minnnne.howmany === 0 && indexOfthisOwner !== 1) {
                    for (let i = 0; i < arr_left.length; i++) {
                        if ((indexOfthisOwner + arr_left[i]) < this.Minnnne.howmany * this.Minnnne.howmany)
                            this.pppp(this.owner.parent.getChildAt(indexOfthisOwner + arr_left[i]));
                    }
                }
                else if (indexOfthisOwner % this.Minnnne.howmany === this.Minnnne.howmany - 1 && indexOfthisOwner !== this.Minnnne.howmany) {
                    for (let i = 0; i < arr_right.length; i++) {
                        if ((indexOfthisOwner + arr_right[i]) < this.Minnnne.howmany * this.Minnnne.howmany)
                            this.pppp(this.owner.parent.getChildAt(indexOfthisOwner + arr_right[i]));
                    }
                }
                else {
                    for (let i = 0; i < arr_1.length; i++) {
                        if ((indexOfthisOwner + arr_1[i]) < this.Minnnne.howmany * this.Minnnne.howmany)
                            this.pppp(this.owner.parent.getChildAt(indexOfthisOwner + arr_1[i]));
                    }
                }
            }
        }
        count() {
            let _parent = this.owner.parent;
            let xxx = this.owner.parent.getChildIndex(this.owner);
            let iii = xxx + 1;
            let total = 0;
            let arr_1 = [1, -1, -this.Minnnne.howmany, -(this.Minnnne.howmany + 1), -(this.Minnnne.howmany - 1), this.Minnnne.howmany, this.Minnnne.howmany + 1, this.Minnnne.howmany - 1];
            let arr_for_1 = [1, this.Minnnne.howmany, this.Minnnne.howmany + 1];
            let arr_2 = [1, -1, this.Minnnne.howmany, (this.Minnnne.howmany + 1), (this.Minnnne.howmany - 1)];
            let arr_1_right = [-1, this.Minnnne.howmany, this.Minnnne.howmany - 1];
            let arr_left = [1, -this.Minnnne.howmany, -(this.Minnnne.howmany - 1), this.Minnnne.howmany, this.Minnnne.howmany + 1];
            let arr_right = [-1, -this.Minnnne.howmany, -(this.Minnnne.howmany + 1), this.Minnnne.howmany, this.Minnnne.howmany - 1];
            if (xxx === 0) {
                for (let i = 0; i < arr_for_1.length; i++) {
                    let item = this.Minnnne.isboom.find(e => e - 1 === xxx + arr_for_1[i]);
                    if (item === undefined) {
                        total += 0;
                    }
                    else {
                        total += 1;
                    }
                }
            }
            else if (xxx === this.Minnnne.howmany) {
                for (let i = 0; i < arr_left.length; i++) {
                    let item = this.Minnnne.isboom.find(e => e - 1 === xxx + arr_left[i]);
                    if (item === undefined) {
                        total += 0;
                    }
                    else {
                        total += 1;
                    }
                }
            }
            else if (xxx > 1 && xxx < this.Minnnne.howmany - 1) {
                for (let i = 0; i < arr_2.length; i++) {
                    let item = this.Minnnne.isboom.find(e => e - 1 === xxx + arr_2[i]);
                    if (item === undefined) {
                        total += 0;
                    }
                    else {
                        total += 1;
                    }
                }
            }
            else if (xxx === this.Minnnne.howmany - 1) {
                for (let i = 0; i < arr_1_right.length; i++) {
                    let item = this.Minnnne.isboom.find(e => e - 1 === xxx + arr_1_right[i]);
                    if (item === undefined) {
                        total += 0;
                    }
                    else {
                        total += 1;
                    }
                }
            }
            else if (xxx % this.Minnnne.howmany === 0 && xxx !== 1) {
                for (let i = 0; i < arr_left.length; i++) {
                    let item = this.Minnnne.isboom.find(e => e - 1 === xxx + arr_left[i]);
                    if (item === undefined) {
                        total += 0;
                    }
                    else {
                        total += 1;
                    }
                }
            }
            else if (xxx % this.Minnnne.howmany === this.Minnnne.howmany - 1 && xxx !== this.Minnnne.howmany) {
                for (let i = 0; i < arr_right.length; i++) {
                    let item = this.Minnnne.isboom.find(e => e - 1 === xxx + arr_right[i]);
                    if (item === undefined) {
                        total += 0;
                    }
                    else {
                        total += 1;
                    }
                }
            }
            else {
                for (let i = 0; i < arr_1.length; i++) {
                    let item = this.Minnnne.isboom.find(e => e - 1 === xxx + arr_1[i]);
                    if (item === undefined) {
                        total += 0;
                    }
                    else {
                        total += 1;
                    }
                }
            }
            return total;
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("script/color2048.ts", color2048);
            reg("script/New2048.ts", New2048);
            reg("script/Mine.ts", Mine);
            reg("script/GameUI.ts", GameUI);
            reg("script/GameControl.ts", GameControl);
            reg("script/boomset.ts", boomset);
            reg("script/Bullet.ts", Bullet);
            reg("script/DropBox.ts", DropBox);
            reg("script/noboomset.ts", noboomset);
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "20481.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = true;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
