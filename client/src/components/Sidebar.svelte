<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Page } from './pages';

  export let currentPage: Page;

  const dispatch = createEventDispatcher<{ pageChange: Page }>();

  function handlePageChange(page: Page) {
    dispatch('pageChange', page)
  }
</script>

<div class="logo" on:click={() => handlePageChange(Page.List)}>webcron</div>
<ul>
  <li on:click={() => handlePageChange(Page.List)} class:current={currentPage === Page.List}>
    List
  </li>
  <li on:click={() => handlePageChange(Page.New)} class:current={currentPage === Page.New}>
    New
  </li>
</ul>

<style>
    .logo {
        text-transform: uppercase;
        font-size: 24px;
        font-weight: 100;
        cursor: pointer;
        padding: 0 10px;
    }

    ul {
        list-style: none;
        margin: 20px 0 0;
        padding: 0;
    }

    li {
        padding: 10px;
        cursor: pointer;
    }

    .current {
        background-color: #ffbea9;
    }
</style>
