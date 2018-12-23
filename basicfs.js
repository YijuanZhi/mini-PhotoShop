let robot = lib220.loadImageFromURL(
'https://people.cs.umass.edu/~joydeepb/robot.jpg');
let sasha = lib220.loadImageFromURL(
'https://pics.me.me/gghagg-gagh-gaggh-ggang-gaggh-sasha-gray-asha-grey-25822889.png');

function makeGrayscale(p){
  let img = p.copy();
  for(let w = 0; w < img.width; ++w){
    for(let h = 0; h < img.height; ++h){
      let curPixel = img.getPixel(w,h);
      let average = (curPixel[1] + curPixel[2] + curPixel[0])/3;
      img.setPixel(w, h, [average, average, average]); 
    }
  }
  return img;
}

function removeBlueAndGreen(p){
  let img = p.copy();
  for(let w = 0; w < img.width; ++w){
    for(let h = 0; h < img.height; ++h){
      let curPixel = img.getPixel(w, h);
      img.setPixel(w, h, [curPixel[0], 0, 0]);
    }
  }
  return img;
}



function highlightEdges(p){
  let img = p.copy();
  for(let w = 0; w < img.width-1; ++w){
    for(let h = 0; h < img.height; ++h){
      let curPixel = img.getPixel(w,h);
      let nextPixel = img.getPixel(w + 1,h);
      let m1 = (curPixel[1] + curPixel[2] + curPixel[0])/3;
      let m2 = (nextPixel[1] + nextPixel[2] + nextPixel[0])/3;
      let m = Math.abs(m1 - m2);
      img.setPixel(w, h, [m, m, m]);
    }
  }
  //Rightmost edge handling
  for(let h = 0; h < img.height; ++h){
    let w = img.width - 1;
    let curPixel = img.getPixel(w,h);
    let prePixel = img.getPixel(w - 1,h);
    let a1 = (curPixel[1] + curPixel[2] + curPixel[0])/3;
    let a2 = (prePixel[1] + prePixel[2] + prePixel[0])/3;
    let a = Math.abs(a1 - a2);
    img.setPixel(w, h, [a, a, a]);
  }
  return img;
}

function blur(p){
  let img = p.copy();
  for(let w = 0; w < img.width; ++w){
    for(let h = 0; h < img.height; ++h){
      let sum0 = 0;
      let sum1 = 0;
      let sum2 = 0;
      let count = 0;
      for(let i = w-5; i < w+6; ++i){
        if(i >= 0 && i < img.width){
          count = count +1;
          let ip = img.getPixel(i, h);
          sum0 = sum0 + ip[0];
          sum1 = sum1 + ip[1];
          sum2 = sum2 + ip[2];
        }
      }
      let m1 = sum0/count;
      let m2 = sum1/count;
      let m3 = sum2/count;
      img.setPixel(w, h, [m1, m2, m3]);
    }
  }
  return img;
}

//simple test

robot.show();
let redRobot = removeBlueAndGreen(robot);
redRobot.show();
let grayRobot = makeGrayscale(robot);
grayRobot.show();
let highlightRobot = highlightEdges(robot);
highlightRobot.show();
let blurRobot = blur(robot);
blurRobot.show();

/*
sasha.show();
removeBlueAndGreen(sasha).show();
blur(sasha).show();
highlightEdges(sasha).show();
*/