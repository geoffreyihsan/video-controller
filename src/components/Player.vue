<template>
    <div class="p-5">
      <h1 class="text-2xl font-bold">Video Player</h1>
      <video ref="videoPlayer" controls width="800" muted playsinline preload="none">
        <source :src="videoSrc" type="video/mp4" />
      </video>
    </div>
  </template>
  
  <script>
  import { io } from "socket.io-client";
  
  export default {
    data() {
      return {
        socket: null,
        videoSrc: "",
      };
    },
    mounted() {
      this.socket = io("http://192.168.68.121:3000"); // Replace with your MacBook's local IP
  
      this.socket.on("play-on-mac", (videoUrl) => {
        this.videoSrc = videoUrl;
        this.$nextTick(() => {
          const video = this.$refs.videoPlayer;
          if (video) {
            video.muted = true; // Ensure autoplay works
            video.load();
            video
              .play()
              .then(() => console.log("Video playing"))
              .catch((error) => console.log("Autoplay prevented:", error));
          }
        });
      });
    },
  };
  </script>
  