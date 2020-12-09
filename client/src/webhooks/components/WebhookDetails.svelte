<script lang="ts">
  import format from 'date-fns/format';
  import Card from '../../components/Card.svelte';
  import { notify } from '../../notifications';
  import CopyContent from '../../components/CopyContent.svelte';
  import type { Webhook, WebhookHistoryDocument } from '../../entities';
  import { FetchingState } from './fetching-state';
  import { getHistory } from '../api';

  export let webhook: Webhook;

  let
    fetchingState: FetchingState = FetchingState.Idle,
    history: WebhookHistoryDocument[] = [];

  function getDisplayTime(time: number) {
    return format(new Date(time), 'do MMM yyyy HH:mm');
  }

  function notifyOnCopy(label) {
    return () => {
      notify.message(`${label} copied.`, { timeout: 2000, dismissAll: true });
    };
  }

  async function handleHistoryFetch() {
    const dismiss = notify.message(`Fetching history`);
    fetchingState = FetchingState.Pending;

    history = await getHistory(webhook.id);

    fetchingState = FetchingState.Fetched;

    dismiss();
  }
</script>

<h1>{webhook.name}</h1>

<h2>Details</h2>

<section>
  <Card>
    <main>
      <h3>Callback url</h3>
      <CopyContent
          content={webhook.url}
          on:copy={notifyOnCopy('Url')}
      >
        <pre>{webhook.url}</pre>
      </CopyContent>
    </main>
  </Card>
</section>

<section>
  <Card>
    <main>
      <h3>Cron</h3>
      <h4>Schedule</h4>
      <CopyContent
          content={webhook.schedule}
          on:copy={notifyOnCopy('Schedule')}
      >
        <pre>{webhook.schedule}</pre>
      </CopyContent>

      <h4>Next expected time</h4>
      <CopyContent
          content={getDisplayTime(webhook.nextTime)}
          on:copy={notifyOnCopy('Time')}
      >
        <pre>{getDisplayTime(webhook.nextTime)}</pre>
      </CopyContent>
    </main>
  </Card>
</section>

<section>
  <h2>History</h2>
  {#if fetchingState === FetchingState.Idle}
    <pre on:click={handleHistoryFetch}>Fetch history</pre>
  {:else if fetchingState === FetchingState.Pending}
    Fetching
  {:else if fetchingState === FetchingState.Fetched && history.length === 0}
        <pre
            class="re-fetch"
            on:click={handleHistoryFetch}
        >
          <span>No call history found.</span>
          <small>[Click again to re-fetch]</small>
        </pre>
  {/if}
</section>

{#each history as historyEntry (historyEntry.id)}
  <section>
    <Card>
      <main>
        <h4>Execution time</h4>
        <CopyContent
            content={getDisplayTime(historyEntry.time)}
            on:copy={notifyOnCopy('Time')}
        >
          <pre>{getDisplayTime(historyEntry.time)}</pre>
        </CopyContent>
        <h4>Status code</h4>
        <CopyContent
            content={historyEntry.statusCode}
            on:copy={notifyOnCopy('Status code')}
        >
          <pre>{historyEntry.statusCode}</pre>
        </CopyContent>
        {#if historyEntry.errorMessage}
          <h4>Error message</h4>
          <CopyContent
              content={historyEntry.errorMessage}
              on:copy={notifyOnCopy('Error message')}
          >
            <pre>{historyEntry.errorMessage}</pre>
          </CopyContent>
        {/if}
        <h4>Response body</h4>
        <CopyContent
            content={historyEntry.body}
            on:copy={notifyOnCopy('Response')}
        >
          <pre>{historyEntry.body}</pre>
        </CopyContent>
      </main>
    </Card>
  </section>
{/each}

<style>
    section:not(:last-of-type) {
        margin-bottom: 20px;
    }

    main {
        padding: 10px;
    }

    h3 {
        padding-left: 10px;
        margin: 10px 0;
    }

    h4 {
        padding-left: 10px;
    }

    pre {
        padding: 10px;
        margin: 0;
        border-radius: 3px;
        border: 1px solid #eae8e8;
    }

    pre:hover {
        cursor: pointer;
        background-color: #eae8e8;
    }

    .re-fetch {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
