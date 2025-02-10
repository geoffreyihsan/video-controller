<template>
  <div class="w-screen h-screen flex">
    <div class="flex w-full">
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded h-screen w-3/12"
        @click="playVideo('../assets/Feature Well Crowne Plaza.mp4')"
      >
        Play Video 1
      </button>
      <button
        class="px-4 py-2 bg-green-500 text-white rounded h-screen w-3/12"
        @click="playVideo('../assets/FS Hongkong rev 3.mp4')"
      >
        Play Video 2
      </button>
      <button
        class="px-4 py-2 bg-red-500 text-white rounded h-screen w-3/12"
        @click="
          playVideo(
            '../assets/Immerse Yourself in Luxury at Shangri-La Singapore_Feature well 1.mp4'
          )
        "
      >
        Play Video 3
      </button>
      <button
        class="px-4 py-2 bg-yellow-500 text-white rounded h-screen w-3/12"
        @click="
          playVideo('../assets/Luxe List Logo Opt 02 Black Background.mp4')
        "
      >
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
    const socketUrl =
      import.meta.env.VITE_SOCKET_URL || "http://localhost:3000"; // Fallback to localhost if not set
    this.socket = io(socketUrl);
  },
  methods: {
    playVideo(videoUrl) {
      this.socket.emit("play-video", videoUrl);
    },
  },
};
</script>
