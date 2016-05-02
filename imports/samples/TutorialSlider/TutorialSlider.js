import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import { Button } from 'belle';

const Device = (props) => {
  return (
    <div className="phone-outer">
      <div className="phone-speaker"></div>
      <div className="phone-inner">
        {props.children}
      </div>
      <div className="phone-button"></div>
    </div>
  );
};

const carouselStyle = {
  container: {
    overflow: 'hidden',
    visibility: 'hidden',
    position: 'relative',
    height: '100%',
  },
  wrapper: {
    overflow: 'hidden',
    position: 'relative',
    height: '100%',
  },
  child: {
    float: 'left',
    width: '100%',
    height: '100%',
    position: 'relative',
    transitionProperty: 'transform',
  },
};

const buttonsStyle = {
  button: {
    flex: '1',
    // width: '100%',
    height: '100%',
  },
};

class Carousel extends React.Component {
  next() {
    console.log('🍋', this);
    this.refs.reactSwipe.next();
  }
  prev() {
    this.refs.reactSwipe.prev();
  }
  render() {
    console.log('👻', this);
    return (
      <oo-box class="flex:column h:100p">
        <oo-item class="flex:1">
          <div className="oo-absolute">
            <Device>
              <ReactSwipe ref="reactSwipe" className="carousel" swipeOptions={{continuous: false}} style={carouselStyle}>
                  <div className="tutorial-panel color:warning">PANE 1</div>
                  <div className="tutorial-panel color:action">PANE 2</div>
                  <div className="tutorial-panel color:critical">PANE 3</div>
              </ReactSwipe>
            </Device>
          </div>
        </oo-item>
        <oo-box class="flex:50px">
          {/* <Button primary className="" style={buttonsStyle.button} onClick={this.prev.bind(this)}>Back</Button> */}
          <Button primary className="" style={buttonsStyle.button} onClick={this.next.bind(this)}>Next</Button>
        </oo-box>
      </oo-box>
    );
  }
}


const TutorialSlider = (props) => {
  return (
    <Carousel/>
  );
};

export default TutorialSlider;
