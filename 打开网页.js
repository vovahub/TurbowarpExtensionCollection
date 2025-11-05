//插件作者为VovaLU和Deepseek，请明确版权©️，您可以优化但必须写上来源
(function(Scratch) {
  'use strict';

  class SmartUrlOpener {
    getInfo() {
      return {
        id: 'smartUrlOpener',
        name: '打开网页',
        color1: '#4A90E2',
        color2: '#357ABD',
        color3: '#2A5F9E',
        blocks: [
          {
            opcode: 'openUrl',
            blockType: Scratch.BlockType.COMMAND,
            text: '在新窗口打开网址 [URL]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'www.example.com'
              }
            }
          }
        ]
      };
    }

    openUrl(args) {
      let url = Scratch.Cast.toString(args.URL).trim();
      
      return new Promise((resolve) => {
        setTimeout(() => {
          try {
            // 智能处理网址格式
            const processedUrl = this.processUrl(url);
            
            if (processedUrl) {
              // 在新标签页打开网址
              window.open(processedUrl, '_blank');
              console.log('成功打开网址:', processedUrl);
            } else {
              console.warn('无效的网址:', url);
            }
            resolve();
          } catch (error) {
            console.error('打开网址失败:', error);
            resolve();
          }
        }, 100);
      });
    }

    processUrl(url) {
      if (!url) return null;
      
      // 如果已经有http://或https://，直接返回
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
      
      // 处理www开头的网址
      if (url.startsWith('www.')) {
        return 'https://' + url;
      }
      
      // 处理其他常见域名格式
      if (url.includes('.') && !url.includes(' ')) {
        // 包含点号且不包含空格，可能是域名
        return 'https://www.' + url;
      }
      
      // 尝试添加https://和www.
      return 'https://www.' + url;
    }
  }

  Scratch.extensions.register(new SmartUrlOpener());
})(Scratch);