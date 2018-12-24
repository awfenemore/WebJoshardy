<template>
  <div id="Joshardy">
    <div id="left-team-container">
      <h2>{{this.team1name}}</h2>
      <h3>${{this.team1score}}</h3> <br/><br/>
      <div id="left-image-container">
        <img src="../assets/images/djob.jpg">
        <img src="../assets/images/topher.jpg">
        <img src="../assets/images/eenus.jpg">
        <img src="../assets/images/ronnie.jpg"> <br/>
      </div>
      <div id="left-changes-container">
        <h4>Change Team Name</h4>
        <input v-model="team1name" placeholder="Type your Team Name">
        <h4>Change Team Colour</h4>
        <input type="color" id="team1colourchanger" v-on:input="updateTeam1Colour" v-model="team1colour"/>
      </div>
    </div>
    <div id="right-team-container">
      <h2>{{this.team2name}}</h2>
      <h3>${{this.team2score}}</h3> <br/><br/>
      <div id="right-images-container">
        <img src="../assets/images/firejosh.jpg">
        <img src="../assets/images/olivia.jpg">
        <img src="../assets/images/skeebs.jpg">
      </div>
      <div id="right-changes-container">
        <h4>Change Team Name</h4>
        <input v-model="team2name" placeholder="Type your Team Name">
        <h4>Change Team Colour</h4>
        <input type="color" id="team2colourchanger" v-on:input="updateTeam2Colour" v-model="team2colour"/>
      </div>
    </div>
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
        team1name: "Team 1 Name",
        team1score: 0,
        team1colour: null,
        team2name: "Team 2 Name",
        team2score: 0,
        team2colour: null
      }
    },
    mounted: function () {
      //Constants
      let CATQUESTBLUE = "#2434BD";
      let MONEYTEXTCOLOUR = "#E8B71A";
      let RECTWIDTH = 15;
      let RECTHEIGHT = 15;
      let MARGIN = 1.43;
      let TEXTSIZE = 50;
      let FONT = {family: 'Impact', size: TEXTSIZE, anchor: 'middle', leading: '1.5em'};

      let draw = SVG('Joshardy').size(1196, 872);


      //WARNING SPICY CODE AHEAD
      let category = "cat";
      for (let i = 0; i <= 5; i += 1) {
        //Category background
        let rect = draw.rect(RECTWIDTH.toString().concat('%'), RECTHEIGHT.toString().concat('%')).id(category.concat(i.toString(10))).addClass("questions".concat(i.toString()).concat(" category")).move((MARGIN + ((MARGIN * i) + (RECTWIDTH * i))).toString().concat('%'),MARGIN.toString().concat('%'));
        //Questions
        let rect200 = draw.rect(RECTWIDTH.toString().concat('%'), RECTHEIGHT.toString().concat('%')).id('200-'.concat(i.toString())).fill(CATQUESTBLUE).addClass("question".concat(" question200")).move((MARGIN + ((MARGIN * i) + (RECTWIDTH * i))).toString().concat('%'),(MARGIN + ((MARGIN) + (RECTHEIGHT))).toString().concat('%'));
        let text200 = draw.text('$200').fill(MONEYTEXTCOLOUR).font(FONT).addClass("questions".concat(i.toString()).concat(" questiontext200")).move((MARGIN + ((MARGIN * i) + (RECTWIDTH * i)) + RECTWIDTH / 2).toString().concat('%'),(MARGIN*2 + ((MARGIN) + (RECTHEIGHT)) ).toString().concat('%'));
        let rect400 = draw.rect(RECTWIDTH.toString().concat('%'), RECTHEIGHT.toString().concat('%')).id('400-'.concat(i.toString())).fill(CATQUESTBLUE).addClass("question".concat(" question400")).move((MARGIN + ((MARGIN * i) + (RECTWIDTH * i))).toString().concat('%'),(MARGIN + ((MARGIN*2) + (RECTHEIGHT*2))).toString().concat('%'));
        let text400 = draw.text('$400').fill(MONEYTEXTCOLOUR).font(FONT).addClass("questions".concat(i.toString()).concat(" questiontext400")).move((MARGIN + ((MARGIN * i) + (RECTWIDTH * i)) + RECTWIDTH / 2).toString().concat('%'),(MARGIN*2 + ((MARGIN*2) + (RECTHEIGHT*2))).toString().concat('%'));
        let rect600 = draw.rect(RECTWIDTH.toString().concat('%'), RECTHEIGHT.toString().concat('%')).id('600-'.concat(i.toString())).fill(CATQUESTBLUE).addClass("question".concat(" question600")).move((MARGIN + ((MARGIN * i) + (RECTWIDTH * i))).toString().concat('%'),(MARGIN + ((MARGIN*3) + (RECTHEIGHT*3))).toString().concat('%'));
        let text600 = draw.text('$600').fill(MONEYTEXTCOLOUR).font(FONT).addClass("questions".concat(i.toString()).concat(" questiontext600")).move((MARGIN + ((MARGIN * i) + (RECTWIDTH * i)) + RECTWIDTH / 2).toString().concat('%'),(MARGIN*2 + ((MARGIN*3) + (RECTHEIGHT*3))).toString().concat('%'));
        let rect800 = draw.rect(RECTWIDTH.toString().concat('%'), RECTHEIGHT.toString().concat('%')).id('800-'.concat(i.toString())).fill(CATQUESTBLUE).addClass("question".concat(" question800")).move((MARGIN + ((MARGIN * i) + (RECTWIDTH * i))).toString().concat('%'),(MARGIN + ((MARGIN*4) + (RECTHEIGHT*4))).toString().concat('%'));
        let text800 = draw.text('$800').fill(MONEYTEXTCOLOUR).font(FONT).addClass("questions".concat(i.toString()).concat(" questiontext800")).move((MARGIN + ((MARGIN * i) + (RECTWIDTH * i)) + RECTWIDTH / 2).toString().concat('%'),(MARGIN*2 + ((MARGIN*4) + (RECTHEIGHT*4))).toString().concat('%'));
        let rect1000 = draw.rect(RECTWIDTH.toString().concat('%'), RECTHEIGHT.toString().concat('%')).id('1000-'.concat(i.toString())).fill(CATQUESTBLUE).addClass("question".concat(" question1000")).move((MARGIN + ((MARGIN * i) + (RECTWIDTH * i))).toString().concat('%'),(MARGIN + ((MARGIN*5) + (RECTHEIGHT*5))).toString().concat('%'));
        let text1000 = draw.text('$1000').fill(MONEYTEXTCOLOUR).font(FONT).addClass("questions".concat(i.toString()).concat(" questiontext1000")).move((MARGIN + ((MARGIN * i) + (RECTWIDTH * i)) + RECTWIDTH / 2).toString().concat('%'),(MARGIN*2 + ((MARGIN*5) + (RECTHEIGHT*5))).toString().concat('%'));
      }
    },
    methods: {
      updateTeam1Colour: function () {
        document.getElementById("left-team-container").style.backgroundColor = this.team1colour;
      },
      updateTeam2Colour: function () {
        document.getElementById("right-team-container").style.backgroundColor = this.team2colour;
      }
    }
  }
</script>

<style src="./Joshardy.css"></style>
