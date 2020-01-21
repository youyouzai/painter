var fs = require('fs')
const getRoot = process.cwd()
class FileUtil {
  constructor () {
    this.targetDir = getRoot + '/dist/generator'
  }
  write (path, text) {
    let target = this.targetDir + path
    let fatherDir = target.substring(0, target.lastIndexOf('/'))
    try {
      fs.mkdirSync(fatherDir, {recursive: true})
    } catch (err) {
      console.log(`创建文件夹${fatherDir}失败：` + err)
    }
    try {
      fs.writeFileSync(target, text)
      console.log(`文件${path}写入成功`)
    } catch (err) {
      console.log(`文件${path}写入失败：` + err)
    }
  }
  read (path) {
    return fs.readFileSync(getRoot + path, {flag: 'r+', encoding: 'utf8'})
  }
  /*
   * 复制目录、子目录，及其中的文件
   * @param src {String} 要复制的目录
   * @param dist {String} 复制到目标目录
   */
  mkdir (path) {
    // eslint-disable-next-line no-useless-escape
    var reg = /[\\\/]+/g
    let result = null
    while ((result = reg.exec(path)) != null) {
      const target = path.substring(0, result.index) + result[0]
      try {
        fs.mkdirSync(target)
      } catch (e) {
        // do nothing
      }
    }
    try {
      fs.mkdirSync(path)
    } catch (e) {
      console.log(`创建文件夹${path}失败！`)
    }
  }
  copyDir (src, dist) {
    const _self = this
    fs.access(dist, function (err) {
      if (err) {
        // 目录不存在时创建目录
        _self.mkdir(dist)
      }
      _self.copy(null, src, dist, function (err) {
        console.log('错误：' + err)
      })
    })
  }
  copy (err, src, dist, callback) {
    const _self = this
    if (err) {
      callback(err)
    } else {
      fs.readdir(src, function (err, paths) {
        if (err) {
          callback(err)
        } else {
          paths.forEach(function (path) {
            var _src = src + '/' + path
            var _dist = dist + '/' + path
            fs.stat(_src, function (err, stat) {
              if (err) {
                callback(err)
              } else {
                // 判断是文件还是目录
                if (stat.isFile()) {
                  fs.writeFileSync(_dist, fs.readFileSync(_src))
                } else if (stat.isDirectory()) {
                  // 当是目录是，递归复制
                  _self.copyDir(_src, _dist, callback)
                }
              }
            })
          })
        }
      })
    }
  }
}
export default new FileUtil()
