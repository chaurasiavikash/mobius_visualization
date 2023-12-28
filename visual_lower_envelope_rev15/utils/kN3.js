var leng, mp, mq, theta;
var beta = [];
var gamma = [];

var numData;
var parameters;
var nu_i;
var N;
var N1;

var Pi = Math.PI;
var tau;
var n;
var h;
var kappa0 = [];  // curvature of the midline at time t = 0
var kappa = [];  // curvature of the midline at time t = 0

var init_parameters = function (nu_i) {
     numArray = numData[nu_i - 1];
  N = Math.round((numArray.length -3)/3);
   N1 = N - 1;
  h = 1 / N;

  // creating the init_parameters
};
var avg = function (arr) {
   return arr.reduce((a, b) => a + b, 0) / arr.length;
};

var hx0 = [];
var hy0 = [];
var hz0 = [];

var rx0 = [];
var ry0 = [];
var rz0 = [];



var cen = [0, 0, 0];

var data_t0 = function (nu_i) {
  h = 1/N;

  let tau = (1.29 + 0.015877763328999*(nu_i-1))*2*Pi;
  let tx0 = [];
  let ty0 = [];
  let tz0 = []; 

  let hx2p = [];
  let hy2p = [];
  let hz2p = [];

  kappa0 = Array(N + 1).fill(0);

    numArray = numData[nu_i - 1];
  // data read. now calculating quantities

 
  i = 0;
  hx0[i] = numArray[i * 3];
  hy0[i] = numArray[i * 3 + 1];
  hz0[i] = numArray[i * 3 + 2];

  for (var i = 1; i < N + 1; i++) {
    hx0[i] = numArray[i * 3];
    hy0[i] = numArray[i * 3 + 1];
    hz0[i] = numArray[i * 3 + 2];

    tx0[i] = (hy0[i - 1] * hz0[i] - hy0[i] * hz0[i - 1])/tau/h;
    ty0[i] = (hz0[i - 1] * hx0[i] - hz0[i] * hx0[i - 1])/tau/h;
    tz0[i] = (hx0[i - 1] * hy0[i] - hx0[i] * hy0[i - 1])/tau/h;

    

  }
  // if (isNaN(hx0  ) || isNaN(hy0  ) || isNaN(hz0   )) {
  //   console.log(`Found NaN at index ${i}`);
  // }

  tx0[0] = tx0[N];
  ty0[0] = ty0[N];
  tz0[0] = tz0[N];

  //let kmax = Math.max(...kappa0.map(Math.abs));;
 
// calculating curvature 
// curvature
hx2p[0] = (hx0[1] - hx0[N - 1] - 2 * hx0[0]) / h ** 2;
hy2p[0] = (hy0[1] - hy0[N - 1] - 2 * hy0[0]) / h ** 2;
hz2p[0] = (hz0[1] - hz0[N - 1] - 2 * hz0[0]) / h ** 2;

hx2p[N] = -hx2p[0];
hy2p[N] = -hy2p[0];;
hz2p[N] = -hz2p[0];;


 kappa0[0] = tx0[0] * hx2p[0] + ty0[0] * hy2p[0] + tz0[0] * hz2p[0];

for (var i = 1; i < N; i++) {
  hx2p[i] = (hx0[i + 1] + hx0[i - 1] - 2 * hx0[i]) / h ** 2;
  hy2p[i] = (hy0[i + 1] + hy0[i - 1] - 2 * hy0[i]) / h ** 2;
  hz2p[i] = (hz0[i + 1] + hz0[i - 1] - 2 * hz0[i]) / h ** 2;

  kappa0[i] = tx0[i] * hx2p[i] + ty0[i] * hy2p[i] + tz0[i] * hz2p[i];
}

 kappa0[N] = tx0[N] * hx2p[N] + ty0[N] * hy2p[N] + tz0[N] * hz2p[N];

//  // normalizing curvature 

   let kmax = Math.max(...kappa0.map(Math.abs));;
  kappa0 = kappa0.map((num) => num / tau);

 
///////////////////////


 
  // Midline
  rx0[0] = 0.0;
  ry0[0] = 0.0;
  rz0[0] = 0.0;
  h = 1;
  for (var i = 0; i < N; i++) {
    rx0[i + 1] = rx0[i] + h * tx0[i + 1];
    ry0[i + 1] = ry0[i] + h * ty0[i + 1];
    rz0[i + 1] = rz0[i] + h * tz0[i + 1];
  }

  cen[0] = avg(rx0);
  cen[1] = avg(ry0);
  cen[2] = avg(rz0);

  for (var i = 0; i < N + 1; i++) {
    rx0[i] = rx0[i] - cen[0];
    ry0[i] = ry0[i] - cen[1];
    rz0[i] = rz0[i] - cen[2];
  }
  // nomrlalizing the midline
  let dl = 0;
  for (let i = 0; i < N; i++) {
    let dx = rx0[i + 1] - rx0[i];
    let dy = ry0[i + 1] - ry0[i];
    let dz = rz0[i + 1] - rz0[i];
    dl += Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
  dl = dl / 6;
  for (let i = 0; i <= N; i++) {
    rx0[i] /= dl;
    ry0[i] /= dl;
    rz0[i] /= dl;
  }

   
};

//  midline and binormal loaded from the saved file 

//the function below generates animation data 
var animationData = function(j) {
  let ind = j % (2*N); // ensuring that index is not out of bound
  let ind2 = j % (N); // ensuring that index is not out of bound
   if (ind == 0) {
     ind = 1;
  }
   let or = -1;

  if(ind<N+1){
 
  let ar1 = Array.from(hx0.slice(ind - 1, N));
  let ar2 = Array.from(hx0.slice(0, ind).map((x) => or * x));
  
  var hx = ar1.concat(ar2);

  ar1 = Array.from(hy0.slice(ind - 1, N ));
  ar2 = Array.from(hy0.slice(0, ind).map((x) => or * x));
  var hy = ar1.concat(ar2);

  ar1 = Array.from(hz0.slice(ind - 1, N));
  ar2 = Array.from(hz0.slice(0, ind).map((x) => or * x));
  var hz = ar1.concat(ar2);

  ar1 = Array.from(kappa0.slice(ind - 1, N ));
  ar2 = Array.from(kappa0.slice(0, ind).map((x) => or * x));
  var kappa = ar1.concat(ar2);

  // updated binormal 
   ar1 = Array.from(rx0.slice(ind - 1, N));
   ar2 = Array.from(rx0.slice(0, ind).map((x) => 1 * x));
  
   var rx = ar1.concat(ar2);



   ar1 = Array.from(ry0.slice(ind - 1, N));
   ar2 = Array.from(ry0.slice(0, ind).map((x) => 1 * x));
  
   var ry = ar1.concat(ar2);

   ar1 = Array.from(rz0.slice(ind - 1, N));
   ar2 = Array.from(rz0.slice(0, ind).map((x) => 1 * x));
  
   var rz = ar1.concat(ar2);
   
    
  }
  else {
  let ar1 = Array.from(hx0.slice(ind2-1, N).map((x) => or * x));
  let ar2 = Array.from(hx0.slice(0, ind2));

  var hx = ar1.concat(ar2);

   ar1 = Array.from(hy0.slice(ind2-1, N).map((x) => or * x));
   ar2 = Array.from(hy0.slice(0, ind2));

  var hy = ar1.concat(ar2);

   ar1 = Array.from(hz0.slice(ind2-1, N).map((x) => or * x));
   ar2 = Array.from(hz0.slice(0, ind2));

  var hz = ar1.concat(ar2);

  ar1 = Array.from(kappa0.slice(ind2-1, N).map((x) => or * x));
   ar2 = Array.from(kappa0.slice(0, ind2));

  var kappa = ar1.concat(ar2);

  // updated binormal 
   ar1 = Array.from(rx0.slice(ind2-1, N) );
   ar2 = Array.from(rx0.slice(0, ind2));

  var rx = ar1.concat(ar2);

   ar1 = Array.from(ry0.slice(ind2-1, N) );
   ar2 = Array.from(ry0.slice(0, ind2));

  var ry = ar1.concat(ar2);

   ar1 = Array.from(rz0.slice(ind2-1, N) );
   ar2 = Array.from(rz0.slice(0, ind2));

  var rz = ar1.concat(ar2);
 
  };


   // ensuring that centroid is at the origin 
   cen[0] = avg(rx);
  cen[1] = avg(ry);
  cen[2] = avg(rz);


  for (var i = 0; i < N + 1; i++) {
    rx[i] = rx[i] - cen[0];
    ry[i] = ry[i] - cen[1];
    rz[i] = rz[i] - cen[2];
  }
   /// rotating appropriately 
   
   // first rotating the hand such that index 0 is fixed
   
  let th =  -Math.acos(rx[0] / Math.sqrt(rx[0]*rx[0] + ry[0]*ry[0]));
   // angle hetween point at s==0 and x axis
   if (ry[0] < 0) {
    th = 2 * Math.PI - th;
  }
  
  if (ry[0] == 0 && rx[0] > 0) {
    th = 0;
  } else if (ry[0] == 0 && rx[0] < 0) {
    th = Math.PI;
  }
  //th = 0;
  let ux = 0, uy = 0, uz = 1;
  
  
  let R1u = [
    [
      Math.cos(th) + ux ** 2 * (1 - Math.cos(th)),
      ux * uy * (1 - Math.cos(th)) - uz * Math.sin(th),
      ux * uz * (1 - Math.cos(th)) + uy * Math.sin(th),
    ],
    [
      ux * uy * (1 - Math.cos(th)) + uz * Math.sin(th),
      Math.cos(th) + uy ** 2 * (1 - Math.cos(th)),
      uy * uz * (1 - Math.cos(th)) - ux * Math.sin(th),
    ],
    [
      ux * uz * (1 - Math.cos(th)) - uy * Math.sin(th),
      uy * uz * (1 - Math.cos(th)) + ux * Math.sin(th),
      Math.cos(th) + uz ** 2 * (1 - Math.cos(th)),
    ],
  ];
    for (let i = 0; i <  N+1; i++) {
     
     let temp = [];
     temp[0] = R1u[0][0]*hx[i] + R1u[0][1]*hy[i] + R1u[0][2]*hz[i];
     temp[1] = R1u[1][0]*hx[i] + R1u[1][1]*hy[i] + R1u[1][2]*hz[i];
     temp[2] = R1u[2][0]*hx[i] + R1u[2][1]*hy[i] + R1u[2][2]*hz[i];
     
    
    hx[i] = temp[0];
    hy[i] = temp[1];
    hz[i] = temp[2];


 
     temp[0] = R1u[0][0]*rx[i] + R1u[0][1]*ry[i] + R1u[0][2]*rz[i];
     temp[1] = R1u[1][0]*rx[i] + R1u[1][1]*ry[i] + R1u[1][2]*rz[i];
     temp[2] = R1u[2][0]*rx[i] + R1u[2][1]*ry[i] + R1u[2][2]*rz[i];

    rx[i] = temp[0];
    ry[i] = temp[1];
    rz[i] = temp[2];
    


  };
  


 
  //console.log(rx ); // returns true if any element is NaN
  //console.log(rx.some(Number.isNaN)); // returns true if any element is NaN
  
   

  // cen[0] = avg(rx);
  // cen[1] = avg(ry);
  // cen[2] = avg(rz);
  
  // console.log(rx[240])
  //   console.log(rx.some(Number.isNaN));
  // for (var i = 0; i < N + 1; i++) {
  //   rx[i] = rx[i] - cen[0];
  //   ry[i] = ry[i] - cen[1];
  //   rz[i] = rz[i] - cen[2];
  // }

  
 
   
   
  return [hx,hy,hz,rx,ry,rz,kappa];
  // rotating appropriately
}
// matrix multiplication

 
 
var hx = [];
var hy = [];
var hz = [];

var rx = [];
var ry = [];
var rz = [];
var kappa = [];
var fourierExpansion = function (n, t, hl) {

   l = (hl * 1.7) / 2;
   var v = [];
  

  const result = animationData(t);
   hx = result[0];
   hy = result[1];
   hz = result[2];
  
   rx = result[3];
   ry = result[4];
   rz = result[5];

   for(var i=0; i<N+1;i++) {
    //rz[i]=rz[i]-.35;
    //rz[i]=rz[i]-.35;
   };

   kappa = result[6];
  
   cen[0] = avg(rx);
   cen[1] = avg(ry);
   cen[2] = avg(rz);
 
  var mid = [0, 0, 0];

 
  // creating tetrahedron vertices
  

  for (var i = 1; i < N +1; i++) {
    

    mid[0] = rx[i];
    mid[1] = ry[i];
    mid[2] = rz[i];

    v[6 * i - 5] = mid[0] - hx[i] * l;
    v[6 * i - 4] = mid[1] - hy[i] * l;
    v[6 * i - 3] = mid[2] - hz[i] * l;
    v[6 * i - 2] = mid[0] + hx[i] * l;
    v[6 * i - 1] = mid[1] + hy[i] * l;
    v[6 * i]     = mid[2] + hz[i] * l;
  }
  for (var i = 0; i < 2*N+1; i++) {
    for (var j = 1; j < 4; j++) {
      v[3*i+j] -= cen[j-1]/n;
      if(j==3){
        v[3*i+j] -=.25;
      }
    };
  };
  // tests
  // console.log(Math.abs(hx[n]*hx[1]+hy[n]*hy[1]+hz[n]*hz[1]+0.925450349781138));
  // tmp = [ hy[n]*hz[1] - hy[1]*hz[n],
  //         hz[n]*hx[1] - hz[1]*hx[n],
  //         hx[n]*hy[1] - hx[1]*hy[n] ];
  // for (var j = 0; j < 3; j++) mid[j] -= tmp[j];
  // console.log([mid[0],mid[1],mid[2]])
  return [v,kappa];
};

var paths = function (n, hl, selector,ind) {
   
  var path = [];
  var v0  = [];
  var v   = [];
  for (var t = 0; t <300; t++) {
     v0 = fourierExpansion(n, t, hl)[0];
    v[1] = v0[6 * ind - 5]; 
    v[2] = v0[6 * ind - 4]; 
    v[3] = v0[6 * ind - 3]; 
    v[4] = v0[6 * ind - 2]; 
    v[5] = v0[6 * ind - 1]; 
    v[6] = v0[6 * ind  ];  
    
     if (selector == 1) {
     // path.push(new BABYLON.Vector3(v[1], v[3], -v[2]));
      path.push(
        new BABYLON.Vector3(
          (v[1] + v[4]) / 2,
          (v[3] + v[6]) / 2,
          -(v[2] + v[5]) / 2
        )
      );
    } // corners
    if (selector == 2) {
      path.push(
        new BABYLON.Vector3(
          (v[1] + v[4]) / 2,
          (v[3] + v[6]) / 2,
          -(v[2] + v[5]) / 2
        )
      );
      // if (i > e / 2 - 1) {
      //   break;
      // }
    } //midpoint
  }
  return path;
};

function poly(N,n, v, i, cm, golfMesh , scheme) {
   var v1 = [v[6 * i - 5], v[6 * i - 3], -v[6 * i - 4]];
  var v2 = [v[6 * i - 2], v[6 * i], -v[6 * i - 1]];
  if (i < N) {
    var v3 = [v[6 * i + 1], v[6 * i + 3], -v[6 * i + 2]];
    var v4 = [v[6 * i + 4], v[6 * i + 6], -v[6 * i + 5]];
  } else {
    var v4 = [v[1], v[3], -v[2]];
    var v3 = [v[4], v[6], -v[5]];
  }

  var pos = v1.concat(v1, v1, v2, v2, v2, v3, v3, v3, v4, v4, v4);

  var indices = [0, 6, 3, 1, 4, 9, 2, 10, 7, 5, 8, 11]; // for mid[j] += tmp[j]/abs;
 
  // var indices = [ 0,3,6, 1,9,4, 2,7,10, 5,11,8 ]; // for mid[j] -= tmp[j]/abs;

  var c1, c2, c3, c4;
   var colors = [];
   if (scheme == 1) {
    // rainbow whole tetrahedron
    c1 =  jet(i); 
     
    
  }   else if (scheme == 2) {
    // Mobius brw 3x
     let n = 3;
      var indx =  Math.floor(i/(Math.round(N/n))) ;
    c1 = jet(Math.round(Math.round(N/n)*indx));
    //  if(indx%2  ==  0){
    //   c1 = [1,0,0,1]
    //   console.log(c1);
    //  }
    //  else if (indx%2  ==  1){
    //    c1 = [0,0,1,1];}

     };
      
      c2  = c1;
     c3 = c1;
     c4 = c1;
     colors = c3.concat(c1, c2, c3, c1, c4, c3, c2, c4, c1, c2, c4);
  
  

  var normals = [];
  BABYLON.VertexData.ComputeNormals(pos, indices, normals);

  var vertexData = new BABYLON.VertexData();

  vertexData.positions = pos;
  vertexData.indices = indices;
  vertexData.colors = colors;
  vertexData.normals = normals;

  vertexData.applyToMesh(cm);
   var ind1 = Math.round(N / (2 * n));

   for (var j=1;j<golfMesh.length+1;j++){
              let l = 2 * j * ind1 - 2 * ind1 + 1;
              var v1 = [v[6 * l - 5], v[6 * l - 3], -v[6 * l - 4]];
              var v2 = [v[6 * l - 2], v[6 * l], -v[6 * l - 1]];
    if(golfMesh[j]){
      golfMesh[j].position  = new BABYLON.Vector3((v1[0] + v2[0]) / 2 ,
      (v1[1] + v2[1]) / 2,(v1[2] + v2[2]) / 2);
    
    };
 
   };

     
}

function anchor(arrow1,tip1, anchorMaterial,v1,v2,hingeLength){ 

 
  // direction for alignment 
  var mod = Math.sqrt((v1[0]-v2[0])**2 + (v1[1]-v2[1])**2 + (v1[2]-v2[2])**2 );
  var direction = new BABYLON.Vector3((v1[0]-v2[0])/mod,(v1[1]-v2[1])/mod,(v1[2]-v2[2])/mod);
  // Compute the rotation to align the body with the given direction
  var axis = BABYLON.Vector3.Cross(BABYLON.Axis.Y, direction);
  var angle = Math.acos(BABYLON.Vector3.Dot(BABYLON.Axis.Y, direction));
  var quater = BABYLON.Quaternion.RotationAxis(axis, angle);
  // position and orientation 
  var mid_position  = new BABYLON.Vector3((v1[0]+v2[0])/2.0,(v1[1]+v2[1])/2.0,(v1[2]+v2[2])/2.0);
  arrow1.position = mid_position;
  arrow1.rotationQuaternion = quater;
  // Assign the height value later
  arrow1.scaling.x =  3.1 * hingeLength;            
  arrow1.scaling.y =  .9 * hingeLength;            
  arrow1.scaling.z =  3.1 * hingeLength;            
  
   
  var h_tip  = .4*hingeLength;
 
  var fac1 = h_tip/2 + hingeLength;
 
 
tip1.rotationQuaternion = quater;
tip1.position  =new BABYLON.Vector3(mid_position.x + fac1*direction.x ,mid_position.y +  fac1*direction.y
                  ,mid_position.z +  fac1* direction.z);
tip1.scaling.x  = h_tip*4.8;
tip1.scaling.y  = h_tip*.8;
tip1.scaling.z  = h_tip*4.8;
  

// tail1.rotationQuaternion = quater;
// tail1.position  =new BABYLON.Vector3(mid_position.x - fac2*direction.x ,mid_position.y -  fac2*direction.y
//                   ,mid_position.z -  fac2*direction.z);
//  tail1.scaling.x  = h_tail*5;
//  tail1.scaling.y  = h_tail;
//  tail1.scaling.z  = h_tail*5;
// Combine the arrow components into a single mesh
//anchor[j] =   BABYLON.Mesh.MergeMeshes([arrow1, tip1, tail1], true, false, null, false, true);

arrow1.material = anchorMaterial;
tip1.material = anchorMaterial;
//tail1.material = anchorMaterial;

};
 


var col = [];
col[1] = [1, 0, 0, 1];
col[2] = [1, 0.25, 0, 1];
col[3] = [1, 0.5, 0, 1];
col[4] = [1, 0.75, 0, 1];
col[5] = [1, 1, 0, 1];
col[6] = [0.75, 1, 0, 1];
col[7] = [0.5, 1, 0, 1];
col[8] = [0.25, 1, 0, 1];
col[9] = [0, 1, 0, 1];
col[10] = [0, 1, 0.25, 1];
col[11] = [0, 1, 0.5, 1];
col[12] = [0, 1, 0.75, 1];
col[13] = [0, 1, 1, 1];
col[14] = [0, 0.75, 1, 1];
col[15] = [0, 0.5, 1, 1];
col[16] = [0, 0.25, 1, 1];
col[17] = [0, 0, 1, 1];
col[18] = [0.25, 0, 1, 1];
col[19] = [0.5, 0, 1, 1];
col[20] = [0.75, 0, 1, 1];
col[21] = [1, 0, 1, 1];
col[22] = [1, 0, 0.75, 1];
col[23] = [1, 0, 0.5, 1];
col[24] = [1, 0, 0.25, 1];

var alpha = 0.1;
var rainbowScheme = function (z) {
  var s = 1 / 6;
  if (z < s) {
    return [1, z / s, 0, alpha];
  } else if (z >= s && z < 2 * s) {
    return [(2 * s - z) / s, 1, 0, alpha];
  } else if (z >= 2 * s && z < 3 * s) {
    return [0, 1, (z - 2 * s) / s, alpha];
  } else if (z >= 3 * s && z < 4 * s) {
    return [0, (4 * s - z) / s, 1, alpha];
  } else if (z >= 4 * s && z < 5 * s) {
    return [(z - 4 * s) / s, 0, 1, alpha];
  } else {
    return [1, 0, (6 * s - z) / s, alpha];
  }
};

var rainbowStepScheme = function (z) {
  var s = 1 / 6;
  if (z < s) {
    return [1, 0, 0, alpha];
  } else if (z >= s && z < 2 * s) {
    return [1, 1, 0, alpha];
  } else if (z >= 2 * s && z < 3 * s) {
    return [0, 1, 0, alpha];
  } else if (z >= 3 * s && z < 4 * s) {
    return [0, 1, 1, alpha];
  } else if (z >= 4 * s && z < 5 * s) {
    return [0, 0, 1, alpha];
  } else {
    return [1, 0, 1, alpha];
  }
};
var brwScheme = function(z) { // black - red - white
  var s = 1/3;
       if (             z <   s ) { return [0,0,0,1]; }
  else if ( z >=   s && z < 2*s ) { return [1,0,0,1]; }
  else                            { return [1,1,1,1]; }
}

var symmetryAxis = function (scene) {
  var d = 0.01;
  var symAxis = BABYLON.Mesh.CreateCylinder(
    "cylinder",
    2,
    d,
    d,
    8,
    1,
    scene,
    false,
    BABYLON.Mesh.DEFAULTSIDE
  );
  var yellow = new BABYLON.StandardMaterial("texture1", scene);
  yellow.diffuseColor = new BABYLON.Color3(1, 1, 0);
  symAxis.material = yellow;
  return symAxis;
};
var meshDispose;
var planeAxis = function (arrowBody ,tip) {

  meshDispose(arrowBody);
   meshDispose(tip);;

  // var l = 1.8;
  // var d = 0.01;
  // var plaAxis = [];
  // plaAxis[1] = BABYLON.Mesh.CreateCylinder(
  //   "cylinder",
  //   l,
  //   d,
  //   d,
  //   8,
  //   1,
  //   scene,
  //   false,
  //   BABYLON.Mesh.DEFAULTSIDE
  // );
  // var yellow = new BABYLON.StandardMaterial("texture1", scene);
  // yellow.diffuseColor = new BABYLON.Color3(1, 1, 0);
  // plaAxis[1].material = yellow;
  // plaAxis[1].rotation.z = Math.PI / 2;
  // for (var i = 2; i < N + 1; ++i) {
  //   plaAxis[i] = plaAxis[1].createInstance("cylinder" + i);
  //   var a = (2 * (i - 1) * Math.PI) / N;
  //   plaAxis[i].rotation.y = a;
  //   plaAxis[i].position.x = (-l / 2) * Math.cos(a);
  //   plaAxis[i].position.z = (l / 2) * Math.sin(a);
  // }
  // plaAxis[1].position.x = -l / 2;
  // return plaAxis;
};

// Define a color map based on the index of each point using the jet function
function getJetColor(index, numPoints) {
  const val = index / (numPoints - 1);
  const r = Math.max(
    0,
    Math.min(255, Math.round(255 * (1.5 - 4 * Math.abs(val - 0.5))))
  );
  const g = Math.max(
    0,
    Math.min(
      255,
      Math.round(
        255 * (1.5 - 4 * Math.abs(val - 0.25) - 4 * Math.abs(val - 0.75))
      )
    )
  );
  const b = Math.max(
    0,
    Math.min(255, Math.round(255 * (1.5 - 4 * Math.abs(val - 0.5))))
  );
  return new BABYLON.Color4(r / 255, g / 255, b / 255, 1);
}

function getVibgyorColor(index, numPoints) {
  const step = 1.0 / (numPoints - 1);
  const h = index * step;
  const r = Math.round(
    Math.max(0, Math.min(255, 255 * (1 - Math.abs(h * 6 - 3) - 0.25)))
  );
  const g = Math.round(
    Math.max(0, Math.min(255, 255 * (1 - Math.abs(h * 6 - 2) - 0.25)))
  );
  const b = Math.round(
    Math.max(0, Math.min(255, 255 * (1 - Math.abs(h * 6 - 4) - 0.25)))
  );
  return new BABYLON.Color4(r / 255, g / 255, b / 255, 1);
}


var jet = function(i) {
    
  let r, g, b;

  let N3 = Math.round(N );
  if (i < N3 / 4) {
    r = 0;
    g = Math.floor(4 * i / N3 * 255);
    b = 255;
  } else if (i < N3 / 2) {
    r = 0;
    g = 255;
    b = Math.floor(255 - 4 * (i - N3 / 4) / N3 * 255);
  } else if (i < 3 * N3 / 4) {
    r = Math.floor(4 * (i - N3 / 2) / N3 * 255);
    g = 255;
    b = 0;
  } else {
    r = 255;
    g = Math.floor(255 - 4 * (i - 3 * N3 / 4) / N3 * 255);
    b = 0;
  }


return [  r / 255, g / 255, b / 255, 1]; 
}

var jetK = function(i) {
    
  let r, g, b;

  let N3 = N;
  if (i < N3 / 4) {
    r = 0;
    g = Math.floor(4 * i / N3 * 255);
    b = 255;
  } else if (i < N3 / 2) {
    r = 0;
    g = 255;
    b = Math.floor(255 - 4 * (i - N3 / 4) / N3 * 255);
  } else if (i < 3 * N3 / 4) {
    r = Math.floor(4 * (i - N3 / 2) / N3 * 255);
    g = 255;
    b = 0;
  } else {
    r = 255;
    g = Math.floor(255 - 4 * (i - 3 * N3 / 4) / N3 * 255);
    b = 0;
  }


return `rgba(${r},${g},${b},1)`; 
}



////////////////////////////////
////////// charts /////////////

 