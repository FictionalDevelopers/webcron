<script lang="ts">
  import format from 'date-fns/format';
  import Card from '../../components/Card.svelte';
  import { Duration } from '../../time';
  import { api as cronApi } from '../../cron';
  import type { Webhook } from '../../entities/webhook';

  export let webhook: Webhook;

  let scheduleItems = webhook.schedule.split(' ');

  let copied: boolean = false,
    selected: boolean = false;

  async function copy() {
    await navigator.clipboard.writeText(webhook.schedule);
    copied = true;
  }

  function scheduleOut() {
    copied = false;
  }

  const select = () => {
    selected = !selected;
  };
</script>

<Card>
  <section class:selected>
    <header>
      <h2 class="name" on:click={select}>{webhook.name}</h2>
      <div class="schedule" on:click={copy} on:mouseleave={scheduleOut}>
        <span class="copy-label">{copied ? 'copied' : 'copy'}</span>
        <span class="schedule-items">
          {#each scheduleItems as scheduleItem}
            <span class="schedule-item" class:star={scheduleItem === '*'}>{scheduleItem}</span>
          {/each}
        </span>
      </div>
    </header>
    <main>
      {#if selected}
        {#await cronApi.getNextExpectedDate(webhook)}
          <p>
            <span class="next-label">Calculating next expected date...</span>
          </p>
        {:then { next: estimation }}
          <p>
            <span class="next-label">Next expected time:</span>
            <span>{format(new Date(estimation), 'do MMM yyyy \'at\' hh:mm')}</span>
          </p>
          <p>
            <Duration endTime={estimation} let:time={now} let:duration={duration}>
              {#if duration === ''}
                <span>Firing now</span>
              {:else if now < estimation}
                <span class="next-label">Time left:</span>
                <span>{duration}</span>
              {:else}
                <span class="next-label">Fired:</span>
                <span>{duration} <i>ago</i></span>
              {/if}
            </Duration>
          </p>
        {:catch error}
          <p>
            <span class="next-label">Could not calculate next expected date.</span>
          </p>
        {/await}
      {/if}
    </main>
    <footer>
      {webhook.url}
    </footer>
  </section>
</Card>

<style src="schedule-card.css" />
