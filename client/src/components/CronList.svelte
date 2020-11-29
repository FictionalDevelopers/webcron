<script lang="ts">
  import { Webhook } from '@webcron/entities';
  import { webhookStore } from '../webhooks';

  let webhooks: Webhook[];

  $: webhooks = $webhookStore;
</script>

<ul>
  {#each webhooks as { url, id } (id)}
    <li>
      {url}
    </li>
  {/each}
</ul>
