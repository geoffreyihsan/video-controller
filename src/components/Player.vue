<template>
  <div class="h-screen w-screen">
    <video
      ref="videoPlayer"
      autoplay
      loop
      width="100%"
      height="100%"
      muted
      playsinline
      preload="none"
    >
      <source :src="videoSrc" type="video/mp4" />
    </video>
  </div>
</template>

<script>
import { io } from "socket.io-client";
import { useRoute } from "vue-router";
import { eventBus } from "../eventBus"; // Import event bus

export default {
  data() {
    return {
      socket: null,
      videoSrc: "../../video/SCREEN_BG.mp4", // Default video
    };
  },
  mounted() {
    const route = useRoute();

    // Sync video with Controller.vue
    eventBus.on("update-video", (videoUrl) => {
      this.videoSrc = videoUrl;
      this.playVideo();
    });

    // Watch for route changes
    this.$watch(
      () => route.path,
      (newPath) => {
        if (newPath === "/") {
          this.videoSrc = "../../video/SCREEN_BG.mp4";
          this.playVideo();
        }
      },
      { immediate: true }
    );

    // Setup WebSocket connection
    const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";
    this.socket = io(socketUrl);

    this.socket.on("play-on-mac", (videoUrl) => {
      this.videoSrc = videoUrl;
      this.playVideo();
    });
  },
  beforeUnmount() {
    eventBus.off("update-video"); // Clean up event listener
  },
  methods: {
    playVideo() {
      this.$nextTick(() => {
        const video = this.$refs.videoPlayer;
        if (video) {
          video.muted = true;
          video.load();
          video
            .play()
            .then(() => console.log("Video playing"))
            .catch((error) => console.log("Autoplay prevented:", error));
        }
      });
    },
  },
};
</script>
