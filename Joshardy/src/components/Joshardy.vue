<template>
  <div id="Joshardy">
    <div class="left-team-container" :style="{backgroundColor: team1colour}">
      <h2>{{this.team1name}}</h2>
      <h3>${{this.team1score}}</h3> <br/><br/>
      <div id="left-image-container">
        <img src="/static/images/djob.jpg">
        <img src="/static/images/topher.jpg">
        <img src="/static/images/eenus.jpg">
        <img src="/static/images/ronnie.jpg">
      </div>
      <div id="left-changes-container">
        <h4>Change Team Name</h4>
        <input v-model="team1name" placeholder="Type your Team Name">
        <h4>Change Team Colour</h4>
        <input type="color" id="team1colourchanger" v-model="team1colour"/>
      </div>
    </div>

    <div v-if="!questionSelected" class="question-container">
      <div class="cat-container" v-for="(cat, index) in this.round1cats">
        <button disabled :class="'interior-button cat-label category-label-'.concat(index)">{{cat}}</button>
        <button class="interior-button question" v-for="question in questions[parseInt(index)]" @click="showQuestion(question)">${{question.v}}</button>
      </div>
    </div>

    <div v-else class="show-question-container">
      <h2 class="question-text">{{currentQuestion.q}}</h2>
      <h2 class="answer-text" v-show="showAnswerBool" >{{currentQuestion.a}}</h2>
      <div class="files-container">
        <img class="question-image" v-if="currentQuestion.f.endsWith('.jpg') || currentQuestion.f.endsWith('.JPG')" :src="'/static/images/' + currentQuestion.f">
      </div>

      <div class="question-buttons-container">
        <button class="q-button team1-correct q-correct" @click="team1correct">{{this.team1name}} Correct</button>
        <button class="q-button team1-incorrect q-incorrect" @click="team1incorrect">{{this.team1name}} Incorrect</button>
        <button class="q-button show-answer" @click="showAnswer" >Show Answer</button>
        <button class="q-button team2-incorrect q-incorrect" @click="team2incorrect">{{this.team2name}} Incorrect</button>
        <button class="q-button team2-correct q-correct" @click="team2correct">{{this.team2name}} Correct</button>
      </div>
    </div>

    <div class="right-team-container" :style="{backgroundColor: team2colour}">
      <h2>{{this.team2name}}</h2>
      <h3>${{this.team2score}}</h3> <br/><br/>
      <div id="right-images-container">
        <img src="/static/images/firejosh.jpg">
        <img src="/static/images/skeebs.jpg">
        <img src="/static/images/dogs.jpg">
        <img src="/static/images/olivia.jpg">
      </div>
      <div id="right-changes-container">
        <h4>Change Team Name</h4>
        <input v-model="team2name" placeholder="Type your Team Name">
        <h4>Change Team Colour</h4>
        <input type="color" id="team2colourchanger" v-model="team2colour"/>
      </div>
    </div>

  </div>
</template>

<script>
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
        round1qs: [],
        round2qs: [],
        team1name: "Team 1 Name",
        team1score: 0,
        team1colour: '#137a2d',
        team2name: "Team 2 Name",
        team2score: 0,
        team2colour: '#1c98ff',
        draw: null,
        questionShow: null,

        questions: [],
        round: 1,
        currentTarget: null,

        questionSelected: false,
        showAnswerBool: false,
        currentQuestion: null

      }
    },
    mounted: function () {
      this.readQuestionData();
      //this.drawBoard();
    },

    methods: {
      showAnswer: function () {
        this.showAnswerBool = true;
      },
      team1correct: function () {
        this.team1score += this.currentQuestion.v;
        this.questionSelected = false;
        this.currentQuestion = null;
        this.showAnswerBool = false;
      },
      team1incorrect: function () {
        this.team1score -= this.currentQuestion.v;
        this.questionSelected = false;
        this.currentQuestion = null;
        this.showAnswerBool = false;

      },
      team2correct: function () {
        this.team2score += this.currentQuestion.v;
        this.questionSelected = false;
        this.currentQuestion = null;
        this.showAnswerBool = false;
      },
      team2incorrect: function () {
        this.team2score -= this.currentQuestion.v;
        this.questionSelected = false;
        this.currentQuestion = null;
        this.showAnswerBool = false;
      },

      readQuestionData: function () {
        //Read questions here
        this.round1cats = questions.categories.slice(0,6);
        this.round2cats = questions.categories.slice(6,12);

        this.round1qs.push(questions.Locations);
        this.round1qs.push(questions.JoshSongs);
        this.round1qs.push(questions.WorkHistory);
        this.round1qs.push(questions.BadDecisions);
        this.round1qs.push(questions.Names);
        this.round1qs.push(questions.SportsoftheJosh);

        this.round2qs.push(questions.Theyear1987);
        this.round2qs.push(questions.Maythe24th);
        this.round2qs.push(questions.Anagrams);
        this.round2qs.push(questions.FamousJoshs);
        this.round2qs.push(questions.FoodsoftheJosh);
        this.round2qs.push(questions.JoshPhotos);

        this.questions = this.round1qs;

      },

      showQuestion: function (val) {
        this.currentQuestion = val;
        this.questionSelected = true;
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
      }
    }
  }
</script>

<style src="./Joshardy.css"></style>
