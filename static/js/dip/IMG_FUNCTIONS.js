function _IMAGE_LOAD(SOURCE, CALLBACK)
    {
      let img = new Image();
      img.src = SOURCE;
      img.onload = () =>
      {
        let IMG_DATA = null;
        let c = document.createElement('canvas');
        let ctx = c.getContext('2d');
        c.width = img.width;
        c.height = img.height;
        ctx.drawImage(img, 0, 0, c.width, c.height);
        IMG_DATA = ctx.getImageData(0, 0, c.width, c.height);
        CALLBACK(IMG_DATA);
      }
    }
    
    function _GET_CANVAS(IMG, callback)
    {
      let c = document.createElement('canvas');
      let ctx = c.getContext('2d');
      c.width = IMG.width;
      c.height = IMG.height;
      ctx.putImageData(IMG, 0, 0);
      return {
        dataURL: c.toDataURL(),
        width: c.width,
        height: c.height
      }
    }
    function _APPEND_CANVAS(IMG)
    {
      let c = document.createElement('canvas');
      let ctx = c.getContext('2d');
      c.width = IMG.width;
      c.height = IMG.height;
      ctx.putImageData(IMG, 0, 0);
      document.body.append(c);
    }
    function _APPEND_COLORS(COLORS)
    {
      for(let i=0; i<COLORS.length; i++)
      {
        let D = document.createElement('DIV');
        D.style.backgroundColor = `rgb(${COLORS[i].R}, ${COLORS[i].G}, ${COLORS[i].B})`;
        D.style.height = "50px";
        D.style.width = "50px";
        D.style.display = "inline-block";
        document.body.append(D);
      }
    }
    function  _APPEND_COLOR(COLORS)
    {
      let D = document.createElement('DIV');
      D.style.backgroundColor = `rgb(${COLORS.R}, ${COLORS.G}, ${COLORS.B})`;
      D.style.height = "50px";
      D.style.width = "50px";
      D.style.display = "block";
      document.body.append(D);
    }

    function _DUPLICATE(IMG)
    {
      return (new ImageData(
        new Uint8ClampedArray(IMG.data),
        IMG.width,
        IMG.height
      ));
    }
    function _GET_PIX(DATA, X, Y, index)
    {
      if(X >= DATA.width || X < 0 || Y < 0 || Y >= DATA.height)
        return 0;
      return DATA.data[DATA.width*(4*Y)+index+(4*X)];
    }
    function _GET_ALL_PIX_RGB(DATA, X, Y)
    {
      if(X >= DATA.width || X < 0 || Y < 0 || Y >= DATA.height)
        return 0;     
      return  {
        R:  DATA.data[DATA.width*(4*Y)+0+(4*X)],       
        G:  DATA.data[DATA.width*(4*Y)+1+(4*X)],
        B:  DATA.data[DATA.width*(4*Y)+2+(4*X)],
      };
    }
    
    function _GET_PIX_INDEX(IMG, INDEX)
    {
      let COORDS = this._GET_AXIS(IMG, INDEX);
      return this._GET_INDEX(IMG, COORDS.X, COORDS.Y, 0);
    }
    function _SET_PIX_INDEX(IMG, INDEX, i, VAL)
    {
      IMG.data[(INDEX*4) + i] = VAL;
    }
    function _SET_PIX_INDEX_RGB(IMG, INDEX, RGB)
    {
      IMG.data[(INDEX*4) + 0] = RGB.R;
      IMG.data[(INDEX*4) + 1] = RGB.G;
      IMG.data[(INDEX*4) + 2] = RGB.B;
      IMG.data[(INDEX*4) + 3] = 255;
    }

    function _SET_PIX(rgbs, x, y, index, val)
    {
      rgbs.data[rgbs.width*(4*y)+index+(4*x)] = val;
    }

    function _SET_ALL_PIX(rgbs, x, y, val )
    {
      rgbs.data[rgbs.width*(4*y)+0+(4*x)] = val;
      rgbs.data[rgbs.width*(4*y)+1+(4*x)] = val;
      rgbs.data[rgbs.width*(4*y)+2+(4*x)] = val;
    }
    function _SET_ALL_PIX_RGB(rgbs, x, y, R, G, B )
    {
      rgbs.data[rgbs.width*(4*y)+0+(4*x)] = R;
      rgbs.data[rgbs.width*(4*y)+1+(4*x)] = G;
      rgbs.data[rgbs.width*(4*y)+2+(4*x)] = B;
    }
    function _SET_ALL_PIX_RGBA(rgbs, x, y, R, G, B, A = 255)
    {
      rgbs.data[rgbs.width*(4*y)+0+(4*x)] = R;
      rgbs.data[rgbs.width*(4*y)+1+(4*x)] = G;
      rgbs.data[rgbs.width*(4*y)+2+(4*x)] = B;
      rgbs.data[rgbs.width*(4*y)+3+(4*x)] = A;
    }

    function _GET_ALL_PIX(rgbs, x, y)
    {
      return [
        rgbs.data[rgbs.width*(4*y)+0+(4*x)],
        rgbs.data[rgbs.width*(4*y)+1+(4*x)],
        rgbs.data[rgbs.width*(4*y)+2+(4*x)],
      ];
    }

    function _GET_INDEX(DATA, X, Y)
    {
      if(X >= DATA.width || X < 0 || Y < 0 || Y >= DATA.height)
        return false;
      return (DATA.width * Y + X);
    }
    function _GET_NEIGHBOURS_PIX_SKIP_EDGE(DATA, _X, _Y)
    {
      let ARR = [];
      for(let Y=-1; Y<2; Y++)
      {
        for(let X=-1; X<2; X++)
        {
          if(this._GET_INDEX(DATA, _X + X, _Y + Y) === false)
            ARR.push(0);
          else
            ARR.push(this._GET_PIX(DATA, _X + X, _Y + Y, 0));
        }
      }
      return ARR;
    }
    function _GET_NEIGHBOURS_PIX_SKIP_EDGE_RGB(DATA, _X, _Y)
    {
      let ARR = [];
      for(let Y=-1; Y<2; Y++)
      {
        for(let X=-1; X<2; X++)
        {
          if(this._GET_INDEX(DATA, _X + X, _Y + Y) === false)
            ARR.push(
              {
                R: 0,
                G: 0,
                B: 0
              });
          else
            ARR.push(this._GET_ALL_PIX_RGB(DATA, (_X+X), (_Y+Y)));
        }
      }
      return ARR;
    }
    function _GET_DIRECTION(DATA, _X, _Y)
    {
      let ARR = [];
      for(let Y=-1; Y<2; Y++)
      {
        for(let X=-1; X<2; X++)
        {
          if(this._GET_INDEX(DATA, _X + X, _Y + Y) === false)
            ARR.push(0);
          else
            ARR.push(this._GET_PIX(DATA, _X + X, _Y + Y, 0));
        }
      }
      let VERTICAL = (ARR[1] + ARR[7])/2;
      let HORIZONTAL = (ARR[3] + ARR[5])/2;
      let DIAGONAL_LEFT = (ARR[0] + ARR[8])/2;
      let DIAGONAL_RIGHT = (ARR[2] + ARR[6])/2;
      let DIRECTION = { VAL: VERTICAL, D: "V", INDEX: this._GET_INDEX(DATA, _X, _Y) };

      if(HORIZONTAL > DIRECTION.VAL)
      {
        DIRECTION.VAL = HORIZONTAL;
        DIRECTION.D = "H";
      }
      if(DIAGONAL_LEFT > DIRECTION.VAL)
      {
        DIRECTION.VAL = DIAGONAL_LEFT;
        DIRECTION.D = "DL";
      }
      if(DIAGONAL_RIGHT > DIRECTION.VAL)
      {
        DIRECTION.VAL = DIAGONAL_RIGHT;
        DIRECTION.D = "DR";
      }
      return DIRECTION.D;


    }
    function _GET_NEIGHBOURS_PIXEL(DATA, POINT)
    {
      let ARR = [];
      for(let Y=-1; Y<2; Y++)
      {
        for(let X=-1; X<2; X++)
        {
          if(this._GET_INDEX(DATA, POINT.X + X, POINT.Y + Y) === false)
            ARR.push(-1);
          else
            ARR.push(this._GET_INDEX(DATA, POINT.X +X, POINT.Y + Y));
        }
      }
      return ARR;
    }
    function _IS_EDGE(DATA, _X , _Y)
    {
      for(let Y=-1; Y<2; Y++)
      {
        for(let X=-1; X<2; X++)
        {
          if(this._GET_PIX(DATA, X+_X, Y+_Y, 0) === 0)
            return true;
        }
      }
      return false;
    }
    function _GET_AXIS(DATA, INDEX)
    {
      let PIXEL = 
      {
        X:0,
        Y:0,
        INDEX:0
      };
      PIXEL.X = INDEX%DATA.width;
      let counter = 0;
      let QUOTIENT = DATA.width;
      while(QUOTIENT <= INDEX)
      {
        QUOTIENT += DATA.width;
        counter++;
      }
      PIXEL.Y = counter;
      PIXEL.INDEX = this._GET_INDEX(DATA, PIXEL.X, PIXEL.Y);
      return PIXEL;
    }

    function _IS_CORNER_PIXEL(DATA, POINT)
    {
      for(let Y=-1; Y<2; Y++)
      {
        for(let X=-1; X<2; X++)
        {
          if(this._GET_INDEX(DATA, (POINT.X + X), (POINT.Y + Y)) === false)
            return true;
        }
      }
      return false;
    }

    function _IS_EDGE_PIXEL(DATA, POINT, AVG, DIFF)
    {
      for(let Y=-1; Y<2; Y++)
      {
        for(let X=-1; X<2; X++)
        {
          if(X + POINT.X < 0 || Y + POINT.Y < 0)  continue;

          let INTENSITY = this._GETPIX(DATA, X + POINT.X, Y + POINT.Y, 0);
          if(Math.abs(INTENSITY - AVG) > DIFF)
            return true;
        }
      }
      return false;
    }
    
  function _INDEX_TO_PIXELS(IMG, POINT)
  {
    let PIXELS = [];
    for(let i=0; i<POINT.length; i++)
    {
      let COORDS = this._POINT_INFO(IMG, POINT[i]);
      PIXELS.push(this._GETPIX(IMG, COORDS.X, COORDS.Y, 0));
    }
    return PIXELS;
  }
  function _GET_SOBEL_FILTERS()
  {
      let OBJECT = 
      {
          GX : [-1,0,+1,  -2,0,+2,  -1,0,+1],
          GY:  [-1,-2,-1,  0,0,0, +1,+2,+1],
          GA:  [0,1,2,  -1,0,+1,  -2,-1,0],
          GB:  [-2,-1,0,  -1,0,1,  0,1,2]
      }
    return OBJECT;
  }
  function _MULTIPLY_ARR_ARR(ARR1, ARR2)
  {
    let VAL = 0;
    for(let i=0; i<9; i++)
    {
      VAL += (ARR1[i] * ARR2[i]);
    }
    return (VAL/9);
  }
  function  _MULTIPLY_OBJECT_ARR(OBJECT_ARR, ARR2)
  {
    let OBJECT =
    {
      GX: 0,
      GY: 0,
      GA: 0,
      GB: 0
    }
    for(let i=0; i<9; i++)
    {
      OBJECT.GX += (OBJECT_ARR.GX[i] * ARR2[i]);
      OBJECT.GY += (OBJECT_ARR.GY[i] * ARR2[i]);
      OBJECT.GA += (OBJECT_ARR.GA[i] * ARR2[i]);
      OBJECT.GB += (OBJECT_ARR.GB[i] * ARR2[i]);
    }
    OBJECT.GX = OBJECT.GX/9;
    OBJECT.GY = OBJECT.GY/9;
    OBJECT.GA = OBJECT.GA/9;
    OBJECT.GB = OBJECT.GB/9;

    return OBJECT;
  }
  function _MULTIPLY_OBJECT_ARR_RGB(OBJECT_ARR, ARR2)
  {
    let OBJECT =
    {
      GX: { R: 0, G: 0, B: 0 },
      GY: { R: 0, G: 0, B: 0 },
      GA: { R: 0, G: 0, B: 0 },
      GB: { R: 0, G: 0, B: 0 }
    }
    for(let i=0; i<9; i++)
    {
      OBJECT.GX.R += (OBJECT_ARR.GX[i] * ARR2[i].R);
      OBJECT.GX.G += (OBJECT_ARR.GX[i] * ARR2[i].G);
      OBJECT.GX.B += (OBJECT_ARR.GX[i] * ARR2[i].B);

      OBJECT.GY.R += (OBJECT_ARR.GY[i] * ARR2[i].R);
      OBJECT.GY.G += (OBJECT_ARR.GY[i] * ARR2[i].G);
      OBJECT.GY.B += (OBJECT_ARR.GY[i] * ARR2[i].B);

      OBJECT.GA.R += (OBJECT_ARR.GA[i] * ARR2[i].R);
      OBJECT.GA.G += (OBJECT_ARR.GA[i] * ARR2[i].G);
      OBJECT.GA.B += (OBJECT_ARR.GA[i] * ARR2[i].B);

      OBJECT.GB.R += (OBJECT_ARR.GB[i] * ARR2[i].R);
      OBJECT.GB.G += (OBJECT_ARR.GB[i] * ARR2[i].G);
      OBJECT.GB.B += (OBJECT_ARR.GB[i] * ARR2[i].B);
    }
    OBJECT.GX.R = OBJECT.GX.R/9; OBJECT.GX.G = OBJECT.GX.G/9; OBJECT.GX.B = OBJECT.GX.B/9;
    OBJECT.GY.R = OBJECT.GY.R/9;  OBJECT.GY.G = OBJECT.GY.G/9;  OBJECT.GY.B = OBJECT.GY.B/9;
    OBJECT.GA.R = OBJECT.GA.R/9;  OBJECT.GA.G = OBJECT.GA.G/9;  OBJECT.GA.B = OBJECT.GA.B/9;
    OBJECT.GB.R = OBJECT.GB.R/9;  OBJECT.GB.G = OBJECT.GB.G/9;  OBJECT.GB.B = OBJECT.GB.B/9;

    return OBJECT;
  }

  function _FIND_MAGNITUDE(OBJECT)
  {
    return Math.sqrt(Math.pow(OBJECT.GX, 2) + Math.pow(OBJECT.GY, 2) + Math.pow(OBJECT.GA, 2) + Math.pow(OBJECT.GB, 2) , 2);
  }
  function _FIND_MAGNITUDE_ALL(OBJECT)
  {
    return Math.sqrt(Math.pow(OBJECT.GX, 2) + Math.pow(OBJECT.GY, 2) + Math.pow(OBJECT.GA, 2) + Math.pow(OBJECT.GB, 2) , 2);
  }
  function _FIND_MAGNITUDE_RGB(OBJECT)
  {
    return Math.sqrt((Math.pow(OBJECT.GX.R, 2) + Math.pow(OBJECT.GY.R,2) + Math.pow(OBJECT.GA.R,2) + Math.pow(OBJECT.GB.R,2)) + 
                    (Math.pow(OBJECT.GX.G, 2) + Math.pow(OBJECT.GY.G,2) + Math.pow(OBJECT.GA.G,2) + Math.pow(OBJECT.GB.G,2)) + 
                    (Math.pow(OBJECT.GX.B, 2) + Math.pow(OBJECT.GY.B,2) + Math.pow(OBJECT.GA.B,2) + Math.pow(OBJECT.GB.B,2)) , 2);
  }
  function _FIND_DIRECTION(OBJECT)
  {
    return Math.atan(OBJECT.GY / OBJECT.GX);
  }

  function _FIND_MAGNITUDE__(GX, GY)
  {
    return Math.sqrt(Math.pow(GX, 2) + Math.pow(GY, 2) , 2);
  }
  function _ECQUALIDIAN_DISTANCE(L1, L2)
  {
    return Math.floor(Math.sqrt(Math.pow(L1.L - L2.L,2) + Math.pow(L1.A - L2.A, 2) + Math.pow(L1.B - L2.B, 2), 2));
  }
function  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function  _AVG_FINDER(ARR)
 {
   let SUM = ARR.reduce((a, b) => a + b, 0);
   return SUM/ARR.length;
 }
 function _SUM_ARR(ARR)
 {
   return ARR.reduce((a, b) => a + b, 0);
 }
 
 function _RGB2LAB(rgb){
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      x, y, z;

  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

  // return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
  // return [Math.round((116 * y) - 16), Math.round(500 * (x - y)), Math.round(200 * (y - z))]
  return {
    L: Math.round((116 * y) - 16),
    A: Math.round(500 * (x - y)),
    B: Math.round(200 * (y - z))
  };
}

function _rgb2lab(rgb){
  var r = rgb.R / 255,
      g = rgb.G / 255,
      b = rgb.B / 255,
      x, y, z;

  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

  // return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
  // return [Math.round((116 * y) - 16), Math.round(500 * (x - y)), Math.round(200 * (y - z))]
  return {
    L: Math.round((116 * y) - 16),
    A: Math.round(500 * (x - y)),
    B: Math.round(200 * (y - z))
  };
}
function _lab2rgb(lab){
  var y = (lab.L + 16) / 116,
      x = lab.A / 500 + y,
      z = y - lab.B / 200,
      r, g, b;

  x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16/116) / 7.787);
  y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16/116) / 7.787);
  z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16/116) / 7.787);

  r = x *  3.2406 + y * -1.5372 + z * -0.4986;
  g = x * -0.9689 + y *  1.8758 + z *  0.0415;
  b = x *  0.0557 + y * -0.2040 + z *  1.0570;

  r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1/2.4) - 0.055) : 12.92 * r;
  g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1/2.4) - 0.055) : 12.92 * g;
  b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1/2.4) - 0.055) : 12.92 * b;

  // return [Math.max(0, Math.min(1, r)) * 255, 
  //         Math.max(0, Math.min(1, g)) * 255, 
  //         Math.max(0, Math.min(1, b)) * 255]
          
  return { R: Math.max(0, Math.min(1, r)) * 255, 
          G: Math.max(0, Math.min(1, g)) * 255, 
          B: Math.max(0, Math.min(1, b)) * 255}
}
