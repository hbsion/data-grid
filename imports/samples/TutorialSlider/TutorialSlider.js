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


class Carousel extends React.Component {
  render() {
    return (
      <ReactSwipe className="carousel" swipeOptions={{continuous: false}} style={carouselStyle}>
          <div className="tutorial-panel color:warning">PANE 1</div>
          <div className="tutorial-panel color:action">PANE 2</div>
          <div className="tutorial-panel color:critical">PANE 3</div>
      </ReactSwipe>
    );
  }
}

const style = {
  button: {
    width: '100%',
    height: '100%',
  },
};

const TutorialSlider = (props) => {
  return (
    <oo-box class="flex:column h:100p">
      <oo-item class="flex:1">
        <div className="oo-absolute">
          <Device>
            <Carousel/>
          </Device>
        </div>
      </oo-item>
      <oo-item class="flex:50px">
        <Button primary className="" style={style.button}>Next</Button>
      </oo-item>
    </oo-box>
  );
};

export default TutorialSlider;
