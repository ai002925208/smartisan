import Vue from 'vue'
import Router from 'vue-router'
import goodList from '@/views/goodList.vue';
import item from '@/views/item.vue';
import gocart from '@/views/goCart.vue';
import checkout from '@/views/checkout.vue';
import payment from '@/views/payment.vue';

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            name: 'goodList',
            component: goodList
        },
        {
            path: '/item',
            name: 'item',
            component: item
        },
        {
            path: '/gocart',
            name: 'gocart',
            component: gocart
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: checkout
        },
        {
            path: '/payment',
            name: 'payment',
            component: payment
        }
    ]
})
