document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('mazeCanvas');
    const ctx = canvas.getContext('2d');
  
    const mazeSize = 10; // 10x10のグリッド
    const cellSize = 40; // 各セルのサイズ
    let isDragging = false; // ドラッグ状態の管理
  
    // 迷路データの更新 (0: 通路, 1: 壁, 2: スタート, 3: ゴール, 4: 訪問済み)
    const maze = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 0, 0, 1, 0, 0, 0, 3, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
  
    drawMaze();
  
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      updatePath(e);
    });
  
    canvas.addEventListener('mousemove', (e) => {
      if (isDragging) {
        updatePath(e);
      }
    });
  
    window.addEventListener('mouseup', () => {
      isDragging = false;
    });
  
    function drawMaze() {
      for (let y = 0; y < mazeSize; y++) {
        for (let x = 0; x < mazeSize; x++) {
          switch (maze[y][x]) {
            case 1:
              ctx.fillStyle = '#000'; // 壁
              break;
            case 2:
              ctx.fillStyle = '#0f0'; // スタート
              break;
            case 3:
              ctx.fillStyle = '#f00'; // ゴール
              break;
            case 4:
              ctx.fillStyle = '#ff0'; // 訪問済み
              break;
            default:
              ctx.fillStyle = '#fff'; // 通路
          }
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }
  
    function updatePath(e) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const gridX = Math.floor(mouseX / cellSize);
      const gridY = Math.floor(mouseY / cellSize);
  
      if (maze[gridY][gridX] === 1) {
        // 壁に当たった時の通知
        alert('壁に当たりました！');
      } else if (maze[gridY][gridX] === 0 || maze[gridY][gridX] === 2) {
        // 通路またはスタート地点を訪問
        maze[gridY][gridX] = 4; // 訪問済みに更新
        drawMaze();
      }
    }
  });
  