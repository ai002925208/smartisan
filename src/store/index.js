import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
var store=new Vuex.Store({
    state:{
        cartList:[],
        showCart:false,
        showPrompt:false,
        timer:null,
        ball:{
            show:false,
            el:null,
            img:''
        },
        receiveInfo:[{
            "name": "王某某",
            "phone": "13811111111",
            "areaCode": "010",
            "landLine": "64627856",
            "provinceId": 110000,
            "province": "北京市",
            "cityId": 110100,
            "city": "市辖区",
            "countyId": 110106,
            "county": "海淀区",
            "add": "上地十街辉煌国际西6号楼319室",
            "default": true
        },{
            "name": "李某某",
            "phone": "13811111111",
            "areaCode": "010",
            "landLine": "64627856",
            "provinceId": 110000,
            "province": "北京市",
            "cityId": 110100,
            "city": "市辖区",
            "countyId": 110106,
            "county": "海淀区",
            "add": "上地十街辉煌国际东6号楼350室",
            "default": false
        }],
        orderData:[]
    },
    //计算数据
    getters:{
        //购物车件数总计
        countNum(state){
            return state.cartList.reduce((sum,now)=>{
                return sum+now.count;
            },0)
        },
        //计算总价
        totalPrice(state){
            return state.cartList.reduce((sum,now)=>{
                return sum+now.count*now.price;
            },0)
        },
        //选中的数据
        checkedData(state){
            return state.cartList.filter(item=>item.checked);
        },
        //计算选中的总价
        totalCheckedPri(state){
            return store.getters.checkedData.reduce((sum,now)=>sum+now.count*now.price,0);
        }
    },
    //事件
    mutations:{
        //点击加入购物车
        addItems(state,opt){
            var temp=state.cartList.find(item=>{
                return item.sku_id===opt.info.sku_id;
            });
            if(!state.ball.show){
                if(temp){
                    temp.count+=opt.count;
                    if(temp.count>opt.info.limit_num){
                        store.commit('showPrompt');
                        temp.count=opt.info.limit_num;
                    }else{
                        store.commit('showcart');
                        state.ball.show=true;
                        state.ball.img=opt.info.ali_image;
                        state.ball.el=event.path[0];
                    }
                }else{
                    // opt=Object.assign({},opt,{count:1});
                    Vue.set(opt.info,'count',opt.count);
                    Vue.set(opt.info,'checked',true);
                    state.cartList.push(opt.info);
                    store.commit('showcart');
                    state.ball.show=true;
                    state.ball.img=opt.info.ali_image;
                    state.ball.el=event.path[0];
                    // console.log(event.path[0])
                }
            };
            // console.log(temp);
        },
        //点击删除一项
        delfn(state,i){
            state.cartList.splice(i,1);
        },
        //移入事件,显示购物车
        showcart(state){
            clearTimeout(state.timer);
            state.showCart=true;
        },
        //移出事件,隐藏购物车
        hidecart(state){
            state.timer=setTimeout(()=>state.showCart=false,500);
        },
        //显示弹窗
        showPrompt(state){
            state.showPrompt=true;
        },
        //关闭弹窗
        closePrompt(state){
            state.showPrompt=false;
        },
        //点击增加商品
        addFn(state,itm){
            itm.count++;
            if(itm.count>=itm.limit_num){
                store.commit('showPrompt');
                itm.count=itm.limit_num
            }
        },
        //点击减少商品
        plusFn(state,itm){
            itm.count--;
            if(itm.count<=1){
                itm.count=1
            }
        },
        //删除选中的
        delChecked(state){
            state.cartList=state.cartList.filter(item=>!item.checked);
        },
        //保存地址
        saveAddress(state,data){
            if(data.default){
                state.receiveInfo.forEach(item=>item.default=false);
            }
            state.receiveInfo.push(data)
        },
        submitOrder(state,orderData){
            // console.log(orderData);
            state.orderData.unshift(orderData);
            state.cartList=state.cartList.filter(item=>!item.checked);
        }
    }
});
export default store;
