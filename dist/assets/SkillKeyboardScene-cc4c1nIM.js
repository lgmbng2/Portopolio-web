import{V as P,B as $,r as a,S as X,u as L,W as k,P as q,M as J,a as Q,C as O,b as H,c as K,j as u,d as ee,e as te,f as re,g as C}from"./index-xAN-0fBY.js";function V(){return V=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var s=arguments[n];for(var e in s)({}).hasOwnProperty.call(s,e)&&(t[e]=s[e])}return t},V.apply(null,arguments)}function ne(t,n=Math.PI/3){const s=Math.cos(n),e=(1+1e-10)*100,r=[new P,new P,new P],l=new P,f=new P,o=new P,c=new P;function p(v){const x=~~(v.x*e),i=~~(v.y*e),g=~~(v.z*e);return`${x},${i},${g}`}const h=t.index?t.toNonIndexed():t,d=h.attributes.position,y={};for(let v=0,x=d.count/3;v<x;v++){const i=3*v,g=r[0].fromBufferAttribute(d,i+0),m=r[1].fromBufferAttribute(d,i+1),j=r[2].fromBufferAttribute(d,i+2);l.subVectors(j,m),f.subVectors(g,m);const w=new P().crossVectors(l,f).normalize();for(let M=0;M<3;M++){const R=r[M],b=p(R);b in y||(y[b]=[]),y[b].push(w)}}const S=new Float32Array(d.count*3),D=new $(S,3,!1);for(let v=0,x=d.count/3;v<x;v++){const i=3*v,g=r[0].fromBufferAttribute(d,i+0),m=r[1].fromBufferAttribute(d,i+1),j=r[2].fromBufferAttribute(d,i+2);l.subVectors(j,m),f.subVectors(g,m),o.crossVectors(l,f).normalize();for(let w=0;w<3;w++){const M=r[w],R=p(M),b=y[R];c.set(0,0,0);for(let T=0,z=b.length;T<z;T++){const I=b[T];o.dot(I)>s&&c.add(I)}c.normalize(),D.setXYZ(i+w,c.x,c.y,c.z)}}return h.setAttribute("normal",D),h}const oe={uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `},ae={uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `},U=1e-5;function se(t,n,s){const e=new X,r=s-U;return e.absarc(U,U,U,-Math.PI/2,-Math.PI,!0),e.absarc(U,n-r*2,U,Math.PI,Math.PI/2,!0),e.absarc(t-r*2,n-r*2,U,Math.PI/2,0,!0),e.absarc(t-r*2,U,U,0,-Math.PI/2,!0),e}const ce=a.forwardRef(function({args:[n=1,s=1,e=1]=[],radius:r=.05,steps:l=1,smoothness:f=4,bevelSegments:o=4,creaseAngle:c=.4,children:p,...h},d){const y=a.useMemo(()=>se(n,s,r),[n,s,r]),S=a.useMemo(()=>({depth:e-r*2,bevelEnabled:!0,bevelSegments:o*2,steps:l,bevelSize:r-U,bevelThickness:r,curveSegments:f}),[e,r,f]),D=a.useRef(null);return a.useLayoutEffect(()=>{D.current&&(D.current.center(),ne(D.current,c))},[y,S]),a.createElement("mesh",V({ref:d},h),a.createElement("extrudeGeometry",{ref:D,args:[y,S]}),p)}),ue=a.forwardRef(({scale:t=10,frames:n=1/0,opacity:s=1,width:e=1,height:r=1,blur:l=1,near:f=0,far:o=10,resolution:c=512,smooth:p=!0,color:h="#000000",depthWrite:d=!1,renderOrder:y,...S},D)=>{const v=a.useRef(null),x=L(B=>B.scene),i=L(B=>B.gl),g=a.useRef(null);e=e*(Array.isArray(t)?t[0]:t||1),r=r*(Array.isArray(t)?t[1]:t||1);const[m,j,w,M,R,b,T]=a.useMemo(()=>{const B=new k(c,c),F=new k(c,c);F.texture.generateMipmaps=B.texture.generateMipmaps=!1;const W=new q(e,r).rotateX(Math.PI/2),Y=new J(W),E=new Q;E.depthTest=E.depthWrite=!1,E.onBeforeCompile=A=>{A.uniforms={...A.uniforms,ucolor:{value:new O(h)}},A.fragmentShader=A.fragmentShader.replace("void main() {",`uniform vec3 ucolor;
           void main() {
          `),A.fragmentShader=A.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );")};const _=new H(oe),Z=new H(ae);return Z.depthTest=_.depthTest=!1,[B,W,E,Y,_,Z,F]},[c,e,r,t,h]),z=B=>{M.visible=!0,M.material=R,R.uniforms.tDiffuse.value=m.texture,R.uniforms.h.value=B*1/256,i.setRenderTarget(T),i.render(M,g.current),M.material=b,b.uniforms.tDiffuse.value=T.texture,b.uniforms.v.value=B*1/256,i.setRenderTarget(m),i.render(M,g.current),M.visible=!1};let I=0,G,N;return K(()=>{g.current&&(n===1/0||I<n)&&(I++,G=x.background,N=x.overrideMaterial,v.current.visible=!1,x.background=null,x.overrideMaterial=w,i.setRenderTarget(m),i.render(x,g.current),z(l),p&&z(l*.4),i.setRenderTarget(null),v.current.visible=!0,x.overrideMaterial=N,x.background=G)}),a.useImperativeHandle(D,()=>v.current,[]),a.createElement("group",V({"rotation-x":Math.PI/2},S,{ref:v}),a.createElement("mesh",{renderOrder:y,geometry:j,scale:[1,-1,1],rotation:[-Math.PI/2,0,0]},a.createElement("meshBasicMaterial",{transparent:!0,map:m.texture,opacity:s,depthWrite:d})),a.createElement("orthographicCamera",{ref:g,args:[-e/2,e/2,r/2,-r/2,f,o]}))});function ie(){const{camera:t}=L();return a.useEffect(()=>{t.position.set(3.25,5.15,6.95),t.lookAt(.1,-.08,0),t.updateProjectionMatrix()},[t]),null}function le(t){var l;const n=document.createElement("canvas"),s=256;n.width=s,n.height=s;const e=n.getContext("2d");if(e.clearRect(0,0,s,s),e.fillStyle="#ffffff",e.shadowColor="rgba(0, 0, 0, 0.42)",e.shadowBlur=4,e.shadowOffsetY=2,e.textAlign="center",e.textBaseline="middle",(l=t.logo)!=null&&l.path&&window.Path2D){const f=new window.Path2D(t.logo.path);e.save(),e.translate(34,34),e.scale(7.85,7.85),e.fill(f),e.restore()}else e.font="900 78px Inter, Arial, sans-serif",e.fillText(t.shortName,s/2,s/2);const r=new te(n);return r.colorSpace=re,r.anisotropy=4,r.needsUpdate=!0,r}function fe({skill:t,position:n,rowOffset:s,index:e,total:r,visible:l,onActivate:f}){const o=a.useRef(),c=a.useRef(),p=a.useRef(),[h,d]=a.useState(!1),[y,S]=a.useState(!1),D=a.useMemo(()=>new O(t.color),[t.color]),v=a.useMemo(()=>D.clone().lerp(new O("#050914"),.04),[D]),x=a.useMemo(()=>le(t),[t]),i=e*55,g=(r-e-1)*38;return a.useEffect(()=>{const m=window.setTimeout(()=>d(l),l?i:g);return()=>window.clearTimeout(m)},[g,i,l]),K(()=>{if(!o.current)return;const m=h&&y?-.26:0,j=h?1:.001,w=h?1:0;o.current.position.y=C.lerp(o.current.position.y,m,.18),o.current.rotation.z=C.lerp(o.current.rotation.z,y?-.018:0,.16),o.current.scale.x=C.lerp(o.current.scale.x,j,.16),o.current.scale.y=C.lerp(o.current.scale.y,j,.16),o.current.scale.z=C.lerp(o.current.scale.z,j,.16),c.current&&(c.current.opacity=C.lerp(c.current.opacity,w,.18)),p.current&&(p.current.opacity=C.lerp(p.current.opacity,w,.18))}),u.jsxs("group",{ref:o,position:[n[0]+s,0,n[1]],onPointerEnter:m=>{m.stopPropagation(),S(!0),f(t),document.body.style.cursor="pointer"},onPointerLeave:()=>{S(!1),document.body.style.cursor="auto"},onClick:m=>{m.stopPropagation(),f(t)},children:[u.jsx(ce,{args:[1.08,.52,1.08],radius:.095,smoothness:8,position:[0,.26,0],castShadow:!0,receiveShadow:!0,children:u.jsx("meshPhysicalMaterial",{ref:c,color:v,roughness:.68,metalness:0,clearcoat:.08,clearcoatRoughness:.82,transparent:!0,opacity:0})}),u.jsxs("mesh",{position:[0,.526,0],rotation:[-Math.PI/2,0,0],children:[u.jsx("planeGeometry",{args:[.68,.68]}),u.jsx("meshBasicMaterial",{ref:p,map:x,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1})]})]})}function ve({skills:t,visible:n,onActivate:s}){const e=[],r=[6,6,6],l=[0,.42,.84];let f=0;return r.forEach((o,c)=>{for(let p=0;p<o&&f<t.length;p+=1)e.push({skill:t[f],rowOffset:l[c],position:[(p-(o-1)/2)*1.02,(c-1)*1.03]}),f+=1}),u.jsxs(u.Fragment,{children:[u.jsx(ie,{}),u.jsx("color",{attach:"background",args:["#080B12"]}),u.jsx("ambientLight",{intensity:.28}),u.jsx("hemisphereLight",{args:["#c2d2e5","#060913",.58]}),u.jsx("directionalLight",{position:[3.8,7.4,5.6],intensity:1.32,castShadow:!0,"shadow-mapSize":[2048,2048]}),u.jsx("spotLight",{position:[-4.8,5.6,3.4],angle:.42,penumbra:.9,intensity:.54,color:"#c2d2e5"}),u.jsx("pointLight",{position:[4.2,2.9,-3.5],intensity:.26,color:"#c58a58"}),u.jsx("pointLight",{position:[-3.6,1.4,4.2],intensity:.18,color:"#6ea8ff"}),u.jsx("group",{rotation:[0,-.12,-.08],position:[0,-.72,0],scale:.98,children:e.map(({skill:o,position:c,rowOffset:p})=>u.jsx(fe,{skill:o,position:c,rowOffset:p,index:t.findIndex(h=>h.name===o.name),total:t.length,visible:n,onActivate:s},o.name))}),u.jsx(ue,{position:[0,-.82,0],opacity:.54,scale:8.8,blur:2.45,far:4.6})]})}function pe({skills:t,visible:n,onActivate:s}){return u.jsx("div",{className:"h-[360px] overflow-hidden bg-[#080B12] sm:h-[500px] md:h-[640px]",children:u.jsx(ee,{shadows:!0,camera:{position:[4.05,5.35,6.65],fov:44},dpr:[1,1.75],children:u.jsx(ve,{skills:t,visible:n,onActivate:s})})})}export{pe as default};
