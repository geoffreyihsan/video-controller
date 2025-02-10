<template>
  <div class="p-5">
    <h1 class="text-2xl font-bold">Choose a Video</h1>
    <div class="space-y-2 mt-4">
      <button class="px-4 py-2 bg-blue-500 text-white rounded" @click="playVideo('../assets/Feature Well Crowne Plaza.mp4')">
        Play Video 1
      </button>
      <button class="px-4 py-2 bg-green-500 text-white rounded" @click="playVideo('../assets/FS Hongkong rev 3.mp4')">
        Play Video 2
      </button>
      <button class="px-4 py-2 bg-red-500 text-white rounded" @click="playVideo('../assets/Immerse Yourself in Luxury at Shangri-La Singapore_Feature well 1.mp4')">
        Play Video 3
      </button>
      <button class="px-4 py-2 bg-yellow-500 text-white rounded" @click="playVideo('../assets/Luxe List Logo Opt 02 Black Background.mp4')">
        Play Video 4
      </button>
    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";

export default {
  data() {
    return {
      socket: null,
    };
  },
  mounted() {
    this.socket = io("http://192.168.68.121:3000"); // Replace with your MacBook's local IP
  },
  methods: {
    playVideo(videoUrl) {
      this.socket.emit("play-video", videoUrl);
    },
  },
};
</script>
