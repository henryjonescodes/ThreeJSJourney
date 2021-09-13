import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Colors
const parameters = {
    ambientColor: 0xffffff,
    directionalColor: 0x00fffc,
    hemisphereColor1: 0xff0000,
    hemisphereColor2: 0x0000ff,
    pointColor: 0xff9000,
    rectAreaColor: 0x4e00ff,
    spotlightColor: 0x78ff00
}

//Debug 
var colorGUI = gui.addFolder("Colors")
colorGUI.addColor(parameters, 'ambientColor').onChange(() =>{ambientLight.color.set(parameters.ambientColor)})
colorGUI.addColor(parameters, 'directionalColor').onChange(() =>{directionalLight.color.set(parameters.directionalColor)})
colorGUI.addColor(parameters, 'hemisphereColor1').onChange(() =>{hemisphereLight.color.set(parameters.hemisphereColor1)})
colorGUI.addColor(parameters, 'hemisphereColor2').onChange(() =>{hemisphereLight.groundColor.set(parameters.hemisphereColor2)})
colorGUI.addColor(parameters, 'pointColor').onChange(() =>{pointLight.color.set(parameters.pointColor)})
colorGUI.addColor(parameters, 'rectAreaColor').onChange(() =>{rectAreaLight.color.set(parameters.rectAreaColor)})
colorGUI.addColor(parameters, 'spotlightColor').onChange(() =>{spotLight.color.set(parameters.spotlightColor)})

  
/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
ambientLight.visible = false
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
directionalLight.position.set(1, 0.25, 0)
directionalLight.visible = false
scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
hemisphereLight.visible = false
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(0xff9000, 0.5)
pointLight.position.set(1, - 0.5, 1)
pointLight.visible = false
scene.add(pointLight)

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
rectAreaLight.position.set(- 1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
rectAreaLight.visible = false
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
spotLight.visible = false
scene.add(spotLight)
//must add target to scene too
spotLight.target.position.x = - 0.75
scene.add(spotLight.target)


//Helpers 
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
hemisphereLightHelper.visible = false
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
directionalLightHelper.visible = false
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
pointLightHelper.visible = false
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
spotLightHelper.visible = false
scene.add(spotLightHelper)
window.requestAnimationFrame(() =>
{
    spotLightHelper.update()
})

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
rectAreaLightHelper.visible = false
scene.add(rectAreaLightHelper)

//Debug 
var ambientGUI = gui.addFolder("Ambient Light")
ambientGUI.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
ambientGUI.add(ambientLight, 'visible')

var hemisphereGUI = gui.addFolder("Hemisphere Light")
hemisphereGUI.add(hemisphereLight, 'intensity').min(0).max(5).step(0.001)
hemisphereGUI.add(hemisphereLight, 'visible')
hemisphereGUI.add(hemisphereLightHelper, 'visible').name('helper')

var directionalGUI = gui.addFolder("Directional Light")
directionalGUI.add(directionalLight, 'intensity').min(0).max(5).step(0.001)
directionalGUI.add(directionalLight, 'visible')
directionalGUI.add(directionalLightHelper, 'visible').name('helper')

var pointGUI = gui.addFolder("Point Light")
pointGUI.add(pointLight, 'intensity').min(0).max(5).step(0.001)
pointGUI.add(pointLight, 'distance').min(0).max(30).step(0.01)
pointGUI.add(pointLight, 'decay').min(0).max(5).step(0.001)
pointGUI.add(pointLight, 'visible')
pointGUI.add(pointLightHelper, 'visible').name('helper')

var rectAreaGUI = gui.addFolder("RectArea Light")
rectAreaGUI.add(rectAreaLight, 'intensity').min(0).max(10).step(0.001)
rectAreaGUI.add(rectAreaLight, 'height').min(0).max(30).step(0.001)
rectAreaGUI.add(rectAreaLight, 'width').min(0).max(30).step(0.001)
rectAreaGUI.add(rectAreaLight, 'visible')
rectAreaGUI.add(rectAreaLightHelper, 'visible').name('helper')

var spotlightGUI = gui.addFolder("Spot Light")
spotlightGUI.add(spotLight, 'intensity').min(0).max(10).step(0.001)
spotlightGUI.add(spotLight, 'distance').min(0).max(30).step(0.01)
spotlightGUI.add(spotLight, 'decay').min(0).max(5).step(0.001)
spotlightGUI.add(spotLight, 'penumbra').min(0).max(1).step(0.001)
spotlightGUI.add(spotLight, 'visible')
spotlightGUI.add(spotLightHelper, 'visible').name('helper')


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()