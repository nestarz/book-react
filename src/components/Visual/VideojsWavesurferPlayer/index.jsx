import React, { useEffect } from 'react';
import 'video.js/dist/video-js.min.css';
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.min.css';
import theme from '../../../../config/theme';
import { VjsPlayer } from './styles';

const VideojsWavesurferPlayer = ({ src, peaks }) => {
    const [config, setConfig] = useState({
        controls: true,
        autoplay: false,
        fluid: true,
        width: 1000,
        height: 200,
        plugins: {
            wavesurfer: {
                src: src,
                // Pre-rendered JSON
                peaks: peaks,
                msDisplayMax: 10,
                debug: true,
                waveColor: theme.colors.black,
                progressColor: '#111',
                cursorColor: theme.brand.primary,
                hideScrollbar: true,
                height: 10,
                barWidth: 5,
                responsive: false,
                partialRender: false,
                backend: 'MediaElement',
                normalize: true,
                pixelRatio: 1,
            }
        }
    })

    useEffect(() => {
        // instantiate Video.js
        const videojs = require('video.js').default;
        const WaveSurfer = require('wavesurfer.js');
        
        // register videojs-wavesurfer plugin with this import
        const Wavesurfer = require('videojs-wavesurfer/dist/videojs.wavesurfer.js');
        const player = videojs(audioNode, config, () => {
            var version_info = 'Using video.js ' + videojs.VERSION +
                ' with videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
                ' and wavesurfer.js ' + WaveSurfer.VERSION;
            videojs.log(version_info);
        });
        player.on('waveReady', () => null);
        player.on('playbackFinish', () => null);
        player.on('error', (error) => {
            console.warn(error);
        });

        return function cleanup() {
            // destroy player on unmount
            if (this.player) this.player.dispose();
        }
    }, [])

    // wrap the player in a div with a `data-vjs-player` attribute
    // so videojs won't create additional wrapper in the DOM
    // see https://github.com/videojs/video.js/pull/3856
    return (
        <VjsPlayer>
            <div data-vjs-player>
                <audio id="myAudio" ref={node => this.audioNode = node} 
                className="video-js vjs-default-skin vjs-16-9"></audio>
            </div>
        </VjsPlayer>
    )
}

export default VideojsWavesurferPlayer;