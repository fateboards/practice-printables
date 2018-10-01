import React, { Component } from 'react';
import ReactToPrint from "react-to-print";
import { Button, ButtonIcon } from '@rmwc/button';
import logo from '../assets/images/worksheet_footer_logo.jpg';

export const LandscapeOrientation = () => (
  <style type="text/css">
    {"@media print{@page {size: landscape}}"}
  </style>
);

export const PortraitOrientation = () => (
  <style type="text/css">
    {"@media print{@page {size: portrait}}"}
  </style>
);

class Preview extends Component {

  state = {
    imagesrc: null,
    updateCanvas: false,
    heightWarning: false,
    widthWarning: false
  };

  toPrint = null;

  componentDidMount() {
      this.updateCanvas();
  }

  componentDidUpdate() {
    if (this.state.updateCanvas) {
      this.updateCanvas();
    }

  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.data.heightWarning !== this.props.data.heightWarning) {
        return false;
      }
      this.setState({updateCanvas: true});
      return true;
      //this.updateCanvas();
  }

  updateCanvas() {
    this.setState({updateCanvas: false});
    this.setState({widthWarning: false});
      const canvasContext = this.refs.canvas.getContext('2d');
      const canvasWidth = this.refs.canvas.width;
      const canvasHeight = this.refs.canvas.height;

      //clear canvas before redrawing
      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);


      //setup line type for top and bottom lines
      canvasContext.setLineDash([0, 0]);
      canvasContext.strokeStyle = '#00b3ff';
      canvasContext.beginPath();
      for (let i = 0; i < this.props.data.preview.words.length; i++) {
        let multiplier = 1;
        if (i !== 0) {
          multiplier = i * ((this.props.data.preview.sliderValue2 + 30) * 1.586);
        }


        canvasContext.moveTo(30, 20 + multiplier);
        canvasContext.lineTo(canvasWidth - 30, 20 + multiplier);

        canvasContext.moveTo(30, (49 + this.props.data.preview.sliderValue2) + multiplier);
        canvasContext.lineTo(canvasWidth - 30, (49 + this.props.data.preview.sliderValue2) + multiplier);

        let wordWidth = canvasContext.measureText(this.props.data.preview.words[i]);

        if (wordWidth.width > canvasWidth - 50 ) {
          this.setState({widthWarning: true});
        } else {
          //this.setState({widthWarning: false});
        }

        canvasContext.font =  (46 + this.props.data.preview.sliderValue2 * 1.586) + 'px dotfont';
        canvasContext.fillText(this.props.data.preview.words[i],40, (49 + this.props.data.preview.sliderValue2) + multiplier);

        if ((49 + this.props.data.preview.sliderValue2) + multiplier > canvasHeight) {
          this.setState({heightWarning: true});
         } else {
            this.setState({heightWarning: false});
         }
       }
       //draw the lines
        canvasContext.stroke();

        //setup line type for middle lines
        canvasContext.setLineDash([5, 3]);
        canvasContext.strokeStyle = '#ff00008a';
        canvasContext.beginPath();
        for (let i = 0; i < this.props.data.preview.words.length; i++) {
          let multiplier = 1;
          if (i !== 0) {
            multiplier = i * ((this.props.data.preview.sliderValue2 + 30) * 1.586);
          }
          canvasContext.moveTo(30, (33 + this.props.data.preview.sliderValue2 /2.28) + multiplier);
          canvasContext.lineTo(canvasWidth - 30, (33 + this.props.data.preview.sliderValue2 /2.28) + multiplier);
         }
         //draw the lines
         canvasContext.stroke();




        // let footerlogo = new Image();
        // footerlogo.src=logo;
        // canvasContext.drawImage(footerlogo, (canvasWidth - footerlogo.width) - 30, canvasHeight - 80);

         //create image from canvas for preview
        this.toPrint = new Image();
        this.toPrint.src=this.refs.canvas.toDataURL();

        this.setState({imagesrc: this.toPrint.src});

  }




  render() {
      return (
        <div>

          { this.props.data.layout === 'portrait' ? <PortraitOrientation/> : <LandscapeOrientation/>}

          <div className="flex flex-row-reverse align-items-center" style={{minHeight: '60px', width: this.props.data.layout === 'portrait' ? '475px' : '670px'}}>
              <ReactToPrint trigger={() => <Button><ButtonIcon icon="print" /> Print!</Button>} content={() => this.toPrint}/>
              {this.state.heightWarning || this.state.widthWarning ?
              <div className="worksheet_warning flex-grow"><b>warning:</b> your worksheet is larger than the printable area and clipping may occur. Please adjust size or limit words for a better fit.</div>
              : null }
          </div>
          <canvas ref="canvas" width={this.props.data.layout === 'portrait' ? 772 : 992} height={this.props.data.layout === 'portrait' ? 924 : 700} style={{display: 'none'}}/>
          <div className={"worksheet_preview " + this.props.data.layout} style={{backgroundImage: `url(${this.state.imagesrc})` }}></div>

        </div>
      );
  }
}

export default Preview;