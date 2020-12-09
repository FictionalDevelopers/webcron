<script lang="ts">
  import Sidebar from './components/Sidebar.svelte';
  import NewCronForm from './components/NewCronForm.svelte';
  import { Page } from './components/pages';
  import { addWebhook, api } from './webhooks';
  import ScheduleList from './webhooks/components/ScheduleList.svelte';
  import WebhookDetails from './webhooks/components/WebhookDetails.svelte';
  import { NotificationsContainer, notify } from './notifications';
  import type { CreateWebhookPayload, Webhook } from './entities/webhook';

  let currentPage = Page.List;
  let selectedWebhook: Webhook | null = null;

  function setPage(page: Page) {
    currentPage = page;

    if (page !== Page.Details) {
      selectedWebhook = null;
    }
  }

  function handleSelect(webhook: CustomEvent<Webhook>) {
    setPage(Page.Details);
    selectedWebhook = webhook.detail;
  }

  async function handleCreateCron({ detail }: CustomEvent<CreateWebhookPayload>) {
    const dismissCreation = notify.message('Creating...');
    try {
      const hook = await api.createWebhook(detail);
      addWebhook(hook);
      setPage(Page.List);
      notify.success('Successfully created.', { timeout: 2000, dismissAll: true });
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
      <ScheduleList on:select={handleSelect} />
    {:else if currentPage === Page.New}
      <NewCronForm on:create={handleCreateCron} />
    {:else if currentPage === Page.Details}
      <WebhookDetails webhook={selectedWebhook} />
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
        background-color: #fafafa;
        max-height: 100vh;
        overflow-y: auto;
    }
</style>
