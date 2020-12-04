<script lang="ts">
  import ScheduleCard from './ScheduleCard.svelte';
  import { webhookStore } from '../store';
  import type { Webhook } from '../../entities/webhook';

  let webhooks: Webhook[];

  $: webhooks = $webhookStore;
</script>

{#if !webhooks.length}
  <p>No schedules yet</p>
{/if}
{#if webhooks.length}
  <div class="cards">
    {#each webhooks as webhook (webhook.id)}
      <div class="card">
        <ScheduleCard webhook={webhook} />
      </div>
    {/each}
  </div>
{/if}

<style>
    p {
        color: #8b8a8a;
    }

    .card:not(:last-of-type) {
        margin-bottom: 10px;
    }
</style>
