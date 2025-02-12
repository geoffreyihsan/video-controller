<template>
  <div class="w-screen h-screen flex relative">
    <!-- Background with blur effect -->
    <div
      :class="blurActive ? 'opacity-50' : 'opacity-100'"
      class="absolute inset-0 w-full h-full transition-all duration-300"
    ></div>

    <div
      class="flex flex-col justify-center items-center w-full bg-cover bg-center relative"
      style="background-image: url('/images/background.jpg')"
    >
      <button
        v-for="(btn, index) in buttons"
        :key="index"
        class="px-4 py-2 relative z-10 transition-all duration-300"
        :class="{
          'opacity-100': activeButton === index,
          'opacity-50': blurActive && activeButton !== index,
        }"
        @click="toggleVideo(index, btn.video)"
      >
        <img :src="btn.img" :alt="btn.alt" />
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
      blurActive: false, // Tracks blur state
      activeButton: null, // Tracks which button is active
      buttons: [
        {
          img: "/images/CTA-Milestone.png",
          alt: "Milestone Button",
          video: "../../video/SCREEN_Milestone.mp4",
        },
        {
          img: "/images/CTA-J7Spec.png",
          alt: "J7 Spec Button",
          video: "../../video/SCREEN_J7_Spec.mp4",
        },
        {
          img: "/images/CTA-J7SHSspec.png",
          alt: "J7 SHS Spec Button",
          video: "../../video/SCREEN_J7_SHS_Spec.mp4",
        },
        {
          img: "/images/CTA-AfterSales.png",
          alt: "After Sales Button",
          video: "../../video/SCREEN_After_Sales.mp4",
        },
      ],
    };
  },
  mounted() {
    const socketUrl =
      import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";
    this.socket = io(socketUrl);
  },
  methods: {
    toggleVideo(index, videoUrl) {
      if (this.activeButton === index) {
        this.stopVideo();
        this.blurActive = false;
      } else {
        this.playVideo(videoUrl);
        this.activeButton = index; // Make sure this is correctly set
        this.blurActive = true;
      }
    },
    playVideo(videoUrl) {
      this.socket.emit("play-video", videoUrl);
    },
    stopVideo() {
      if (this.activeButton === null || this.activeButton === undefined) {
        return;
      }
      const videoUrl = this.buttons[this.activeButton]?.video; // Get current video

      this.socket.emit("stop-video", videoUrl);
      this.activeButton = null;
      this.blurActive = false;
    },
  },
};
</script>

<style>
/* Smooth transition for opacity effect */
.opacity-50 {
  opacity: 0.2;
}
.opacity-100 {
  opacity: 1;
}
</style>
