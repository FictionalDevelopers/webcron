<script lang="ts">
  import type { Webhook } from '@webcron/entities/webhook';
  import { webhookStore } from '../webhooks';

  let webhooks: Webhook[];

  $: webhooks = $webhookStore;
</script>

<ul>
  {#each webhooks as { url, schedule, id } (id)}
    <li>
      {url} - {schedule}
    </li>
  {/each}
</ul>
