export class CinematicCamera {
  constructor(scene, target, level) { this.scene = scene; this.target = target; this.camera = scene.cameras.main; this.camera.setBounds(0, 0, level.width, level.height); this.camera.setDeadzone(86, 42); this.camera.startFollow(target, false, 0.08, 0.08); this.camera.setZoom(2.25); }
  update(speed, danger) { const targetZoom = danger ? 2.05 : speed > 260 ? 2.12 : 2.25; this.camera.zoom += (targetZoom - this.camera.zoom) * 0.025; }
  impact(intensity = 0.006, duration = 90) { this.camera.shake(duration, intensity); }
  zoneTransition() { this.camera.fadeIn(260, 7, 17, 31); }
}
