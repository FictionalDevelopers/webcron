<script lang="ts">
  import { api as webhooksApi } from './webhooks';

  export let name: string;
</script>

<main>
  <h1>Hello {name}!</h1>
  <button on:click={webhooksApi.getWebhooks}>Get</button>
  <button on:click={() => webhooksApi.createWebhook(`${Date.now()}`)}>Add</button>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
