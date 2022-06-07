import { startScene } from "./game/StartScene";
import { Renderer } from "./Engine/Renderer/Renderer";
import { SceneManager } from "./Engine/Scene/SceneManager";
import { Game } from "./Engine/Core/Game";  
import {playScene} from "./game/PlayScene";

var canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
var render = new Renderer(canvas)
var gameScene = new SceneManager();
gameScene.addScene(startScene);
gameScene.addScene(playScene);
var myGame = new Game(gameScene);
myGame.start(render);