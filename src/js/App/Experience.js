import * as THREE from 'three'

import SceneManager from './Scene/SceneManager'
import CameraManager from "./Camera/CameraManager";

export default class Experience {

    constructor(isDebug) {
        console.log("Experience constructor");
        this._mouseX=0;
        this._mouseY=0;
        this._isDebug = isDebug;
        this.cameraManager = new CameraManager();
        this.sceneManager = new SceneManager();
        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.renderer.setSize(width, height);

            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        });

        this.init();
        this._animate();
    }

    init() {
        this.container = document.getElementById('game');

        this.camera = this.cameraManager.camera;
        console.log(this.camera);
        this.scene = this.sceneManager.scene;
        console.log(this.scene);

        this.scene.background = new THREE.Color(0xff00f0)

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
    }

    _animate() {
        this.render();
        requestAnimationFrame(this._animate.bind(this));
    }

    render() {
        this.camera.position.y += (-this._mouseY - this.camera.position.y) * .05;
        this.camera.position.x += (this._mouseX- this.camera.position.x) * .05;
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);

    }

    onDocumentMouseMove() {
        this._mouseX = (event.clientX - window.innerWidth / 2) / 2;
        this._mouseY = (event.clientY - window.innerHeight / 2) / 2;
    }


}
