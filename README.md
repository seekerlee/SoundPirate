SoundPirate Chrome Extension
============

### "Grabbing Your Favourite Sound Like a Pirate!"

1. Checkout your Chrome version is 24+
2. Download and install the extension, either through [Chrome WebStore](https://chrome.google.com/webstore/detail/声海盗/idleenniidjlnmnjkjmmnocnkmjibadd)( for Stable Version ) , or [Github](https://github.com/spiderPan/Sound-Pirate) ( for Dev version)
3. Go to online music website and enjoy the music.
4. Once you see the small icon show up on left bottom conner, that means Sound Pirate is ready to grab that music!

### Wanna put any comments or feedback?
Seeker Lee [@Github](https://github.com/seekerlee) or
Pan[@Github] (https://github.com/spiderPan), [@Facebook](https://www.facebook.com/banglanfeng.pan)

### Note
The following websites have been tested to support 
[Douban FM](http://douban.fm/)，[Douban Artists](http://music.douban.com/artists/)，[Xiami](http://www.xiami.com/)，[QQ music](http://y.qq.com/)，[163 music](http://music.163.com/)，[Kuwo](http://kuwo.cn)


声海盗
============

### 声海盗-下载在线音乐的Chrome插件
支持[豆瓣FM](http://douban.fm/)，[豆瓣音乐人](http://music.douban.com/artists/)，[虾米](http://www.xiami.com/)，[QQ音乐](http://y.qq.com/)，[网易云音乐](http://music.163.com/)，[酷我](http://kuwo.cn)，[echo回声](http://www.app-echo.com)等.

### 使用方法：
1. 升级你的chrome或其他chrome核浏览器(已知支持枫树浏览器，360急速浏览器最新版)，已知支持chrome内核24+版本
2. 安装此插件([Chrome WebStore链接](https://chrome.google.com/webstore/detail/声海盗/idleenniidjlnmnjkjmmnocnkmjibadd))
3. 打开在线音乐网页，播放音乐
4. 音乐成功播放后，左下角/右下角会出现下载链接，点击下载

报告bug，提建议请建 issue

How to develop or build your own SoundPirate
============
0. make sure you have nodejs installed
1. clone this repo, and cd inside
2. run `npm install`
3. to develop: `npm run start`
4. to build: `npm run build`
5. remove/disable SoundPirate if you already installed from Chrome Webstore
6. open url chrome://extensions/ in chrome, and click 'load unpacked' button and select the build folder. 
7. listen and test

src/js/service/qq.js is a good example to start.

TODO:
1. support m3u8 if possible
2. add options

New in 2.0:
1. Rewrite the code. It should be easier to understand and maintain.
2. Add more service should be easier.
3. Fixed some old bugs, performance issues.
4. Remove a few dead services

credit to https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate
