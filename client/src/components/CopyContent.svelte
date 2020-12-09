<div on:click={copyContent}>
  <slot />
</div>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let content: string = '';

  const dispatch = createEventDispatcher<{ copy: string }>();

  async function copyContent() {
    await navigator.clipboard.writeText(content);
    dispatch('copy', content);
  }
</script>
