<template>
  <div id="Joshardy">

    <canvas id="canvas" width="1196" height="872">
      <!-- Images -->
      <img id="200q" src="../assets/images/questions/200.png" width="176" height="122"/>
      <img id="400q" src="../assets/images/questions/400.png" width="176" height="122"/>
      <img id="600q" src="../assets/images/questions/600.png" width="176" height="122"/>
      <img id="800q" src="../assets/images/questions/800.png" width="176" height="122"/>
      <img id="1000q" src="../assets/images/questions/1000.png" width="176" height="122"/>
      <img id="1200q" src="../assets/images/questions/1200.png" width="176" height="122"/>
      <img id="1600q" src="../assets/images/questions/1600.png" width="176" height="122"/>
      <img id="2000q" src="../assets/images/questions/2000.png" width="176" height="122"/>
    </canvas>


  </div>
</template>

<script>
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
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    // Draw category blocks
    context.fillStyle = "#2434BD";
    this.xPositions.forEach(function (xpos) {
      context.fillRect(xpos,20,176,122);
    });

    // Draw question buttons
    context.fillStyle = null;
    let ypos = 162;
    this.xPositions.forEach(function (xpos) {
      let img = document.getElementById('200q');
      context.drawImage(img, xpos, ypos);
    });
    ypos += 142;
    this.xPositions.forEach(function (xpos) {
      let img = document.getElementById('400q');
      context.drawImage(img, xpos, ypos);
    });
    ypos += 142;
    this.xPositions.forEach(function (xpos) {
      let img = document.getElementById('600q');
      context.drawImage(img, xpos, ypos);
    });
    ypos += 142;
    this.xPositions.forEach(function (xpos) {
      let img = document.getElementById('800q');
      context.drawImage(img, xpos, ypos);
    });
    ypos += 142;
    this.xPositions.forEach(function (xpos) {
      let img = document.getElementById('1000q');
      context.drawImage(img, xpos, ypos);
    });
    ypos += 142;





  }
}
</script>

<style src="./Joshardy.css"></style>
