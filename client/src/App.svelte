<script lang="ts">
  import type { CreateWebhookPayload } from '@webcron/entities/webhook';
  import Sidebar from './components/Sidebar.svelte';
  import NewCronForm from './components/NewCronForm.svelte';
  import CronList from './components/CronList.svelte';
  import { Page } from './components/pages';
  import { addWebhook, api } from './webhooks';
  import { NotificationsContainer, notify } from './notifications';

  let currentPage = Page.List;

  function setPage(page: Page) {
    currentPage = page;
  }

  async function handleCreateCron({ detail }: CustomEvent<CreateWebhookPayload>) {
    const dismissCreation = notify.message('Creating...');
    try {
      const hook = await api.createWebhook(detail);
      addWebhook(hook);
      setPage(Page.List);
      notify.success('Successfully created', { timeout: 2000, dismissAll: true });
    } catch (e) {
      notify.error(e.message);
    }
    dismissCreation();
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
  <NotificationsContainer />
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
