<template>
  <div class="item">
    <div>
      <div class="item-img"><img :alt="item.name_title" :src="`${item.sku_info[num].ali_image}?x-oss-process=image/resize,w_206/quality,Q_80/format,webp`" style="opacity: 1;">
      </div>
      <h6>{{item.name}}</h6>
      <h3 >{{item.name_title}}</h3>
      <div class="params-colors">
        <ul class="colors-list">
          <li v-for="cols,index in item.sku_info">
            <a href="javascript:;"
               :class="{active:index===num}"
               @click="tabNum(index)">
              <img :src="`http://img01.smartisanos.cn/${cols.spec_json.image}20X20.jpg`">
            </a>
          </li>
        </ul>
      </div>
      <div class="item-btns clearfix">
        <span class="item-gray-btn">
          <router-link
              :to="{name:'item',params:{itemId:item.sku_info[num].sku_id},query:{itemId:item.sku_info[num].sku_id}}">查看详情</router-link>
        </span>
        <span
            class="item-blue-btn"
            @click="sendInfo(item.sku_info[num])">加入购物车 </span>
      </div>
      <div class="item-price clearfix">
        <i>¥</i><span>{{item.price}}</span>
      </div>
      <div class="discount-icon">false</div>
      <div class="item-cover">
        <a href="javascript:;" target="_blank"></a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data(){
            return{
                num:0
            }
        },
        props:{
            item:Object
        },
        methods:{
            tabNum(i){
              this.num=i;
            },
            sendInfo(opt){
                // console.log(opt);
                let optData={info:opt,count:1};
                this.$store.commit('addItems',optData)
            }
        }

    }
</script>

<style scoped>

</style>
