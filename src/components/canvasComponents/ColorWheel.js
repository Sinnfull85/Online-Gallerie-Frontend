import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { changeBrushColor } from '../../redux/brushSlice'


export default ({brushOptions,setbrushOptions}) => {

  const dispatch = useDispatch();

useEffect(() => {

    function pickColor(evt){

        const canvas = this;
        const ctx = canvas.getContext("2d");
        
        // const pixel = ctx.getImageData(evt.layerX,evt.layerY,1,1)

        const offsetY = evt.target.offsetTop;
        const offsetX = evt.target.offsetLeft;
  
        const pixel = ctx.getImageData(evt.layerX,evt.layerY,1,1)

        const data =  pixel.data;
        const rgba = 'rgba(' + data[0] + ',' + data[1] +
             ',' + data[2] + ',' + (data[3] / 255) + ')';
             
        // const newBrushOptions = {...brushOptions,brushColor: rgba}
        // setbrushOptions(newBrushOptions);
      dispatch(changeBrushColor(rgba));

        createCanvas();
        ctx.beginPath();

        ctx.arc(evt.layerX -offsetX,evt.layerY -offsetY, 5, 0, 2 * Math.PI);
        ctx.lineWidth = brushOptions.brushSize;
        
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();

        ctx.beginPath();

        ctx.arc(evt.layerX -offsetX,evt.layerY -offsetY, 4, 0, 2 * Math.PI);
        ctx.lineWidth = brushOptions.brushSize;
        
        ctx.strokeStyle = "#000000";
        ctx.stroke();
      
      

    }

    function clamp(min, max, val)
{
	if (val < min) return min;
	if (val > max) return max;
	return val;
}

var hsv2rgb = function(hsv) {
    
    var h = hsv.hue, s = hsv.sat, v = hsv.val;
    var rgb, i, data = [];
    if (s === 0) {
      rgb = [v,v,v];
    } else {
      h = h / 60;
      i = Math.floor(h);
      data = [v*(1-s), v*(1-s*(h-i)), v*(1-s*(1-(h-i)))];
      switch(i) {
        case 0:
          rgb = [v, data[2], data[0]];
          break;
        case 1:
          rgb = [data[1], v, data[0]];
          break;
        case 2:
          rgb = [data[0], v, data[2]];
          break;
        case 3:
          rgb = [data[0], data[1], v];
          break;
        case 4:
          rgb = [data[2], data[0], v];
          break;
        default:
          rgb = [v, data[0], data[1]];
          break;
      }
    }
    return rgb;
  };

    const createCanvas = () => 
    {
        const canvas = document.getElementById("stripe"), ctx = canvas.getContext("2d");
       
        canvas.height = 100;
        canvas.width= 360;
        const imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
        const height=imgData.height, width=imgData.width;

        for(let yPos= 0; yPos<height;yPos++){

            for(let xPos= 0,divisor=2; xPos<width;xPos++){

                let hue = xPos;
                let sat = clamp(0, 1, yPos / (height/divisor) );
			    let val = clamp(0, 1, (height-yPos) / (height/divisor) );

                let rgb = hsv2rgb( {hue:hue, sat:sat, val:val} );

               let index = 4 * (xPos + yPos*360);

                
                imgData.data[ index + 0 ] = rgb[0] * 255;
                imgData.data[ index + 1 ] = rgb[1] * 255;	
                imgData.data[ index + 2 ] = rgb[2] * 255;	
                imgData.data[ index + 3 ] = 255;	
                

            }


        }
        ctx.putImageData(imgData, 0, 0);
        return canvas;
    }

    const strip = createCanvas();
    strip.addEventListener('pointerdown',pickColor,false);



},[])
    
 return(
        <div id="colorpalettePlace">
            {/* <canvas id="colorwheel"></canvas> */}
            <canvas id="stripe"></canvas>
        </div>
    )
}