
let robot = lib220.loadImageFromURL(
'https://people.cs.umass.edu/~joydeepb/robot.jpg');



//TASK 1
//func(img, x, y)  returns an wanted(maybe modified) pixel 
function imageMap(img, func){
  let p = img.copy();
  let newimg = lib220.createImage(p.width,p.height,[0,0,0]);
  for(let i=0; i<p.width;++i){
    for(let j=0; j<p.height; ++j){
      let curPixel = func(p, i, j);
      newimg.setPixel(i,j,curPixel);
    }
  }
  return newimg;
}

/*
//SELF-TEST for TASK 1
function f1(img, x, y){
  return img.getPixel(x,y);
}
imageMap(robot,f1).show();
imageMap(robot, function(img, x, y){
  const c = img.getPixel(x,y);
  return [c[0], 0, 0];
}).show();
*/

//TASK 2
//func(img, x, y) returns a boolean value
function imageMask(img,func,maskValue){
  let p = img.copy();
  return imageMap(p, function(pic, x, y){
    if(func(pic, x, y)) {
      return maskValue;
    }
    else{
      return pic.getPixel(x, y);
    }
  });
}

/*
//SELF-TEST for TASK 2
imageMask(robot,function(img, x, y) {
  return (y % 10 ===0);}, [1,0,0]).show();
*/

//TASK 3
function blurPixel(img,x,y){
  //from my p1 code
  let sum0 = 0;
  let sum1 = 0;
  let sum2 = 0;
  let count = 0;
  for(let i = x-5; i < x+6; ++i){
    if(i >= 0 && i < img.width){
      count = count +1;
      let ip = img.getPixel(i, y);
      sum0 = sum0 + ip[0];
      sum1 = sum1 + ip[1];
      sum2 = sum2 + ip[2];
    }
  }
  let m1 = sum0/count;
  let m2 = sum1/count;
  let m3 = sum2/count;
  return [m1,m2,m3];
}

//TASK 4
function blurImage(img){
  let bp = imageMap(img,blurPixel);
  return bp;
}

/*
//SELF-TEST FOR TASK 3, 4 !!!!!!!!!!!!!!!

let blurRobot = imageMap(robot,blurPixel);
blurRobot.show();

blurImage(robot).show()
*/

//TASK 5,6
function isDark(img,x,y){
  let curPixel = img.getPixel(x,y);
  if(curPixel[0]<0.5 && curPixel[1] <0.5 && curPixel[2] < 0.5){
    return true;
  }
  else {
    return false;
  }
}

function darken(img){
  let p = img.copy();
  return imageMap(p, function(pic, x, y){
    if(isDark(pic, x, y)) {
      return [0,0,0];
    }
    else{
      return pic.getPixel(x, y);
    }
  });
}

/*
//SELF-TEST FOR TASK 5,6
let darkRobot = darken(robot);
darkRobot.show();
*/

//TASK 7
function isLight(img, x, y){
  let curPixel = img.getPixel(x,y);
  if(curPixel[0]>=0.5 && curPixel[1]>=0.5 && curPixel[2]>=0.5){
    return true;
  }
  else {
    return false;
  }
}

//TASK 8
function lighten(img){
  let p = img.copy();
  return imageMap(p, function(pic, x, y){
    if(isLight(pic, x, y)) {
      return [1,1,1];
    }
    else{
      return pic.getPixel(x, y);
    }
  });
}

/*
//SELF-TEST FOR TASK 7,8
let lightRobot = lighten(robot);
lightRobot.show();
*/

//TASK 9
function lightenAndDarken(img){
  let p = img.copy();
  let lp = lighten(p);
  let ldp = darken(lp);
  return ldp;
}

/*
//SELF-TEST FOR TASK 9
let ldRobot = lightenAndDarken(robot);
ldRobot.show();
*/