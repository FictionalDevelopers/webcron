<h1>New crone</h1>

<form on:submit|preventDefault={handleSubmit}>
  <label for="url">Callback url</label>
  <input id="url" type="text" name="url" bind:value={url}>
  <footer>
    <button>Create</button>
  </footer>
</form>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { CreateCronEventPayload } from './events';

  const dispatch = createEventDispatcher<{ create: CreateCronEventPayload }>();

  let url = '';

  function handleSubmit() {
    dispatch('create', { url })

    url = '';
  }
</script>

<style>
    h1 {
        margin-top: 0;
    }
</style>
