import $ from 'jquery'
import { createNode, deleteNode } from './node-factory'
import manager from './node-manager'
export default {
  // eslint-disable-next-line
  editNode (node) {
    // eslint-disable-next-line
    // console.log(node)
  },
  deleteNodeByIndex (index) {
    this.node.children.splice(index, 1)
  },
  deleteNode(node) {
    deleteNode(node)
  },
  moveNode (event, node) {
    if (!node) return
    const childNodes = this.node.children
    const moveIndex = childNodes.findIndex((item) => {
      return item.id === node.id
    })
    for (let i = 0; i < childNodes.length; i++) {
      if (i === moveIndex) break
      const child = $(`#${childNodes[i].id}`)
      const position = child.offset()
      const {width, height} = manager.getReact(child)

      const offsetX = event.pageX
      const offsetY = event.pageY

      if (i === 0) {
        // 判断是否添加到最前面
        if (!this.node.inline) {
          if (offsetY <= position.top + height) {
            this.exchange(moveIndex, -1)
            return
          }
        } else {
          if (offsetX <= position.left + width && (offsetY <= position.top + height)) {
            this.exchange(moveIndex, -1)
            return
          }
        }
      } else {
        if (offsetX > position.left && offsetX < position.left + width &&
          offsetY > position.top && offsetY < position.top + height) {
          this.exchange(moveIndex, i)
          return
        }
      }
    }
    this.exchange(moveIndex, this.node.children.length)
  },
  exchange (source, target) {
    const arr = this.node.children
    const length = arr.length
    if (source < 0 || source >= length || source === target) return
    const currentNode = arr[source]
    if (target < 0) {
      for (let i = source - 1; i >= 0; i--) {
        arr[i + 1] = arr[i]
      }
      arr[0] = currentNode
    } else if (target >= length) {
      for (let i = source; i < length - 1; i++) {
        arr[i] = arr[i + 1]
      }
      arr[length - 1] = currentNode
    } else {
      const min = Math.min(source, target)
      const max = Math.max(source, target)
      const n = arr[max]
      for (let i = max; i >= min + 1; i--) {
        arr[i] = arr[i - 1]
      }
      arr[min] = n
    }
    this.$forceUpdate()
  },
  onDragOver (event) {
    event.preventDefault()
  },
  onDrop (event) {
    event.preventDefault()
    event.stopImmediatePropagation()
    const type = Number(event.dataTransfer.getData('type'))
    const operateType = event.dataTransfer.getData('operateType')
    let node = null
    let newNode = null
    switch (operateType) {
      case 'move':
        this.moveNode(event, node)
      break
      case 'add':
        newNode = createNode(type)
        if (type === 42) {
          // 弹出框
          const root = this.$store.state.property.rootNode
          root.dialogGroupNode.children.push(newNode)
          newNode.parent = root.dialogGroupNode
        } else {
          this.node.children.push(newNode)
          newNode.parent = this.node
          this.$forceUpdate()
        }
        break
      default:
        break
    }
  }
}
