<template>
  <div class="h-screen w-screen">
    <video
      ref="videoPlayer"
      controls
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

export default {
  data() {
    return {
      socket: null,
      videoSrc: "",
    };
  },
  mounted() {
    const socketUrl =
      import.meta.env.VITE_SOCKET_URL || "http://localhost:3000"; // Fallback to localhost if not set
    this.socket = io(socketUrl);

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
