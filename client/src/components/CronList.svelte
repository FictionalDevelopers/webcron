<script lang="ts">
  import { webhookStore } from '../webhooks';
  import type { Webhook } from '../entities/webhook';

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
