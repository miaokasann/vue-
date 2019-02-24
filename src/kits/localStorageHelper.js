const KEY = 'goods';

//1.根据key获取localstorage中的数据
export function getItem(){
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}
//2.向localstorage中存储数据
export function setItem(obj){
  //获取老数据
   var arr = JSON.parse(localStorage.getItem(KEY) || '[]');
   //追加新数据
   arr.push(obj);
   //统一将新老数据存储起来
   localStorage.setItem(KEY,JSON.stringify(arr));
}
//3.为buycar.vue组件中的减少购买个数服务
export function subStrictItem(goodsid){
  //1.获取老数据
  var arr = JSON.parse(localStorage.getItem(KEY) || '[]');
  //2.遍历数组
  for(let i = arr.length-1;i>=0;i--){
    console.log(arr);
    let tmpArr = arr[i];
    if(tmpArr.goodsid == goodsid){
      if(tmpArr.count == 1){
        //从数组中移除这个对象
        arr.splice(i,1);
      }
      else{
        //将当前数据中的count--
        arr[i].count = arr[i].count - 1;
      }
      break;//找到一个就得break一下，不然全删掉了，之删掉一个就可以
    }
  }
  //3.统一将数据存入到localStorage中
  localStorage.setItem(KEY,JSON.stringify(arr));
}

export function removeItem(goodsid){
  //1.获取老数据
  var arr = JSON.parse(localStorage.getItem(KEY) || '[]');
  //2.还是遍历取数据
  let newArr = [];
  for(let i = arr.length-1;i>=0;i--){
    if(arr[i].goodsid != goodsid){
      newArr.push(arr[i]);
    }
  }

  //3.统一将数据存入到localStorage中
  localStorage.setItem(KEY,JSON.stringify(newArr));
}

