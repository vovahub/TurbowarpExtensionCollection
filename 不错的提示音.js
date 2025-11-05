//插件作者为VovaLU和Deepseek，请明确版权©️，您可以优化但必须写上来源
//介绍：一个提示音扩展，如果你懒得做提示音频这个可以很好的帮助你
//版本：0.0.1
(function(Scratch) {
  'use strict';
  
  class SoundExtension {
    getInfo() {
      return {
        id: 'soundExtension',
        name: '声音提示',
        color1: '#4A90E2',
        blocks: [
          {
            opcode: 'playTone',
            blockType: Scratch.BlockType.COMMAND,
            text: '播放频率 [FREQ] Hz 持续 [DURATION] 秒',
            arguments: {
              FREQ: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 440
              },
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          }
        ]
      };
    }

    playTone(args) {
      const frequency = args.FREQ;
      const duration = args.DURATION * 1000; // 转换为毫秒
      
      // 使用Web Audio API创建声音[7](@ref)
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
      
      oscillator.start(audioContext.currentTime);
      
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    }
  }
  
  Scratch.extensions.register(new SoundExtension());
})(Scratch);