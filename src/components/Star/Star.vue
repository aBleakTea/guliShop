<template>
  <div :class="'star-'+size">
    <span :class="'star-item'+sc[index]" v-for="(sc,index) in starClass" :key="index"></span>
  </div>
</template>

<script>
export default {
  name: "Star",
  props: {
    score: Number,
    size: Number,
  },
  computed:{
    starClass(){
        let score=this.score
        const res=[]
        let scoreInteger=Math.floor(score)
        for(let i=0;i<scoreInteger;i++){
            res[i]='on'
        }
        if(Math.ceil(res)===Math.round(scoreInteger)){
            res.push('half')
        }
        while(res.length<5){
            res.push('off')
        }

        return res
    }
  }
};
</script>

<style lang='stylus'>
@import '../../common/stylus/mixins.styl';
.star { // 2x图 3x图
  float: left;
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/star48_on');
      }

      &.half {
        bg-image('./images/star48_half');
      }

      &.off {
        bg-image('./images/star48_off');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/star36_on');
      }

      &.half {
        bg-image('./images/star36_half');
      }

      &.off {
        bg-image('./images/star36_off');
      }
    }
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/star24_on');
      }

      &.half {
        bg-image('./images/star24_half');
      }

      &.off {
        bg-image('./images/star24_off');
      }
    }
  }
}
</style>
