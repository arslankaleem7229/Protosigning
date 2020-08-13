function _IMAGE_EXTRACT(ODATA, callback)
{
    let DATA = _DUPLICATE(ODATA);
    DATA = _GUSSIAN_BLUR_RGB2(DATA);

    let CLUSTER = [];
    let EXIST;
    for(let i=0; i<DATA.data.length; i+=4)
    {
        let LAB = _RGB2LAB([DATA.data[i], DATA.data[i+1], DATA.data[i+2]]);
        if(DATA.data[i+3] < 255) {
            continue
        }
        EXIST = false;
        for(let j=0; j<CLUSTER.length; j++)
        {
            CLUSTER[j].LAB = {
                L: CLUSTER[j].L/CLUSTER[j].C,
                A: CLUSTER[j].A/CLUSTER[j].C,
                B: CLUSTER[j].B/CLUSTER[j].C
            }
            if((_ECQUALIDIAN_DISTANCE(CLUSTER[j].LAB, LAB) <= 35))
            {
                CLUSTER[j].C += 1;
                CLUSTER[j].i.push(i/4);
                CLUSTER[j].L += LAB.L;
                CLUSTER[j].A += LAB.A;
                CLUSTER[j].B += LAB.B;
                EXIST = true;
                break;
            }
        }
        if(CLUSTER.length == 0 || !EXIST)
        {
            CLUSTER.push(
                {
                    LAB: LAB,
                    L: LAB.L, A: LAB.A, B: LAB.B,
                    C: 1,
                    i: [i/4]
                } 
            )
        }
    }
    for(let y=0; y<DATA.height; y++)
    {
        for(let x=0; x<DATA.width; x++)
        {
            _SET_ALL_PIX_RGBA(ODATA, x, y, 0,0,0,0);
        }
    }
    for(let i=0; i<CLUSTER.length; i++)
    {
        let RGB = _lab2rgb(CLUSTER[i].LAB)
        for(let j=0; j<CLUSTER[i].i.length; j++)
        {
            _SET_PIX_INDEX_RGB(ODATA, CLUSTER[i].i[j], RGB)
        }
    }
    // FINAL RESULT
    _APPEND_CANVAS(ODATA);
    callback(_GET_CANVAS(ODATA))
}
