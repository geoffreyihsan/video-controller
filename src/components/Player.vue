<template>
  <div class="w-screen h-screen flex">
    <div
      class="flex flex-col justify-center items-center w-full bg-cover bg-center"
      style="background-image: url('/images/background.jpg')"
    >
      <!-- Buttons (Visible but not functional) -->
      <div
        :class="!videoPlaying ? 'flex' : 'hidden'"
        class="flex flex-col justify-center items-center w-full"
      >
        <button class="px-4 py-2">
          <img src="/images/CTA-Milestone.png" alt="Milestone Button" />
        </button>
        <button class="px-4 py-2">
          <img src="/images/CTA-J7Spec.png" alt="J7 Spec Button" />
        </button>
        <button class="px-4 py-2">
          <img src="/images/CTA-J7SHSspec.png" alt="J7 SHS Spec Button" />
        </button>
        <button class="px-4 py-2">
          <img src="/images/CTA-AfterSales.png" alt="After Sales Button" />
        </button>
      </div>

      <!-- Video Player -->
      <div
        :class="videoPlaying ? 'flex' : 'hidden'"
        class="flex-col justify-center items-center w-full"
      >
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
    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";
import { eventBus } from "../eventBus"; // Import event bus

export default {
  data() {
    return {
      socket: null,
      videoSrc: "", // Default video
      videoPlaying: false, // Track video state
    };
  },
  mounted() {
    // Setup WebSocket connection
    const socketUrl =
      import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";
    this.socket = io(socketUrl);

    // Listen for play video event
    eventBus.on("play-video", (videoUrl) => {
      this.videoSrc = videoUrl;
      this.videoPlaying = true;
      this.playVideo();
    });

    // Listen for stop video event
    eventBus.on("stop-video", () => {
      this.stopVideo();
    });

    this.socket.on("play-on-mac", (videoUrl) => {
      this.videoSrc = videoUrl;
      this.videoPlaying = true;
      this.playVideo();
    });

    this.socket.on("stop-on-mac", (videoUrl) => {
      // Only stop if the video matches the current playing video
      if (this.videoSrc === videoUrl) {
        this.stopVideo();
      } else {
      }
    });
  },
  beforeUnmount() {
    eventBus.off("play-video");
    eventBus.off("stop-video");
  },
  methods: {
    playVideo() {
      this.$nextTick(() => {
        const video = this.$refs.videoPlayer;
        if (video) {
          video.innerHTML = `<source src="${this.videoSrc}" type="video/mp4">`; // Set new source
          video.load();
          video
            .play()
            // .then(() => console.log("Video playing"))
            .catch((error) => console.log("Autoplay prevented:", error));
        }
      });
    },
    stopVideo() {
      const video = this.$refs.videoPlayer;
      if (video) {
        video.pause(); // Stop playback
        video.currentTime = 0; // Reset to start

        // Remove old source properly
        while (video.firstChild) {
          video.removeChild(video.firstChild);
        }

        video.load(); // Reload without source
      }

      this.videoPlaying = false;
      this.videoSrc = ""; // Reset the Vue data source
    },
  },
};
</script>
