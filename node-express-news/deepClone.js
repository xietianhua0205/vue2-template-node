let obj = {
  name: 'zhufeng',
  age: 12,
  boo: true,
  n: null,
  m: undefined,
  sy: Symbol('xx'),
  big: 10n,
  child: {
    ele: 'body',
    x: 100
  },
  arr: [10, 20, 30],
  reg: /^\d+$/,
  fn: function() {
    console.log(this.name)
  },
  time: new Date(),
  err: new Error()
}

// 说明立即执行函数的执行在 预解析之后

/**
 * 对应名称
 *  - prototype: 原型
 *  - _prototype_: 原型链(链接点)
 *
 *  从属关系
 *  prototype ->
 *
 *
 * */


function test () {
}

console.log(test.__proto__ === Function.prototype)

console.log(Number.__proto__ === Function.prototype);
console.log(obj.__proto__ === Object.prototype)
console.log(111, obj.prototype)
console.log(Object.prototype.__proto__)


console.log(Function.prototype === Object.prototype)


console.log(Object.constructor === Function)


// new 运算符 this指向该实例对象 (构造函数集成)

// function Product(name, price) {
//   this.name = name;
//   this.price = price;
//   debugger
//   console.log(this)
// }
//
// function Food(name, price) {
//   this.category = 'food';
//   Product.call(this, name, price);
// }
//
// new Food('cheese', 5)

// 遍历的是最外层的

const caseSymptomsList = [
  {
    "symptoms": "发动机在任何转速和负荷下，排烟均正常，但行驶无力",
    "attachmentUrl": "http://122.9.32.153:9005/file-system/DiagnosticData_1678431424689_1678953772952.xlsx",
    "attachmentDescription": "描述",
    "caseId": "",
    "id": "",
    "attachmentArr": [
      {
        "filename": "DiagnosticData_1678431424689_1678953772952.xlsx",
        "url": "http://122.9.32.153:9005/file-system/DiagnosticData_1678431424689_1678953772952.xlsx"
      }
    ]
  }
]

const  caseForm = {
  caseName: '',
  equipmentModel: '',
  faultSystem: '',
  failureMode: '',
  id: '',
  isPublic: '0'
}

const data = {
  caseSymptomsList:caseSymptomsList.map((t)=>{
    t.attachmentUrl = t.attachmentArr.map(m=>{
       return m.url
    }).join()
    return t
  }),
  ...caseForm
}
console.log(data);




























