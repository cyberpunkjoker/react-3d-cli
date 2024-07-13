import { Application, Sprite, Assets, Graphics } from 'pixi.js';

enum DirectionType {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right'
}

interface IProps {
  warp: HTMLDivElement;
}

interface PointProps {
  x: number;
  y: number;
}

interface OffsetProps {
  offsetX: number;
  offsetY: number;
}

class Snake {
  /** 圆半径 */
  arcRadius: number = 10;
  width: number = 800;
  height: number = 600;
  /** 食物位置 */
  radomFood: PointProps = { x: 0, y: 0 };
  app: Application;
  snakeBodyList: any[] = [];
  /** 移动方向 */ 
  currentDirection: keyof typeof DirectionType = 'right';
  /** 移动速度 px/帧 */
  speed: number = 15;
  /** 倍速 */
  accelerate: number = 1;

  count: number = 0

  constructor(props: IProps) {
    const { warp } = props;
    this.initApp(warp);
  }

  async initApp(warp: HTMLDivElement) {
    this.app = new Application();
    await this.app.init({ width: this.width, height: this.height });
    warp.appendChild(this.app.canvas);

    // 初始位置
    this.snakeBodyList.push(...[this.width / 2, this.height / 2])

    // 初始食物位置
    this.getRadomFood();

    this.getStart() 
  }

  getStart() {

    // 绘制初始蛇身
    this.drawBodyMove()

    // 监听键盘事件
    this.addEvevtListener()
  }
 

  randomPosition() {
    const x = Math.floor(Math.random() * this.width);
    const y = Math.floor(Math.random() * this.height);
    return { x, y };
  }

  makeRadomFood() {
    const { x, y } = this.radomFood
    const food = new Graphics()
      .arc(x, y, this.arcRadius,  0, Math.PI * 2, false)
      .fill('red');
    this.drawSnake(food);
  }

  makeArc({x, y}: PointProps) {
    const graphics = new Graphics()
      .arc(x, y, this.arcRadius, 0, Math.PI * 2, false)
      .fill('blue')

    this.app.stage.addChild(graphics);
  }

  addNewHead () {
    const [headX, headY] = [this.snakeBodyList[0], this.snakeBodyList[1]]
    switch (this.currentDirection) {
      case DirectionType.top:
        this.snakeBodyList.unshift(headX, headY - 2 * this.arcRadius)
        break;
      case DirectionType.bottom:
        this.snakeBodyList.unshift(headX, headY + 2 * this.arcRadius)
        break;
      case DirectionType.left:
        this.snakeBodyList.unshift(headX - 2 * this.arcRadius, headY)
        break;
      case DirectionType.right:
        this.snakeBodyList.unshift(headX + 2 * this.arcRadius, headY)
        break;
      default:
        break;
    } 
  }

  moveDirction () {
    let [offsetX, offsetY] = [0, 0]
    const speed = this.speed * this.accelerate
    switch (this.currentDirection) {
      case DirectionType.top:
        [offsetX, offsetY] = [0, -speed]
        break;
      case DirectionType.bottom:
        [offsetX, offsetY] = [0, speed]
        break;
      case DirectionType.left:
        [offsetX, offsetY] = [-speed, 0]
        break;
      case DirectionType.right:
        [offsetX, offsetY] = [speed, 0]
        break;
      default:
        break;
    }

    return [ offsetX, offsetY ]
  }

  isGetFood() {
    const [headX, headY] = [this.snakeBodyList[0], this.snakeBodyList[1]]
    const [foodX, foodY] = [this.radomFood.x, this.radomFood.y]

    if (
      Math.abs(foodX - headX) < 2 * this.arcRadius && 
      Math.abs(foodY - headY) < 2 * this.arcRadius
    ) {
      this.addNewHead()
      this.getRadomFood()
    }
  }

  movePoints({ offsetX, offsetY }: OffsetProps) {
    // 第一位 + 1
    const firstX = this.snakeBodyList[0] + offsetX;
    const firstY = this.snakeBodyList[1] + offsetY;
    
    // 舍弃最后一位 x，y
    this.snakeBodyList.pop()
    this.snakeBodyList.pop()

    this.snakeBodyList.unshift(firstX, firstY)
  }

  drawBodyMove() {
    this.app.ticker.add(() => {

      this.count += 1;
      if (this.count % 3 !== 0) return


      // 清空画布
      this.app.stage.removeChildren();

      // 判断是否吃到食物
      this.isGetFood()
      
      for (let i = 0; i < this.snakeBodyList.length; i+=2 ) {
        const x = this.snakeBodyList[i];
        const y = this.snakeBodyList[i+1];
        this.makeArc({x, y})
      }
      const [offsetX, offsetY] = this.moveDirction()

      this.movePoints({ offsetX, offsetY })
      this.makeRadomFood();
    })
    
  }

  handleKeyDown(event: KeyboardEvent) {
    const { key } = event;
    this.accelerate = 1.5
    switch (key) {
      case 'ArrowUp':
        this.currentDirection = DirectionType.top
        break;
      case 'ArrowDown':
        this.currentDirection = DirectionType.bottom
        break;
      case 'ArrowLeft':
        this.currentDirection = DirectionType.left
        break;
      case 'ArrowRight':
        this.currentDirection = DirectionType.right
        break;
      default:
        break;
    } 
  }

  leaveKeyBoard() {
    this.accelerate = 1
  }

  getRadomFood() {
    this.radomFood = this.randomPosition();
  }

  addEvevtListener() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.leaveKeyBoard.bind(this));
  }

  removeEvevtListener() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    document.removeEventListener('keyup', this.leaveKeyBoard.bind(this));
  }

  clear() {
    this.app.stage.removeChildren();
  }

  drawSnake(shape: any) {
    this.app.stage.addChild(shape);
  }

}


export default Snake;