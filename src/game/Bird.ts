// import {GameObject, Sprite, Scene, ImageObject,Renderer} from "../Engine"
// class PlayScene extends Scene {
//     update(){
//         for (var i = 0; i <this.imageObjects.length; i++) {
//             this.imageObjects[i].update();
//         }
//         for (var i = 0; i <this.sprites.length; i++) {
//             this.sprites[i].update();
//         }
//     }
//     handleInputEvent(): void {
        
//     }
// }
// class Bird extends Sprite {
//     gravity : number;
//     speed : number;
//     constructor(x: number, y: number, width: number, height: number,images: Array<string>,degrees: number,gravity: number,speed: number){
//         super(x, y, width, height,images,degrees);
//         this.gravity = gravity;
//         this.speed = speed;
//     }
//     update(){
//         this.y += this.speed + 0.5*this.gravity;
//         this.speed += this.gravity;
//         if(this.speed>0){
//             this.degrees = 20;
//         }
//         else{
//             this.fameCurrent+=1;
//             if(this.fameCurrent>this.images.length){
//             this.degrees = 0;
//         }
//         }
//     }
// }
// var test = new GameObject(0,0,0,0);
// var bird = new Bird(100,30,50,50,
//     [
//         "../Images/bird/frame-1.png",
//         "../Images/bird/frame-2.png",
//         "../Images/bird/frame-3.png",
//         "../Images/bird/frame-4.png",
//         "../Images/bird/frame-5.png",
//         "../Images/bird/frame-6.png",
//         "../Images/bird/frame-7.png",
//         "../Images/bird/frame-8.png",
//     ],0,1,0.5 
//     );
// const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
// var render = new Renderer(canvas)
// render.drawSprite(bird)
// var pipeUp = new ImageObject(0,0,50,350,
//     "./Images/pipe-green.png",
//     0);
// var pipeDown = new ImageObject(0,0,50,350,
//     "./Images/pipe-green.png",
//     0);
// var pipe = [pipeUp, pipeDown];
// var gameStart = new PlayScene(pipe,[bird]);


// // export class Bird{
// //     private x: number;
// //     private y: number;
// //     width: number;
// //     height: number;
// //     private speed: number;
// //     private images: Array<string>;
// //     private fameCurrent: number;
// //     private degrees: number;
// //     constructor(width:number, height:number, images: Array<string>){
// //         this.x = 100;
// //         this.y = 30;
// //         this.speed = 0;
// //         this.images = images;
// //         this.fameCurrent =0 ;
// //         this.degrees = 0;
// //         this.width = width;
// //         this.height = height;
// //     }

// //     update(gravity: number){
// //         this.y += this.speed + 0.5*gravity;
// //         this.speed += gravity;
// //     }
// //     fly(){
// //         this.speed = -5 ;
// //     }
// //     getPosition(){
// //         return [this.x, this.y];
// //     }
// //     public draw(){
// //         const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;;
// //         const ctx = canvas.getContext('2d');
// //         var img = new Image();
// //         if( this.fameCurrent%10==0){
// //             img.src = this.images[this.fameCurrent/10];
// //         }
// //         else{
// //             img.src = this.images[Math.floor(this.fameCurrent/10)];
// //         }
// //         if(ctx!=null){
// //             ctx.rotate(this.degrees * Math.PI / 180);
// //             ctx.drawImage(img, this.x, this.y,this.width,this.height);
// //         }
// //         console.log("render bird");
// //         this.fameCurrent+=1;
// //         if(this.fameCurrent==21){
// //             this.fameCurrent =0;
// //         }
// //     }
// // }