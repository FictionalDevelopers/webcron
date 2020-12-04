<h1>New cron</h1>

<Card>
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="name">Name</label>
      <input id="name" type="text" name="name" bind:value={webhook.name}>
    </div>
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
</Card>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { CreateWebhookPayload } from '../entities/webhook';
  import Card from './Card.svelte';

  const dispatch = createEventDispatcher<{ create: CreateWebhookPayload }>();

  let webhook: CreateWebhookPayload = {
    name: '',
    url: '',
    schedule: '',
  };

  function handleSubmit() {
    dispatch('create', webhook);

    webhook.name = '';
    webhook.url = '';
    webhook.schedule = '';
  }
</script>

<style>
    form {
        padding: 10px;
    }

    h1 {
        margin-top: 0;
    }
</style>
