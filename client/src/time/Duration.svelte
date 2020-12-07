<script lang="ts">
  import formatDuration from 'date-fns/formatDuration';
  import intervalToDuration from 'date-fns/intervalToDuration';
  import { timeStore } from './timer';

  export let endTime: number = Date.now();

  let time: number, duration: string;

  $: {
    time = $timeStore;
    duration = formatDuration(
      intervalToDuration({
        start: time,
        end: endTime,
      })
    );
  }
</script>

<slot duration={duration} time={time} />
