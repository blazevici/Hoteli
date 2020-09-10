<template>
  <button class="btn btn-primary" @click="$emit('click')">
      <slot name="default"></slot>
  </button>
</template>

<script>
export default {
}
</script>

<style>

</style>