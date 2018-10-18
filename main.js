'use strict';

const Fs = require('fire-fs');
const Path = require('fire-path');

module.exports = {
  load () {
    // execute when package loaded
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('d7kj-cocos');
    },
    'say-hello' () {
      Editor.log('Hello World!');
      // send ipc message to panel
      Editor.Ipc.sendToPanel('d7kj-cocos', 'd7kj-cocos:hello');
    },
    // 生成标准资源目录
    'gen_std_dirs' () {
      let create = (sub_dir)=>{
        let path = Path.join(Editor.projectPath, 'assets', sub_dir);
        Fs.mkdirsSync(path);
        Editor.assetdb.refresh('db://assets/' + sub_dir, ()=>{
          Editor.success('create dir ' + sub_dir + ' success!');
        });
      };
      let sub_dirs = ['res', 'scenes', 'scripts', ];
      sub_dirs.map((dir)=>{create(dir);});
    },
    'clicked' () {
      Editor.log('Button clicked!');
    }
  },
};