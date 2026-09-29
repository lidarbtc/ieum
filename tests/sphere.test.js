import test from 'node:test';
import assert from 'node:assert/strict';
import {Vector3} from 'three';
import {spherePositions,arcPoints,frontFacing} from '../src/sphere-math.js';
test('nodes occupy a sphere surface in three dimensions',()=>{
 const positions=spherePositions(new Map([['center',{x:0,y:0}],['right',{x:100,y:0}],['top',{x:0,y:70}],['left',{x:-100,y:0}]]));
 for(const p of positions.values())assert.ok(Math.abs(p.length()-1.033)<1e-9);
 assert.ok(positions.get('center').z>1);assert.ok(positions.get('right').z<0);assert.ok(positions.get('top').y>0);
});
test('curved edges stay outside globe and meet both nodes',()=>{
 const a=new Vector3(0,0,1.033),b=new Vector3(1.033,0,0),points=arcPoints(a,b);
 assert.ok(points[0].distanceTo(a)<1e-10);assert.ok(points.at(-1).distanceTo(b)<1e-10);
 for(const p of points)assert.ok(p.length()>=1.033-1e-9);
 assert.ok(points[20].length()>1.04);
});
test('antipodal and identical endpoints remain finite',()=>{
 for(const b of [new Vector3(0,0,-1.033),new Vector3(0,0,1.033)]){
  const ps=arcPoints(new Vector3(0,0,1.033),b);for(const p of ps)assert.ok([p.x,p.y,p.z].every(Number.isFinite));assert.ok(ps.at(-1).distanceTo(b)<1e-9);
 }
});
test('rear and horizon nodes cannot be selected through the sphere',()=>{
 const camera=new Vector3(0,0,3.6);assert.ok(frontFacing(new Vector3(0,0,1.033),camera));assert.ok(!frontFacing(new Vector3(0,0,-1.033),camera));assert.ok(!frontFacing(new Vector3(1.033,0,0),camera));
});
