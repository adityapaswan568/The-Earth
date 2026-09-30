import * as THREE from 'three';

export function latLonToVector3(lat: number, lon: number, radius: number = 1): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export function latLonToEuler(lat: number, lon: number): [number, number, number] {
  const rotX = (lat * Math.PI) / 180;
  const rotY = -((lon + 90) * Math.PI) / 180;
  return [rotX, rotY, 0];
}
