import { StartScreen } from "./game/StartScene";
import { Renderer } from "./Engine/Renderer/Renderer";
import { SceneManager } from "./Engine/Scene/SceneManager";
import { Game } from "./Engine/Core/Game";  
import {PlayScene} from "./game/PlayScene";

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
var startScreen = new StartScreen();
var render = new Renderer(canvas)
var gamePlay = new PlayScene();
var gameScene = new SceneManager();
gameScene.addScene(startScreen);
gameScene.addScene(gamePlay);
var myGame = new Game(gameScene);
myGame.start(render);