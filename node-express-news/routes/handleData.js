// const fs = require('fs')
const temp = [
  {
    "create_time": "2023-03-01T08:32:26.000Z",
    "update_time": "2023-03-01T08:32:26.000Z",
    "id": 43,
    "user_id": 3,
    "news_id": 11,
    "content": "1",
    "parent_id": null,
    "like_count": null
  },
  {
    "create_time": "2023-03-01T10:26:37.000Z",
    "update_time": "2023-03-01T10:26:37.000Z",
    "id": 45,
    "user_id": 3,
    "news_id": 1,
    "content": "测试评论不用在意",
    "parent_id": null,
    "like_count": null
  },
  {
    "create_time": "2023-03-06T05:40:24.000Z",
    "update_time": "2023-03-06T05:40:24.000Z",
    "id": 46,
    "user_id": 3,
    "news_id": 149,
    "content": "hellow",
    "parent_id": null,
    "like_count": null
  },
  {
    "create_time": "2023-03-07T08:41:56.000Z",
    "update_time": "2023-03-07T08:41:56.000Z",
    "id": 48,
    "user_id": 3,
    "news_id": 149,
    "content": "我来发表一条评论，不用在意",
    "parent_id": null,
    "like_count": null
  },
  {
    "create_time": "2023-03-01T08:33:15.000Z",
    "update_time": "2023-03-01T08:33:15.000Z",
    "id": 44,
    "user_id": 3,
    "news_id": 11,
    "content": "122",
    "parent_id": 43,
    "like_count": null
  },
  {
    "create_time": "2023-03-06T05:40:38.000Z",
    "update_time": "2023-03-06T05:40:38.000Z",
    "id": 47,
    "user_id": 3,
    "news_id": 149,
    "content": "我来回复你了",
    "parent_id": 46,
    "like_count": null
  },
  {
    "create_time": "2023-03-07T08:46:36.000Z",
    "update_time": "2023-03-07T08:46:36.000Z",
    "id": 49,
    "user_id": 3,
    "news_id": 149,
    "content": "我是评论的评论",
    "parent_id": 47,
    "like_count": null
  }
]


/**
 *  场景: 评论页面是多棵树的结构, 针对于新闻的评论位于顶层，对于评论的评论是树杈，需要依据给出的结构聚合成
 *  树的结构
 *
 * @params isHandle 标记当前节点 是否已经被处理
 *
 *
 * */

function flattenTree (arr) {
  const firstEle = arr[0]
  for (let i = 0; i < firstEle.children.length; i++) {
    const curNode = firstEle[i]
    if(curNode.children){
      curNode.children.concat()
    }
  }
}


function t (temp, node, finallyArr) { // 这个方法能将某一条线给收起来
  let tempNode = node;
  // 寻找当前节点的最下层节点
  if (!node.isHandle) {
    for (let i = 0; i < temp.length; i++) {
      const subNode = temp[i]
      if (subNode.parent_id && subNode.parent_id === tempNode.id) {
        tempNode = subNode
        i = 0
      }
    }
  }
  // 标记节点
  tempNode.isHandle = true
  if (tempNode.parent_id) { // 如果存在父级节点
    const filterItem = temp.find((t) => {
      return t.id === tempNode.parent_id
    })
    if (filterItem.isHandle) { // 说明当前节点是之前遗漏的节点
      filterItem.children.push(tempNode)
      for (let i = 0; i < temp.length; i++) {
        if (!temp[i].isHandle) {
          t(temp, temp[i], finallyArr)
          break
        }
      }
    } else {
      filterItem.isHandle = true
      if (filterItem) {
        if (filterItem.children) {
          filterItem.children.push(tempNode)
        } else {
          filterItem.children = []
          filterItem.children.push(tempNode)
        }
        t(temp, filterItem, finallyArr)
      }
    }
  } else {
    finallyArr.push(node)
    for (let i = 0; i < temp.length; i++) {
      if (!temp[i].isHandle) {
        t(temp, temp[i], finallyArr)
        break
      }
    }
  }
  return finallyArr
}

console.log(t(temp, temp[0], []));
// const data = JSON.stringify(t(temp, temp[0], []))

// fs.writeFileSync('test.json', data)
