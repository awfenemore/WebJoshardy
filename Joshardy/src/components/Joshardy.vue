<template>
  <div id="Joshardy">
    <audio id="fgh" src="src/assets/audio/sport.mp3">
      <!--<source id="fgh"  type="audio/mpeg">-->
    </audio>

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
        QUESTIONFONT : {family: 'Gadugi', size: 60, anchor: 'middle', leading: '1.5em'},
        ROUND2FONT : {family: 'Gadugi', size: 10, anchor: 'middle', leading: '1.5em'},

        round1cats: [],
        round2cats: [],
        team1name: "Team 1 Name",
        team1score: 0,
        team1colour: null,
        team2name: "Team 2 Name",
        team2score: 0,
        team2colour: null,
        draw: null,
        questionShow: null,

        questions: [],
        round: 1,
        currentQuestion: null,
        currentTarget: null

        //SVG elements

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
      showAnswer: function () {
        if (document.getElementById('questiontext')) {
          document.getElementById('questiontext').remove();
        }
        if (document.getElementById('audio')) {
          document.getElementById('audio').remove();
        }
        let x = this.draw.text(this.currentQuestion.a).fill('#fff').font(this.QUESTIONFONT).move(665, 350).id('answertext');
      },
      removequestion: function () {
        document.getElementById('questioncontainer').remove();
        document.getElementById('team1plus').remove();
        document.getElementById('team1minus').remove();
        document.getElementById('team2plus').remove();
        document.getElementById('team2minus').remove();
        document.getElementById('showanswer').remove();
        if (document.getElementById('answertext')) {
          document.getElementById('answertext').remove();
        }
        if (document.getElementById('questiontext')) {
          document.getElementById('questiontext').remove();
        }
        if (document.getElementById('audio')) {
          document.getElementById('audio').remove();
        }


      },
      team1correct: function () {
        this.team1score += this.currentQuestion.v;
        let cover = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).fill(this.CATQUESTBLUE).addClass("cover").move(this.currentTarget.x.baseVal.value, this.currentTarget.y.baseVal.value);
        this.removequestion();
      },
      team1incorrect: function () {
        this.team1score -= this.currentQuestion.v;
        let cover = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).fill(this.CATQUESTBLUE).addClass("cover").move(this.currentTarget.x.baseVal.value, this.currentTarget.y.baseVal.value);
        this.removequestion();

      },
      team2correct: function () {
        this.team2score += this.currentQuestion.v;
        let cover = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).fill(this.CATQUESTBLUE).addClass("cover").move(this.currentTarget.x.baseVal.value, this.currentTarget.y.baseVal.value);
        this.removequestion();
      },
      team2incorrect: function () {
        this.team2score -= this.currentQuestion.v;
        let cover = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).fill(this.CATQUESTBLUE).addClass("cover").move(this.currentTarget.x.baseVal.value, this.currentTarget.y.baseVal.value);
        this.removequestion();

      },

      drawBoard: function () {
        this.draw = SVG('Joshardy').size(1196, 872);
        let round2text = this.draw.text('Round 2').fill('#fff').font(this.ROUND2FONT).move(1280,0).click(this.drawRound2);
        //WARNING SPICY CODE AHEAD
        for (let i = 0; i <= 5; i += 1) {
          //Category background
          let rect = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('cat'.concat(i.toString(10))).addClass("questions".concat(i.toString()).concat(" category")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'), this.MARGIN.toString().concat('%'));
          //Category labels
          let categoryText = this.draw.text(this.round1cats[i]).fill('#fff').font(this.CATEGORYFONT).addClass("category-label".concat(i.toString())).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'), ((this.RECTHEIGHT / 2) - this.MARGIN).toString().concat('%')).click(this.showQuestion);
          //Questions
          let rect200 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('0-'.concat(i.toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question200")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN) + (this.RECTHEIGHT))).toString().concat('%')).click(this.showQuestion);
          let text200 = this.draw.text('$200').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext200")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN) + (this.RECTHEIGHT)) ).toString().concat('%')).click(this.showQuestion).id('200-text-'.concat(i.toString()));
          let rect400 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('1-'.concat(i.toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question400")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN*2) + (this.RECTHEIGHT*2))).toString().concat('%')).click(this.showQuestion);
          let text400 = this.draw.text('$400').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext400")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN*2) + (this.RECTHEIGHT*2))).toString().concat('%')).click(this.showQuestion).id('400-text-'.concat(i.toString()));
          let rect600 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('2-'.concat(i.toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question600")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN*3) + (this.RECTHEIGHT*3))).toString().concat('%')).click(this.showQuestion);
          let text600 = this.draw.text('$600').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext600")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN*3) + (this.RECTHEIGHT*3))).toString().concat('%')).click(this.showQuestion).id('600-text-'.concat(i.toString()));
          let rect800 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('3-'.concat(i.toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question800")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN*4) + (this.RECTHEIGHT*4))).toString().concat('%')).click(this.showQuestion);
          let text800 = this.draw.text('$800').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext800")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN*4) + (this.RECTHEIGHT*4))).toString().concat('%')).click(this.showQuestion).id('800-text-'.concat(i.toString()));
          let rect1000 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('4-'.concat(i.toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question1000")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN*5) + (this.RECTHEIGHT*5))).toString().concat('%')).click(this.showQuestion);
          let text1000 = this.draw.text('$1000').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext1000")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN*5) + (this.RECTHEIGHT*5))).toString().concat('%')).click(this.showQuestion).id('1000-text-'.concat(i.toString()));

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
        this.currentQuestion = this.questions[(values[1])][values[0]];
        this.currentTarget = e.currentTarget;
        this.question = this.draw.rect(1331, 872).fill(this.CATQUESTBLUE).id('questioncontainer');

        //Buttons for scoring
        let team1plus = this.draw.rect(50,50).fill('#44c113').id("team1plus").move(20,800).click(this.team1correct);
        let team1minus = this.draw.rect(50,50).fill('#ff0c1e').id("team1minus").move(90,800).click(this.team1incorrect);
        let team2plus = this.draw.rect(50,50).fill('#44c113').id("team2plus").move(1260,800).click(this.team2correct);
        let team2minus = this.draw.rect(50,50).fill('#ff0c1e').id("team2minus").move(1190,800).click(this.team2incorrect);

        //Show answer
        let x = this.draw.text("Show answer").fill('#fff').font(this.QUESTIONFONT).move(665, 780).id('showanswer').click(this.showAnswer);

        if (!this.questions[(values[1])][values[0]].f) {
          //if there is no filename, just display the text
          let x = this.draw.text(this.questions[(values[1])][values[0]].q).fill('#fff').font(this.QUESTIONFONT).move(665, 350).id('questiontext');
        } else if (this.questions[(values[1])][values[0]].f.endsWith('.mp3')) {
          let x = this.draw.text('Name this track and artist').fill('#fff').font(this.QUESTIONFONT).move(665, 350).id('audio').click(this.playAudio(this.questions[(values[1])][values[0]].f));
        }
      },

      drawRound2: function () {
        for (let i = 0; i <= 5; i += 1) {
          //Category background
          let rect = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('cat'.concat(i.toString(10))).addClass("questions".concat(i.toString()).concat(" category")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'), this.MARGIN.toString().concat('%'));
          //Category labels
          let categoryText = this.draw.text(this.round2cats[i]).fill('#fff').font(this.CATEGORYFONT).addClass("category-label".concat(i.toString())).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'), ((this.RECTHEIGHT / 2) - this.MARGIN).toString().concat('%')).click(this.showQuestion);
          //Questions
          let rect200 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('0-'.concat((i+6).toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question400")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN) + (this.RECTHEIGHT))).toString().concat('%')).click(this.showQuestion);
          let text200 = this.draw.text('$400').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext400")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN) + (this.RECTHEIGHT)) ).toString().concat('%')).id('400-text-'.concat(i.toString()));
          let rect400 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('1-'.concat((i+6).toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question800")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN*2) + (this.RECTHEIGHT*2))).toString().concat('%')).click(this.showQuestion);
          let text400 = this.draw.text('$800').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext800")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN*2) + (this.RECTHEIGHT*2))).toString().concat('%')).id('800-text-'.concat(i.toString()));
          let rect600 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('2-'.concat((i+6).toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question1200")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN*3) + (this.RECTHEIGHT*3))).toString().concat('%')).click(this.showQuestion);
          let text600 = this.draw.text('$1200').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext1200")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN*3) + (this.RECTHEIGHT*3))).toString().concat('%')).id('1200-text-'.concat(i.toString()));
          let rect800 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('3-'.concat((i+6).toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question1600")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN*4) + (this.RECTHEIGHT*4))).toString().concat('%')).click(this.showQuestion);
          let text800 = this.draw.text('$1600').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext1600")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN*4) + (this.RECTHEIGHT*4))).toString().concat('%')).id('1600-text-'.concat(i.toString()));
          let rect1000 = this.draw.rect(this.RECTWIDTH.toString().concat('%'), this.RECTHEIGHT.toString().concat('%')).id('4-'.concat((i+6).toString())).fill(this.CATQUESTBLUE).addClass("question".concat(" question2000")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i))).toString().concat('%'),(this.MARGIN + ((this.MARGIN*5) + (this.RECTHEIGHT*5))).toString().concat('%')).click(this.showQuestion);
          let text1000 = this.draw.text('$2000').fill(this.MONEYTEXTCOLOUR).font(this.FONT).addClass("questions".concat(i.toString()).concat(" questiontext2000")).move((this.MARGIN + ((this.MARGIN * i) + (this.RECTWIDTH * i)) + this.RECTWIDTH / 2).toString().concat('%'),(this.MARGIN*2 + ((this.MARGIN*5) + (this.RECTHEIGHT*5))).toString().concat('%')).id('2000-text-'.concat(i.toString()));
        }
      },

      playAudio: function (desc) {

        alert(document.getElementById('fgh'));
        let x = document.getElementById('fgh');
        x.play();
        // let audioElement;
        // if(!audioElement) {
        //   audioElement = document.createElement('audio');
        //   audioElement.innerHTML = '<source src="' + '../../src/assets/audio/sport.mp3'+ '" type="audio/mpeg" />'
        // }
        // audioElement.play();

        //
        // //alert(desc);
        // let audio = new Audio('../../src/assets/audio/sport.mp3');
        // alert(audio);
        // audio.play();
        // //alert(desc);
        //   //alert(desc);
      }

    }
  }
</script>

<style src="./Joshardy.css"></style>
