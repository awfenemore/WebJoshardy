<template>
  <div id="Joshardy">
    <div class="left-team-container" :style="{backgroundColor: team1colour}">
      <div class="left-headings-container">
        <h2>{{this.team1name}}</h2>
        <h3>${{this.team1score}}</h3>
      </div>
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
      <div class="cat-container" v-for="(cat, index) in this.cats">
        <button disabled :class="'interior-button cat-label category-label-'.concat(index)">{{cat}}</button>
        <button class="interior-button question" v-for="question in questions[parseInt(index)]" @click="showQuestion(question)" :disabled="question.c">${{question.v}}</button>
      </div>
    </div>

    <div v-else class="show-question-container">
      <h2 class="question-text">{{currentQuestion.q}}</h2>
      <h2 class="answer-text" v-show="showAnswerBool" >{{currentQuestion.a}}</h2>
      <div class="files-container">
        <img class="question-image" v-if="currentQuestion.f.endsWith('.jpg') || currentQuestion.f.endsWith('.JPG')" :src="'/static/images/' + currentQuestion.f">
        <audio v-else-if="currentQuestion.f.endsWith('.mp3')" controls>
          <source type="audio/mpeg" :src="'/static/audio/' + currentQuestion.f"/>
        </audio>
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
      <div class="right=headings-container">
        <h2>{{this.team2name}}</h2>
        <h3>${{this.team2score}}</h3>
      </div>
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
        questionShow: null,

        questions: [],
        round: 1,
        cats: [],

        questionSelected: false,
        showAnswerBool: false,
        currentQuestion: null,
        questionsAnswered: 0

      }
    },
    mounted: function () {
      this.readQuestionData();
    },

    methods: {
      showAnswer: function () {
        this.showAnswerBool = true;
      },
      checkRoundTwo: function () {
        this.questionsAnswered += 1;
        if (this.questionsAnswered >= 30) {
          if (confirm('Go to Next Round?')) {
            this.questions = this.round2qs;
            this.cats = this.round2cats;
            this.questionsAnswered = 0;
          }
        }
      },
      team1correct: function () {
        this.team1score += this.currentQuestion.v;
        this.questionSelected = false;
        this.currentQuestion = null;
        this.showAnswerBool = false;
        this.checkRoundTwo();
      },
      team1incorrect: function () {
        this.team1score -= this.currentQuestion.v;
        this.questionSelected = false;
        this.currentQuestion = null;
        this.showAnswerBool = false;
        this.checkRoundTwo();

      },
      team2correct: function () {
        this.team2score += this.currentQuestion.v;
        this.questionSelected = false;
        this.currentQuestion = null;
        this.showAnswerBool = false;
        this.checkRoundTwo();
      },
      team2incorrect: function () {
        this.team2score -= this.currentQuestion.v;
        this.questionSelected = false;
        this.currentQuestion = null;
        this.showAnswerBool = false;
        this.checkRoundTwo();
      },

      readQuestionData: function () {
        //Read questions here
        this.round1cats = questions.categories.slice(0,6);
        this.round2cats = questions.categories.slice(6,12);
        this.cats = this.round1cats;

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
        this.currentQuestion.c = true;
      }
    }
  }
</script>

<style src="./Joshardy.css"></style>
