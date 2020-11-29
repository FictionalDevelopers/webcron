<script lang="ts">
  import Sidebar from './components/Sidebar.svelte';
  import NewCronForm from './components/NewCronForm.svelte';
  import CronList from './components/CronList.svelte';
  import { Page } from './components/pages';
  import type { CreateCronEventPayload } from './components/events';
  import { addWebhook, api } from './webhooks';

  let currentPage = Page.List;

  function setPage(page: Page) {
    currentPage = page;
  }

  async function handleCreateCron({ detail }: CustomEvent<CreateCronEventPayload>) {
    const hook = await api.createWebhook(detail.url);
    addWebhook(hook);
    setPage(Page.List);
  }
</script>

<div class="root">
  <aside>
    <Sidebar on:pageChange={({ detail }) => setPage(detail)} currentPage={currentPage} />
  </aside>
  <main>
    {#if currentPage === Page.List}
      <CronList />
    {:else if currentPage === Page.New}
      <NewCronForm on:create={handleCreateCron} />
    {/if}
  </main>
</div>

<style>
    .root {
        height: 100vh;
        display: flex;
    }

    aside {
        padding: 15px 0;
        background-color: #ff9472;
    }

    main {
        padding: 15px;
        flex-grow: 1;
    }
</style>
