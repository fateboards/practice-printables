import React, { Component } from 'react';
import { Typography } from '@rmwc/typography';
import { Link } from 'react-router-dom';

import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardAction,
  CardActions,
  CardActionIcons
} from '@rmwc/card';

class Browse extends Component {

    render() {

      let letters = [
        {letter: 'a', letter_cap: 'A', visual_aid: 'apple', image: require('../assets/images/previews/letter_a.jpg'), pdf: '/worksheets/Letter_A_Practice.pdf'},
        {letter: 'b', letter_cap: 'B', visual_aid: 'bee', image: require('../assets/images/previews/letter_b.jpg'), pdf: '/worksheets/Letter_B_Practice.pdf'},
        {letter: 'c', letter_cap: 'C', visual_aid: 'cat', image: require('../assets/images/previews/letter_c.jpg'), pdf: '/worksheets/Letter_C_Practice.pdf'},
        {letter: 'd', letter_cap: 'D', visual_aid: 'dog', image: require('../assets/images/previews/letter_d.jpg'), pdf: '/worksheets/Letter_D_Practice.pdf'},
        {letter: 'e', letter_cap: 'E', visual_aid: 'elephant', image: require('../assets/images/previews/letter_e.jpg'), pdf: '/worksheets/Letter_E_Practice.pdf'}
      ];

      let cards = letters.map((item, index) => (
          <Card className="printables_card" key={index}>
            <CardPrimaryAction>
              <CardMedia
                sixteenByNine
                style={{backgroundImage: `url(${item.image})`}}/>
              <div style={{ padding: '0 1rem 1rem 1rem' }}>
                <Typography use="subtitle2" tag="h2">
                  Practice Tracing The Letter {item.letter_cap}
                </Typography>
                <Typography use="body2" tag="div" theme="text-secondary-on-background">
                  Trace the letter <b>{item.letter_cap}</b> in both upper and lowercase, and practice it in the word <b>{item.visual_aid}</b>.
                </Typography>
              </div>
            </CardPrimaryAction>
            <CardActions>
              <CardActionIcons>
                  <Link to={item.pdf} target="_blank">
                    <CardAction icon="visibility" />

                  <CardAction icon="print" />
                  </Link>
                </CardActionIcons>
            </CardActions>
          </Card>




      ));

        return (

              <div className="flex flex-wrap">
                {cards}
              </div>

        );
    }
}

export default Browse;