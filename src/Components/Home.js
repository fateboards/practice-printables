import React, { Component } from 'react';
import { Button } from '@rmwc/button';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
           <div className="card">
              <h2 className="mdc-typography--headline5">Create custom printable worksheets</h2>
              <p className="mdc-typography--body1">Practice Printables is the ultimate online resource for free printable worksheets.
                Our custom handwriting worksheet generator is Perfect for Teachers and Parents who want to help children write their spelling and sight words.
                Simply type in your {"child's"} words and we will build you a free printable worksheet.
              </p>
               <Link to='/worksheet/builder' style={{textDecoration: 'none'}}>
                <Button unelevated>Create Worksheet</Button>
               </Link>
              <hr/>

              <h2 className="mdc-typography--headline5">Browse pre-made printable worksheets</h2>
              <p className="mdc-typography--body1">Looking for basic Alphabet and Number worksheets? Browse our collection of free printable worksheets.</p>
              <Link to='/browse' style={{textDecoration: 'none'}}>
                <Button unelevated>Browse Worksheets</Button>
              </Link>
          </div>
        );
    }
}

export default Home;