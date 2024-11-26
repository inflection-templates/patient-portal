<script lang="ts">
 export let tasks
</script>

<table>
    <thead class="thead">
      <tr>
        <th class="p-2"></th>

        <th class="p-2">ActionType</th>
        <th class="p-2"></th>
      </tr>
    </thead>
    <tbody class="tbody">
      {#each tasks as item, index}
        <tr class="tabledata">
          <td class="">{index + 1}</td>
          <td class="p-2">Careplan</td>
          <td class="p-2">{item.value1}</td>
        </tr>
      {/each}
    </tbody>
  </table>