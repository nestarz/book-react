import React, { PureComponent, useRef } from 'react';
import useComponentSize from '@rehooks/component-size';
import styled from 'styled-components'

import { RemountOnResize } from './remount';

// A helper component, wrapping retina logic for canvas and
// auto-resizing the sketch to fill its parent container.
// To determine size/layout, we just use CSS on the div containing
// the Sketch component (we might use this with flexbox, for example).
class SketchComponentRaw extends PureComponent {

	constructor(props) {
		super(props);
		this.mountedView = this.mountedView.bind(this);
		this.state = {};
	}

	// The way canvas interacts with CSS layouting is a bit buggy
	// and inconsistent across browsers. To make it dependent on
	// the layout of the parent container, we only render it after
	// mounting view, that is: after CSS layouting is done.
	mountedView(view) {
		if (view) {
			import("p5")
				.then((p5) => {
					const ratio = 1;
					const width = (view.clientWidth * ratio) | 0;
					const height = (view.clientHeight * ratio) | 0;
					let newState = { view, width, height, ratio };
					let { sketch, sketchProps, noCanvas } = this.props;
					if (sketch) {
						const _sketch = (p5) => {
							sketch(width, height, sketchProps)(p5);

							// handle creation of canvas
							const _setup = p5.setup ? p5.setup : () => { };
							p5.setup = noCanvas ? () => {
								p5.noCanvas();
								_setup();
							} : () => {
								p5.createCanvas(width, height);
								_setup();
							};

							// handle removing the sketch if the component unmounts
							const _unmount = p5.unmount;
							p5.unmount = () => {
								if (_unmount) {
									_unmount();
								}
								p5.remove();
							}

						}
						newState.sketch = new p5.default(_sketch, view);
					}
					this.setState(newState);
				})
		}
	}

	componentWillReceiveProps(nextProps) {
		// pass relevant props to sketch
		const { sketch } = this.state;
		if (sketch && sketch.receiveProps && nextProps.sketchProps) {
			sketch.receiveProps(nextProps.sketchProps);
		}
	}

	componentWillUnmount() {
		if (this.state.sketch) {
			this.state.sketch.unmount();
		}
	}

	render() {
		// If not given a width or height prop, make these fill their parent div
		// This will implicitly set the size of the <Canvas> component, which
		// will then call the passed paint function with the right dimensions.
		const { props } = this;
		let style = Object.assign({}, props.style);
		let { width, height } = props;
		switch (typeof width) {
			case 'number':
				width = width | 0;
				style.width = width;
				style.minWidth = width;
				style.maxWidth = width;
				break;
			case 'string':
				style.width = width;
				break;
			case 'undefined':
				style.width = style.width ? style.width : '100%';
				break;
			default:
				break;
		}
		switch (typeof height) {
			case 'number':
				height = height | 0;
				style.height = height;
				style.minHeight = height;
				style.maxHeight = height;
				break;
			case 'string':
				style.height = height;
				break;
			case 'undefined':
				style.height = style.height ? style.height : '100%';
				break;
			default:
				break;
		}

		//style.margin = style.margin ? style.margin : '0 auto';
		return (
			<div
				ref={this.mountedView}
				style={style}
				className={props.className}
			/>
		);
	}
}


class SketchComponentFixed extends PureComponent {
	render() {
		if (typeof window !== 'undefined') {
			//import p5 from 'p5';
			//import 'p5/lib/addons/p5.dom';
			const { props } = this;
			//const RemountOnResize = require( './remount' );
			return (
				<RemountOnResize
					/* Since canvas interferes with CSS layouting,
					we unmount and remount it on resize events */
					watchedVal={props.watchedVal}
				>
					<SketchComponentRaw
						sketch={props.sketch}
						sketchProps={props.sketchProps}
						noCanvas={props.noCanvas}
						width={props.width}
						height={props.height}
						style={props.style}
						className={props.className}
					/>
				</RemountOnResize>
			);
		}
		return (
			<div></div>
		)
	}
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
export const SketchComponent = props => {
  var {className, style, ...otherProps} = props;
  const wrapperRef = useRef(null)
  const wrapperSize = useComponentSize(wrapperRef)
  return <Wrapper style={style} className={className} ref={wrapperRef}>
      <SketchComponentFixed
        width={wrapperSize.width}
        height={wrapperSize.height}
        {...otherProps}
      />
    </Wrapper>
}
export const SketchComponentBackground = styled(SketchComponent)`
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  pointer-events: none;
  mix-blend-mode: multiply;
`;
export const SketchComponentAbsoluteBackground = styled(SketchComponentBackground)`
`;
export const SketchComponentFixedBackground = styled(SketchComponentBackground)`
  position: fixed;
`;