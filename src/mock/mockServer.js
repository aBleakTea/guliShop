import Mock from 'mockjs'
import ApiData from './data.json'

//返回goods的借口
Mock.mock('/goods',{code:0,data:ApiData.goods})
//返回info的接口
Mock.mock('/info', { code: 0, data: ApiData.info })
//返回rating的接口
Mock.mock('/ratings',{code:0,data:ApiData.ratings})
