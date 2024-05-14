// function numIslands(grid) {
//   // Check if grid is empty
//   if (!grid || grid.length === 0) {
//     return 0;
//   }

//   const m = grid.length; // Number of rows
//   const n = grid[0].length; // Number of columns
//   let count = 0; // Counter for islands

//   // Function to perform DFS and mark the land as visited
//   function dfs(row, col) {
//     // Check if the current cell is out of bounds or water ('0')
//     if (row < 0 || row >= m || col < 0 || col >= n || grid[row][col] === "0") {
//       return;
//     }

//     // Mark the current cell as visited by changing it to '0'
//     grid[row][col] = "0";

//     // Recursively visit adjacent cells
//     dfs(row - 1, col); // Up
//     dfs(row + 1, col); // Down
//     dfs(row, col - 1); // Left
//     dfs(row, col + 1); // Right
//   }

//   // Iterate through each cell in the grid
//   for (let row = 0; row < m; row++) {
//     for (let col = 0; col < n; col++) {
//       // If the cell contains land ('1'), it means a new island is found
//       if (grid[row][col] === "1") {
//         count++; // Increment the island count
//         dfs(row, col); // Perform DFS to mark the whole island as visited
//       }
//     }
//   }

//   // Return the total number of islands
//   return count;
// }

function countIsland(grid) {
  if (!grid || !grid.length) {
    return 0;
  }

  let islandCount = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  function markIslandVisited(row, col) {
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      grid[row][col] === "0"
    )
      return;

    grid[row][col] = "0";

    markIslandVisited(row, col + 1);
    markIslandVisited(row, col - 1);
    markIslandVisited(row + 1, col);
    markIslandVisited(row - 1, col);
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === "1") {
        islandCount++;
        markIslandVisited(row, col);
      }
    }
  }

  return islandCount;
}
