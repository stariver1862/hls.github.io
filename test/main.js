import SuperpoweredModule from './superpowered.js'

var audioContext = null; // Reference to the audio context.
var audioNode = null;    // This example uses one audio node only.
var Superpowered = null; // Reference to the Superpowered module.
var content = null;      // The <div> displaying everything.
var pitchShift = 0;      // The current pitch shift value.

// onclick by the pitch shift minus and plus buttons
function changePitchShift(e) {
    // limiting the new pitch shift value
    let value = parseInt(e.target.value);
    pitchShift += value;
    if (pitchShift < -12) pitchShift = -12; else if (pitchShift > 12) pitchShift = 12;
    // displaying the value
    document.getElementById('pitchShiftDisplay').innerText = '变调: ' + ((pitchShift < 1) ? pitchShift : '+' + pitchShift) + ' ';
    // sending the new value to the audio node
    audioNode.sendMessageToAudioScope({ 'pitchShift': pitchShift });
}

// on change by the rate slider
function changeRate() {
    // displaying the new rate
    let value = document.getElementById('rateSlider').value, text;
    if (value == 10000) text = '原始速度';
    else if (value < 10000) text = '-' + (100 - value / 100).toPrecision(2) + '%';
    else text = '+' + (value / 100 - 100).toPrecision(2) + '%';
    document.getElementById('rateDisplay').innerText = text;
    // sending the new rate to the audio node
    audioNode.sendMessageToAudioScope({ rate: value });
}

// double click on the rate slider
function changeRateDbl() {
    document.getElementById('rateSlider').value = 10000;
    changeRate();
}

// click on play/pause
function togglePlayback(e) {
    let button = document.getElementById('playPause');
    if (button.value == 1) {
        button.value = 0;
        button.innerText = '播放';
        audioContext.suspend();
    } else {
        button.value = 1;
        button.innerText = '暂停';
        audioContext.resume();
    }
}

// we have the audio system created, let's display the UI and start playback
function onAudioDecoded(buffer) {
    // send the PCM audio to the audio node
    audioNode.sendMessageToAudioScope({
         left: buffer.getChannelData(0),
         right: buffer.getChannelData(1) }
    );

    // audioNode -> audioContext.destination (audio output)
    audioContext.suspend();
    audioNode.connect(audioContext.destination);

    // UI: innerHTML may be ugly but keeps this example small
    content.innerHTML = '\
        <center><h2>月光下的凤尾竹</h2><center>\
        <center><h5>作曲：施光南    演奏：李春华</h5><center>\
        <center><h5>速度：原速    调式：bB</h5><center>\
        <div id="progress"><div style="position: relative;height:40;width:100%;border:solid 0px #EEC286;background-color:gainsboro;"><div style="position:absolute;height:40;width:0%; background-color: #EEC286;text-align:right;">0%</div></div></div>\
        <center><h1> </h1><center>\
        <button id="playPause" class="round_btn" value="0">播放</button>\
    ';
    /*
    document.getElementById('rateSlider').addEventListener('input', changeRate);
    document.getElementById('rateSlider').addEventListener('dblclick', changeRateDbl);
    document.getElementById('pitchMinus').addEventListener('click', changePitchShift);
    document.getElementById('pitchPlus').addEventListener('click', changePitchShift);
    */
   document.getElementById('playPause').addEventListener('click', togglePlayback);
}

// when the START button is clicked
function start() {
    content.innerText = '创建音频处理器...';
    audioContext = Superpowered.getAudioContext(44100);
    let currentPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));

    Superpowered.createAudioNode(audioContext, currentPath + '/processor.js', 'MyProcessor',
        // runs after the audio node is created
        function(newNode) {
            audioNode = newNode;
            content.innerText = '下载曲子中...';

            // downloading the music
            let request = new XMLHttpRequest();
            request.open('GET', encodeURIComponent('test.mp3'), true);
            //request.setRequestHeader("Access-Control-Allow-Origin", "*");            
            request.responseType = 'arraybuffer';
            request.onload = function() {
                content.innerText = '解码音频...';
                audioContext.decodeAudioData(request.response, onAudioDecoded);
            }
            request.send();
        },

        // runs when the audio node sends a message
        function(message) {
            if( message.message_type == 'frame_pos' )
            {
                let play_pos = message.frame_pos/message.frame_total;
                document.getElementById('progress').innerHTML='<div style="position: relative;height:40;width:100%;border:solid 0px #EEC286;background-color:gainsboro;"><div style="position:absolute;height:40;width:'+play_pos*100+'%; background-color: #EEC286;text-align:right;">'+Math.round(play_pos*100)+'% </div></div>';
                //console.log('frame_pos message' + play_pos);
            }
        }
    );
}

Superpowered = SuperpoweredModule({
    licenseKey: 'ExampleLicenseKey-WillExpire-OnNextUpdate',
    enableAudioTimeStretching: true,

    onReady: function() {
        content = document.getElementById('content');
        content.innerHTML = '<button id="startButton">开始</button>';
        //document.getElementById('startButton').addEventListener('click', start);
        start();
    }
});
