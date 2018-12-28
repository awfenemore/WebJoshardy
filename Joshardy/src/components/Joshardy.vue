<template>
  <div id="Joshardy">
    <div id="left-team-container">
      <h2>{{this.team1name}}</h2>
      <h3>${{this.team1score}}</h3> <br/><br/>
      <div id="left-image-container">
        <img src="../assets/images/djob.jpg">
        <img src="../assets/images/topher.jpg">
        <img src="../assets/images/eenus.jpg">
        <img src="../assets/images/ronnie.jpg">
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
        <img src="../assets/images/skeebs.jpg">
        <img src="../assets/images/dogs.jpg">
        <img src="../assets/images/olivia.jpg">
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
  import questions from '../questions.js';
  export default {
    name: 'Joshardy',

    data () {
      return {
        //Constants
        CATQUESTBLUE : "#2434BD",
        MONEYTEXTCOLOUR : "#E8B71A",
        RECTWIDTH : 15,
        RECTHEIGHT : 15,
        MARGIN : 1.43,
        TEXTSIZE : 50,
        FONT : {family: 'Impact', size: 50, anchor: 'middle', leading: '1.5em'},
        CATEGORYFONT : {family: 'Gadugi', size: 25, anchor: 'middle', leading: '1.5em'},

        round1cats: [],
        round2cats: [],
        team1name: "Team 1 Name",
        team1score: 0,
        team1colour: null,
        team2name: "Team 2 Name",
        team2score: 0,
        team2colour: null,
        draw: null,

        questions: [],
        round: 2
      }
    },
    mounted: function () {

      this.readQuestionData();
      this.drawBoard();

    },



    methods: {
      updateTeam1Colour: function () {
        document.getElementById("left-team-container").style.backgroundColor = this.team1colour;
      },
      updateTeam2Colour: function () {
        document.getElementById("right-team-container").style.backgroundColor = this.team2colour;
      },



      drawBoard: function () {
        this.draw = SVG('Joshardy').size(1196, 872);

        //WARNING SPICY CODE AHEAD
        for (let i = 0; i <= 5; i += 1) {
          //Category background
          let rect = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('cat'.concat(i.toString(10))).addClass("questions".concat(i.toString()).concat(" category")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'), this.MARGIN.toString().concat('%'));
          //Category labels
          let categoryText = this.draw.text(this.round1cats[i]).fill('#fff').font(this.CATEGORYFONT).addClass("category-label".concat(i.toString())).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'), ((this.RECTHEIGHT / 2) - this.MARGIN).toString().concat('%')).click(this.showQuestion);
          //Questions
          let rect200 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('0-'.concat(i.toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question200")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN) + (this.RECTHEIGHT))).toString().concat('%')).click(this.showQuestion);
          let text200 = this.draw.text('$200').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext200")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN) + (this.RECTHEIGHT)) ).toString().concat('%')).click(this.showQuestion);
          let rect400 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('1-'.concat(i.toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question400")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN*2) + (this.RECTHEIGHT*2))).toString().concat('%')).click(this.showQuestion);
          let text400 = this.draw.text('$400').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext400")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN*2) + (this.RECTHEIGHT*2))).toString().concat('%')).click(this.showQuestion);
          let rect600 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('2-'.concat(i.toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question600")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN*3) + (this.RECTHEIGHT*3))).toString().concat('%')).click(this.showQuestion);
          let text600 = this.draw.text('$600').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext600")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN*3) + (this.RECTHEIGHT*3))).toString().concat('%')).click(this.showQuestion);
          let rect800 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('3-'.concat(i.toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question800")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN*4) + (this.RECTHEIGHT*4))).toString().concat('%')).click(this.showQuestion);
          let text800 = this.draw.text('$800').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext800")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN*4) + (this.RECTHEIGHT*4))).toString().concat('%')).click(this.showQuestion);
          let rect1000 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('4-'.concat(i.toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question1000")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN*5) + (this.RECTHEIGHT*5))).toString().concat('%')).click(this.showQuestion);
          let text1000 = this.draw.text('$1000').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext1000")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN*5) + (this.RECTHEIGHT*5))).toString().concat('%')).click(this.showQuestion);

        }
      },

      readQuestionData: function () {
        //Read questions here
        this.round1cats = questions.categories.slice(0,6);
        this.round2cats = questions.categories.slice(6,12);

        this.questions.push(questions.Locations);
        this.questions.push(questions.JoshSongs);
        this.questions.push(questions.WorkHistory);
        this.questions.push(questions.BadDecisions);
        this.questions.push(questions.Names);
        this.questions.push(questions.SportsoftheJosh);

        this.questions.push(questions.Theyear1987);
        this.questions.push(questions.Maythe24th);
        this.questions.push(questions.Anagrams);
        this.questions.push(questions.FamousJoshs);
        this.questions.push(questions.FoodsoftheJosh);
        this.questions.push(questions.JoshPhotos);
      },


      showQuestion: function (e) {
        let values = e.currentTarget.id.split('-');
        alert(this.questions[(values[1])][values[0]].q);
        alert(this.questions[(values[1])][values[0]].a);
      },

      drawRound2: function () {
        for (let i = 0; i <= 5; i += 1) {
          //Category background
          let rect = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('cat'.concat(i.toString(10))).addClass("questions".concat(i.toString()).concat(" category")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'), this.MARGIN.toString().concat('%'));
          //Category labels
          let categoryText = this.draw.text(this.round2cats[i]).fill('#fff').font(this.CATEGORYFONT).addClass("category-label".concat(i.toString())).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'), ((this.RECTHEIGHT / 2) - this.MARGIN).toString().concat('%')).click(this.showQuestion);
          //Questions
          let rect200 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('0-'.concat((i+6).toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question400")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN) + (this.RECTHEIGHT))).toString().concat('%')).click(this.showQuestion);
          let text200 = this.draw.text('$400').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext400")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN) + (this.RECTHEIGHT)) ).toString().concat('%')).click(this.showQuestion);
          let rect400 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('1-'.concat((i+6).toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question800")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN*2) + (this.RECTHEIGHT*2))).toString().concat('%')).click(this.showQuestion);
          let text400 = this.draw.text('$800').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext800")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN*2) + (this.RECTHEIGHT*2))).toString().concat('%')).click(this.showQuestion);
          let rect600 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('2-'.concat((i+6).toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question1200")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN*3) + (this.RECTHEIGHT*3))).toString().concat('%')).click(this.showQuestion);
          let text600 = this.draw.text('$1200').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext1200")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN*3) + (this.RECTHEIGHT*3))).toString().concat('%')).click(this.showQuestion);
          let rect800 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('3-'.concat((i+6).toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question1600")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN*4) + (this.RECTHEIGHT*4))).toString().concat('%')).click(this.showQuestion);
          let text800 = this.draw.text('$1600').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext1600")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN*4) + (this.RECTHEIGHT*4))).toString().concat('%')).click(this.showQuestion);
          let rect1000 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('4-'.concat((i+6).toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question2000")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN*5) + (this.RECTHEIGHT*5))).toString().concat('%')).click(this.showQuestion);
          let text1000 = this.draw.text('$2000').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext2000")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN*5) + (this.RECTHEIGHT*5))).toString().concat('%')).click(this.showQuestion);

        }
      }


    }
  }
</script>

<style src="./Joshardy.css"></style>
