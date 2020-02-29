import { ipcMain, dialog, shell } from 'electron'
var path = require('path')
var fileUtil = require('./util/file')
var generate = require('lzg-generator')
ipcMain.on('download', function (event, content) {
  // 生成代码
  generate(content)
  // 下载到本地
  download()
})
function download() {
    const downloadpath = path.resolve(__dirname,'../dist')
    dialog.showOpenDialog(
      {properties: ['openDirectory']},
      (dirname)=> {
        const targetPath = dirname + '/vue-project/'
        fileUtil.copyDir(downloadpath, targetPath)
        shell.showItemInFolder(targetPath)
      })
}