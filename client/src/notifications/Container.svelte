<script lang="ts">
  import type { Notification } from './types';
  import { acknowledge, notificationStore } from './store';
  import { isErrorType, isMessageType, isSuccessType } from './utils';

  let notifications: Notification[];

  $: notifications = $notificationStore;
</script>

<ul>
  {#each notifications as { message, type, id } (id)}
    <li
        on:click={() => acknowledge(id)}
        class:message={isMessageType(type)}
        class:error={isErrorType(type)}
        class:success={isSuccessType(type)}
    >
      {message}
    </li>
  {/each}
</ul>

<style>
    ul {
        position: fixed;
        top: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        list-style: none;
        padding: 10px;
        margin: 0;
    }

    li {
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 3px;
        cursor: pointer;
    }

    .message {
        background-color: #b0c4de;
    }

    .error {
        background-color: #fa9271;
    }

    .success {
        background-color: #7fffd4;
    }

    li:not(:last-of-type) {
        margin-bottom: 10px;
    }
</style>
