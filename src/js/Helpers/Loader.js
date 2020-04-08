import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

const Loader = {

    /**
     * LOAD FBX
     * @param path
     * @returns {Promise<any>}
     */
    loadFbx(path) {
        return new Promise((resolve, reject) => {
            const loader = new FBXLoader();
            loader.load(path, (obj)=> {
                resolve(obj)
            }, this.onProgress, this.onError);
        });
    },

    /**
     * LOAD GLTF
     * @param path
     * @returns {Promise<any>}
     */
     loadGLTF(path) {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();
            loader.load(path, (obj)=> {
                resolve(obj.scene)
            }, this.onProgress, this.onError);
        });
    },




    onProgress(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
        }
    },

    onError(e) {
        console.log(e)
    }
};
export default Loader
