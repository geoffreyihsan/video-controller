<template>
  <div class="w-screen h-screen flex">
    <div
      class="flex flex-col justify-center items-center w-full bg-cover bg-center"
      style="background-image: url('/images/background.jpg')"
    >
      <button
        class="px-4 py-2"
        @click="playVideo('../../video/SCREEN_Milestone.mp4')"
      >
        <img src="/images/CTA-Milestone.png" alt="Milestone Button" />
      </button>
      <button
        class="px-4 py-2"
        @click="playVideo('../../video/SCREEN_J7_Spec.mp4')"
      >
        <img src="/images/CTA-J7Spec.png" alt="J7 Spec Button" />
      </button>
      <button
        class="px-4 py-2"
        @click="playVideo('../../video/SCREEN_J7_SHS_Spec.mp4')"
      >
        <img src="/images/CTA-J7SHSspec.png" alt="J7 SHS Spec Button" />
      </button>
      <button
        class="px-4 py-2"
        @click="playVideo('../../video/SCREEN_After_Sales.mp4')"
      >
        <img src="/images/CTA-AfterSales.png" alt="After Sales Button" />
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
