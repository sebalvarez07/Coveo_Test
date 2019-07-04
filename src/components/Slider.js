import React from 'react';
import { Slider, Handles, Tracks, Rail } from 'react-compound-slider';
import { SliderRail, Handle, Track } from './SliderComponents';

const SliderComponent = (props) => {
    return (
        <Slider
            className='price-slider__slider'
            mode={1}
            step={5}
            domain={props.domain}
            onUpdate={props.onUpdate}
            onChange={props.onChange}
            values={props.values}
        >
            <Rail>
                {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
            </Rail>
            <Handles>
                {({ handles, getHandleProps }) => (
                <div className="slider-handles">
                    {handles.map(handle => (
                    <Handle
                        key={handle.id}
                        handle={handle}
                        domain={props.domain}
                        getHandleProps={getHandleProps}
                    />
                    ))}
                </div>
                )}
            </Handles>
            <Tracks left={false} right={false}>
                {({ tracks, getTrackProps }) => (
                    <div className="slider-tracks">
                        {tracks.map(({ id, source, target }) => (
                        <Track
                            key={id}
                            source={source}
                            target={target}
                            getTrackProps={getTrackProps}
                        />
                        ))}
                    </div>
                )}
            </Tracks>
        </Slider>
    )
    
}
 
export default SliderComponent;