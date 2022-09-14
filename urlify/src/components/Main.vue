<template>
  <div class="container">
    <h1 class="brand">Urlify!</h1>
    <!-- <p class="tagLine">A free service/tool to shorten or reduce a URL.</p> -->
    <div class="container-group">
      <input type="text" v-model="url" placeholder="Enter a valid url!" v-on:keyup.enter="postData"/>
      <button
        id="submitBtn"
        type="submit"
        @click="postData"
      >Shorten</button>
      <div v-if="shortUrl === ''" >
        <p class="hidden"></p>
      </div>
      <div v-else>
        <!-- <p class="url">{{ shortUrl }}</p> -->
        <a class="url" :href=shortUrl>{{ shortUrl }}</a>
        <!-- <button
        class="url"
        id="copyText"
        @click="copy"
        type="button"
        >Copy</button> -->
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Main",
  mounted() {
    console.log("Component mounted.");
  },
  data() {
    return {
      url: "",
      output: "",
      shortUrl: ""
    };
  },
  methods: {
    postData: async function() {
      // Default options are marked with *
      const res = axios({
        url: "http://localhost:5000/api/v1/url/shorten",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          'Accept' : 'application/json'
        },
        data: JSON.stringify({
          longUrl: this.url
        })
      });
      let data = await res;
      console.log(data.data)
      this.shortUrl = data.data.shortUrl;
      // return data; // parses JSON response into native JavaScript objects
    },
    // postUrl: () => {
  }, //  this.postData("", {
}; //    longUrl: this.longUrl
//  })
//     .then((res) => {
//       this.output = res.data;
//     })
//     .catch(function(error) {
//       this.output = error;
//     });
// },
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital@0;1&family=IBM+Plex+Sans+Condensed:ital@0;1&family=IBM+Plex+Sans:ital,wght@0,100;0,400;0,700;1,100;1,400;1,700&family=IBM+Plex+Serif:ital@0;1&display=swap");

.container {
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.brand {
  font-family: Integral CF;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  font-size: 50px;
  margin-top: 60px;
}

.brand::after {
  position: absolute;
  width: 0;
  height: 2.8px;
  background: #000;
  content: "";
  top: 130px;
  left: 775px;
  /*right: 50px; */
  transform: translateX(-63%);
  transition: 0.5s ease;
}

.brand:hover::after {
  width: 13.2%;
}

.container-group {
  background: #000;
  border-radius: 3px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  gap: normal;
  margin: 20px 390px 20px;
  padding: 50px;
  text-align: center;
  vertical-align: -webkit-baseline-middle;
}

input {
  border: 0;
  border-radius: 3px 0px 0px 3px;
  box-shadow: hsla(0, 0%, 0%, 0.1) 0px 1px 2px 0px;
  display: inline-block;
  font-size: 17px;
  gap: normal;
  padding: 10px 16px;
  width: 25rem;
}

#submitBtn {
  border: 0;
  align-items: flex-start;
  background-color: #f7fe72;
  border-radius: 0px 3px 3px 0px;
  color: hsl(0, 0%, 0%);
  display: inline-block;
  font-size: 17px;
  font-weight: 700;
  gap: normal;
  padding: 10px 16px;
  text-align: center;
}

#submitBtn:hover {
  background: #f4e76e;
}

h1 {
  margin: 40px 20px 30px 0;
  text-align: center;
  align-content: center;
  vertical-align: -webkit-baseline-middle;
  justify-content: center;
}
/* 
.tagLine {
  color: #000;
  font-family: Hack;
  font-weight: 700;
  font-size: 20px;
  display: inline-block;
  margin: 10px 400px;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: middle;
  text-align: center;
  padding: 5px;
  position: absolute;
  transform: translateX(50%, 50%);
  top: 75px;
  left: 600px;
} */

.hidden {
  display: none;
}
.url {
  background-color: #fff;
  border-radius: 5px;
  color: #000;
  padding: 8px;
  display: inline-block;
  font-family: Hack;
  margin: 20px 60px;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: -webkit-baseline-middle;
  text-align: center;
}
</style>
