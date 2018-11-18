<template>
    <li class="nav-cart"
        @mouseover="showcart"
        @mouseout="hidecart">
        <a href="javascript:;" class="cart">购物车</a>
        <!--根据class改变颜色-->
        <span
            class="cart-empty-num"
            :class="{'cart-num':$store.state.cartList.length}">
			<i>{{countSum}}</i>
		</span>
        <div class="nav-cart-wrapper"  v-show="showCart">
        <div class="nav-cart-list">
            <div class="empty"  v-show="!$store.state.cartList.length">
                <h3>购物车为空</h3>
                <p>您还没有选购任何商品，现在前往商城选购吧!</p>
            </div>
            <div class="full">
                <div class="nav-cart-items">
                    <ul>
                        <li class="clear" v-for="val,index in data">
                            <div class="cart-item js-cart-item cart-item-sell">
                                <div class="cart-item-inner">
                                    <div class="item-thumb">
                                        <img :src="`${val.ali_image}?x-oss-process=image/resize,w_206/quality,Q_80/format,webp`">
                                    </div>
                                    <div class="item-desc">
                                        <div class="cart-cell">
                                            <h4>
                                                <a href="#/item/100027401">{{val.title}}</a>
                                            </h4>
                                            <p class="attrs">
                                                <span>{{val.spec_json.show_name}}</span>
                                            </p>
                                            <h6>
                                                <span class="price-icon">¥</span><span class="price-num">{{val.price}}</span><span class="item-num">x {{val.count}}</span>
                                            </h6>
                                        </div>
                                    </div>
                                    <div
                                        class="del-btn"
                                        @click="delFn(index)">删除</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="nav-cart-total">
                    <p>共 <strong class="ng-binding">{{countSum}}</strong> 件商品</p>
                    <h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{totalPrice}}</span></h5>
                    <h6>
                        <router-link
                            :to="{name:'gocart'}"
                            class="nav-cart-btn">去购物车</router-link>
                    </h6>
                </div>
            </div>
          </div>
  </div>
        <transition
            name="ballfly"
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            :css="true">
            <div class="ball-wrapper" v-show="ball.show">
                <img class="ball-inner" :src="ball.img"/>
            </div>
        </transition>
    </li>
</template>

<script>
    export default {
        name: "shopCart",
        computed:{
            data(){
                return this.$store.state.cartList;
            },
            countSum(){
                return this.$store.getters.countNum;
            },
            totalPrice(){
                return this.$store.getters.totalPrice;
            },
            showCart(){
                return this.$store.state.showCart;
            },
            ball(){
                return this.$store.state.ball;
            }
        },
        methods:{
            delFn(i){
                // console.log('删除第'+i+'项');
                this.$store.commit('delfn',i)
            },
            showcart(){
                // console.log('移入事件,显示购物车');
                this.$store.commit('showcart');
            },
            hidecart(){
                // console.log('移出事件,隐藏购物车');
                this.$store.commit('hidecart');
            },
            beforeEnter(el){
                let cart=document.querySelector('.cart').getBoundingClientRect();
                let btn=this.ball.el.getBoundingClientRect();
                let sportBall=document.querySelector('.ball-inner');
                // sportBall.src=this.ball.img;
                let x=(cart.left+cart.width/2)-(btn.left+btn.width/2);
                let y=btn.top+btn.height/2-cart.top+cart.height/2;
                // let x=btn.left+btn.width/2;
                // let y=btn.top+btn.height/2;
                el.style.transform='translate3d(-'+x+'px,'+y+'px,0)';
                // sportBall.style.transform='translate3d(0,'+y+'px,0)';
            },
            enter(el){
                el.a=el.offsetHeight;
                el.style.transform='translate3d(0,0,0)';
                let sportBall=document.querySelector('.ball-inner');
                sportBall.style.transform='translate3d(0,0,0)';
            },
            afterEnter(){
                this.ball.show=false;
            }
        }
    }
</script>

<style scoped>
    .ball-wrapper{
        width: 20px;
        height: 20px;
        border: 1px solid #000;
        border-radius: 10px;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 5px;
        z-index: 9999;
    }
    .ball-inner {
        width: 100%;
        height: 100%;
    }
    .ballfly-enter-active{
        transition: .5s cubic-bezier(.34,.6,.18,1.31);
    }
    .ballfly-enter-active .ball-inner{
        /*transition: .8s cubic-bezier(0,0,1,1);*/
    }
</style>
