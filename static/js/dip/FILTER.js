function _GUSSIAN_BLUR_RGB2(ORIGINAL)
    {
        let DUPLICATE = _DUPLICATE(ORIGINAL);
        let FILTER = [1,2,1,  2,4,2,  1,2,1];
        for(let Y=1; Y<ORIGINAL.height-1; Y++)
        {
            for(let X=1; X<ORIGINAL.width-1; X++)
            {
                let NEIGHBOURS = _NEIGHBOURS_RGB2(DUPLICATE, X, Y);
                let NEW_PIXEL = _MULTIPLY_ARR_ARR_RGB2(NEIGHBOURS, FILTER);
                _SET_ALL_PIX_RGB(DUPLICATE, X, Y, NEW_PIXEL.R, NEW_PIXEL.G, NEW_PIXEL.B);
            }
        }
        return DUPLICATE;
    }

function _NEIGHBOURS_RGB2(DATA, _X, _Y)
{
    let ARR = [];
    for(let Y=-1; Y<2; Y++)
    {
        for(let X=-1; X<2; X++)
        {
            ARR.push(_GET_ALL_PIX_RGB(DATA, (_X+X), (_Y+Y)));
        }
    }
    return ARR;
}
function _MULTIPLY_ARR_ARR_RGB2(ARR1, ARR2)
{
    let MEAN = 16;
    let VAL = 
    {
        R: 0,
        G: 0,
        B: 0,
    };
    for(let i=0; i<9; i++)
    {
    VAL.R += (ARR1[i].R * ARR2[i]);
    VAL.G += (ARR1[i].G * ARR2[i]);
    VAL.B += (ARR1[i].B * ARR2[i]);
    }
    VAL.R = VAL.R/MEAN;
    VAL.G = VAL.G/MEAN;
    VAL.B = VAL.B/MEAN;
    return (VAL);
}