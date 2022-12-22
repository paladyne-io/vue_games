<template>
  <div class="blogpost">{{ title }}</div>
</template>

<script>
export default {
  props: ['title'] // define the props
}
</script>

<style>
.blogpost {
  border: 1px dotted green;
}
</style>
