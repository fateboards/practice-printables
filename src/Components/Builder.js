import React, { Component } from 'react';
import { Typography } from '@rmwc/typography';
import { Slider } from '@rmwc/slider';
import {
  List,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText } from '@rmwc/list';

import { TextField, TextFieldIcon, TextFieldHelperText } from '@rmwc/textfield';
import { Radio } from '@rmwc/radio';
import { Route, Switch, BrowserRouter, Link} from 'react-router-dom';

import Preview from './Preview';

class Builder extends Component {

  constructor(props) {
    super(props);

    this.sizes = [
      {name: '3/8 in', topLine: 20, midLine: 33, bottomLine: 49, fontSize: 46, margin: 50, maxLines: 28},
      {name: '1/2 in', topLine: 20, midLine: 37, bottomLine: 58, fontSize: 62, margin: 65, maxLines: 22},
      {name: '5/8 in', topLine: 20, midLine: 41, bottomLine: 67, fontSize: 76, margin: 80, maxLines: 18},
      {name: '3/4 in', topLine: 20, midLine: 45, bottomLine: 76, fontSize: 93, margin: 100, maxLines: 14},
      {name: 'test', topLine: 20, midLine: 57, bottomLine: 103, fontSize: 130, margin: 120, maxLines: 14},
    ];

    this.state = {
      preview: {
        words: [],
        size: 0,
        sizeData: this.sizes[0],
        sliderValue2: 10,
        layout: 'portrait'
      },
      layout: 'portrait'
    };


    this.sliderAmount = 10;
    this.timeout = null;
  }

  handleTextarea(value) {

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
        let words = value.split('\n');
        this.setState(prevState => ({preview: {...prevState.preview,words: words}}))
        return this;
    }, 500);

  }


  render() {

      let sizeRadios = this.sizes.map((item, index) => (
        <Radio
          key={index}
          label={item.name}
          value={index}
          name="sizeRadioGroup"
          checked={this.state.size === index}
          onChange={evt => this.setState({size: index, sizeData: this.sizes[index]})}/>

      ));

      return (
         <div className="card">
            <Typography use="headline5" tag="h2">Custom Worksheet Builder</Typography>
            <Typography use="body1" tag="p">Use the tools below to create a free printable worksheet featuring your {"child's"} spelling or sight words.</Typography>

            <div className="flex justify-content-space-between">

              <div id="builder_menu" className="flex-grow">

                <div className="builder_menu_item">
                  <Typography use="subtitle2" tag="h3">Words</Typography>
                  <div className="builder_menu_item_contents">
                    <TextField dense textarea fullwidth label="Enter a word or phrase for each line" rows="3" onChange={evt => this.handleTextarea(evt.target.value)}/>
                  </div>
                </div>

                <div className="builder_menu_item">
                  <Typography use="subtitle2" tag="h3">Size</Typography>
                  <div className="builder_menu_item_contents">
                    {/*sizeRadios*/}
                    <Slider
                        value={this.state.preview.sliderValue2 === undefined ? 10 : this.state.preview.sliderValue2}
                        onChange={evt => this.setState(prevState => ({preview: {...prevState.preview,sliderValue2: evt.detail.value}}))}
                        onInput={evt => this.setState(prevState => ({preview: {...prevState.preview,sliderValue2: evt.detail.value}}))}
                        min={10}
                        max={100}
                        step={1}/>
                  </div>
                </div>

                <div className="builder_menu_item">
                  <Typography use="subtitle2" tag="h3">Layout</Typography>
                  <div className="builder_menu_item_contents">
                    <Radio
                        label="Portrait"
                        value="portrait"
                        name="layoutRadioGroup"
                        checked={this.state.layout === 'portrait'}
                        onChange={evt => this.setState({layout: evt.target.value})}/>

                      <Radio
                        label="Landscape"
                        value="landscape"
                        name="layoutRadioGroup"
                        checked={this.state.layout === 'landscape'}
                        onChange={evt => this.setState({layout: evt.target.value})}/>
                  </div>
                </div>

              </div>

              <Preview data={this.state}/>

            </div>


        </div>
      );
    }
}

export default Builder;