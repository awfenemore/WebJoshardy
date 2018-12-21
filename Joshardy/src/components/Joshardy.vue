<template>
  <div id="Joshardy">
  </div>
</template>

<script>
  import svg from 'svg.js';
  export default {
    name: 'Joshardy',
    data () {
      return {
        round1questions: ['200', '400', '600', '800', '1000'],
        round2questions: ['400', '800', '1200', '1600', '2000'],
        xPositions: [20, 216, 412, 608, 804, 1000]
      }
    },
    mounted: function () {
      //Constants
      let CATQUESTBLUE = "#2434BD";
      let MONEYTEXTCOLOUR = "#E8B71A";
      let RECTWIDTH = 176;
      let RECTHEIGHT = 122;
      let TEXTSIZE = 50;
      let FONT = {family: 'Impact', size: TEXTSIZE, anchor: 'middle', leading: '1.5em'};

      let draw = SVG('Joshardy').size(1196, 872);

      //Draw Category Labels
      let category = "cat";
      let count = 0;
      this.xPositions.forEach(function (xpos) {
        let rect = draw.rect(RECTWIDTH, RECTHEIGHT).move(xpos, 20).id(category.concat(count.toString(10))).addClass("categoryLabel");
        count += 1;
      });


      this.xPositions.forEach(function (xpos) {
        let rect200 = draw.rect(RECTWIDTH, RECTHEIGHT).move(xpos, 162).id('200-0').fill(CATQUESTBLUE).addClass("questionLabel");
        let text200 = draw.text('$200').move(xpos + (RECTWIDTH / 2), 162 - TEXTSIZE + (RECTHEIGHT / 2)).fill(MONEYTEXTCOLOUR).font(FONT);
        let rect400 = draw.rect(RECTWIDTH, RECTHEIGHT).move(xpos, 304).id('400-0').fill(CATQUESTBLUE).addClass("questionLabel");
        let text400 = draw.text('$400').move(xpos + (RECTWIDTH / 2), 304 - TEXTSIZE + (RECTHEIGHT / 2)).fill(MONEYTEXTCOLOUR).font(FONT);
        let rect600 = draw.rect(RECTWIDTH, RECTHEIGHT).move(xpos, 446).id('600-0').fill(CATQUESTBLUE).addClass("questionLabel");
        let text600 = draw.text('$600').move(xpos + (RECTWIDTH / 2), 446 - TEXTSIZE + (RECTHEIGHT / 2)).fill(MONEYTEXTCOLOUR).font(FONT);
        let rect800 = draw.rect(RECTWIDTH, RECTHEIGHT).move(xpos, 588).id('800-0').fill(CATQUESTBLUE).addClass("questionLabel");
        let text800 = draw.text('$800').move(xpos + (RECTWIDTH / 2), 588 - TEXTSIZE + (RECTHEIGHT / 2)).fill(MONEYTEXTCOLOUR).font(FONT);
        let rect1000 = draw.rect(RECTWIDTH, RECTHEIGHT).move(xpos, 730).id('1000-0').fill(CATQUESTBLUE).addClass("questionLabel");
        let text1000 = draw.text('$1000').move(xpos + (RECTWIDTH / 2), 730 - TEXTSIZE + (RECTHEIGHT / 2)).fill(MONEYTEXTCOLOUR).font(FONT);
      });




    }
  }
</script>

<style src="./Joshardy.css"></style>
