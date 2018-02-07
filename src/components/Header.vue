<template>
  <div>
    <mt-header fixed :title="title">
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data: function() {
    return {
      title: "vuememo"
    };
  }
};
</script>
