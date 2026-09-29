import {Vector3} from 'three';
export function spherePositions(positions){
 let radius=1;for(const p of positions.values())radius=Math.max(radius,Math.hypot(p.x,p.y));
 const out=new Map();for(const [id,p] of positions){const r=Math.hypot(p.x,p.y),angle=r/radius*2.65;out.set(id,r<1e-8?new Vector3(0,0,1.033):new Vector3(Math.sin(angle)*p.x/r,Math.sin(angle)*p.y/r,Math.cos(angle)).multiplyScalar(1.033));}return out;
}
export function arcPoints(start,end,segments=40){
 const a=start.clone().normalize(),b=end.clone().normalize(),dot=Math.max(-1,Math.min(1,a.dot(b))),angle=Math.acos(dot),points=[];
 let tangent=b.clone().addScaledVector(a,-dot);
 if(tangent.lengthSq()<1e-10)tangent=new Vector3(Math.abs(a.y)<.9?0:1,Math.abs(a.y)<.9?1:0,0).cross(a);
 tangent.normalize();
 for(let i=0;i<=segments;i++){const t=i/segments;points.push(a.clone().multiplyScalar(Math.cos(angle*t)).addScaledVector(tangent,Math.sin(angle*t)).normalize().multiplyScalar(1.033+.035*Math.sin(Math.PI*t)*Math.min(1,angle)));}
 return points;
}
export function frontFacing(point,camera){return point.dot(camera.clone().sub(point))>0;}
