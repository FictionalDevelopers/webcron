<h1>New crone</h1>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="url">Callback url</label>
    <input id="url" type="text" name="url" bind:value={webhook.url}>
  </div>
  <div>
    <label for="schedule">Callback schedule</label>
    <input id="schedule" type="text" name="schedule" bind:value={webhook.schedule}>
  </div>
  <footer>
    <button>Create</button>
  </footer>
</form>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { CreateWebhookPayload } from '@webcron/entities/webhook';

  const dispatch = createEventDispatcher<{ create: CreateWebhookPayload }>();

  let webhook: CreateWebhookPayload = {
    url: '',
    schedule: '',
  };

  function handleSubmit() {
    dispatch('create', webhook);

    webhook.url = '';
    webhook.schedule = '';
  }
</script>

<style>
    h1 {
        margin-top: 0;
    }
</style>
