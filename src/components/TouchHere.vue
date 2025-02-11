<template>
  <div class="h-screen w-screen" @click="goToController">
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
      <source
        src="../../video/SCREEN_frame_1_touch_here.mp4"
        type="video/mp4"
      />
    </video>
  </div>
</template>

<script>
export default {
  methods: {
    goToController() {
      this.$router.push("/controller"); // Redirect to /controller
    },
  },
};
</script>
